const PlacementDept = require('../models/PlacementDept');
const Student = require('../models/Student');
const Alumni = require('../models/Alumni');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const matchingService = require('../services/matchingService');
const emailService = require('../services/emailService');

exports.addCompany = catchAsync(async (req, res, next) => {
    let dept = await PlacementDept.findOne();
    if (!dept) {
        return next(new AppError('Department not configured', 500));
    }

    const newCompanyData = {
        companyName: req.body.companyName,
        role: req.body.role,
        jdSkills: req.body.jdSkills,
        cgpaCriteria: req.body.cgpaCriteria,
        backlog: req.body.backlog,
        branchesAllowed: req.body.branchesAllowed,
        numberOfCandidates: req.body.numberOfCandidates,
        visitDate: req.body.visitDate,
        description: req.body.description
    };

    dept.companies.push(newCompanyData);
    await dept.save();

    const freshlyAddedCompany = dept.companies[dept.companies.length - 1];

    // Trigger matching algorithm
    await matchingService.matchStudentsToCompany(freshlyAddedCompany);

    res.status(201).json({
        status: 'success',
        data: {
            company: freshlyAddedCompany
        }
    });
});

exports.selectStudents = catchAsync(async (req, res, next) => {
    const { companyId } = req.params;
    const { studentIds } = req.body; // array of ObjectIds

    const dept = await PlacementDept.findOne({ 'companies._id': companyId });
    if (!dept) return next(new AppError('Company not found', 404));

    const company = dept.companies.id(companyId);

    const students = await Student.find({ _id: { $in: studentIds } });

    for (const student of students) {
        // 1. Mark as SELECTED in placement department document
        const applicant = company.applicants.find(a => a.studentId.toString() === student._id.toString());
        if (applicant) applicant.status = 'SELECTED';
        company.selectedStudents.push(student._id);

        // 2. Mark student application status to PLACED
        student.placementStatus = 'PLACED';
        const stApp = student.applications.find(a => a.companyId.toString() === companyId);
        if (stApp) stApp.status = 'SELECTED';

        // 3. Move to Alumni 
        // Need to transfer hashed password from DB since it was unselected by default inside Auth
        const studentWithPass = await Student.findById(student._id).select('+password');

        await Alumni.create({
            studentData: {
                name: student.name,
                email: student.email,
                usn: student.usn,
                phone: student.phone,
                branch: student.branch,
                cgpa: student.cgpa,
                skills: student.skills,
                resume: student.resume
            },
            password: studentWithPass.password, // Keep the same password for Alumni Login
            companyJoined: company.companyName,
            role: company.role,
            placedDate: Date.now()
        });

        // 4. Remove from active student list
        await Student.findByIdAndDelete(student._id);

        // 5. Email
        await emailService.sendSelectionEmail(student, company);
    }

    await dept.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        message: 'Successfully placed selected students'
    });
});

exports.getActiveDrives = catchAsync(async (req, res, next) => {
    // We want to return companies that have applicants but perhaps aren't fully finalized
    // We can just return all companies and let the frontend filter, or return ones from the last year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const dept = await PlacementDept.findOne()
        .populate({
            path: 'companies.applicants.studentId',
            select: 'name usn email branch cgpa skills resume'
        });

    if (!dept) return next(new AppError('Dept not configured', 500));

    const activeDrives = await Promise.all(dept.companies.map(async c => {
        // Fetch Alumni placed in this exact company and role
        const placedAlumni = await Alumni.find({ 
            companyJoined: c.companyName, 
            role: c.role 
        });

        const alumniApplicants = placedAlumni.map(al => ({
            _id: al._id, 
            studentId: al._id, 
            name: al.studentData.name,
            usn: al.studentData.usn,
            email: al.studentData.email,
            branch: al.studentData.branch,
            cgpa: al.studentData.cgpa,
            skills: al.studentData.skills,
            resume: al.studentData.resume,
            matchedSkillsCount: 'Placed',
            status: 'PLACED',
            appliedAt: al.placedDate
        }));

        const activeApplicants = c.applicants.filter(a => a.studentId != null).map(a => ({
            _id: a._id,
            studentId: a.studentId._id,
            name: a.studentId.name,
            usn: a.studentId.usn,
            email: a.studentId.email,
            branch: a.studentId.branch,
            cgpa: a.studentId.cgpa,
            skills: a.studentId.skills,
            resume: a.studentId.resume,
            matchedSkillsCount: a.matchedSkillsCount,
            status: a.status,
            appliedAt: a.appliedAt
        }));

        return {
            _id: c._id,
            companyName: c.companyName,
            role: c.role,
            visitDate: c.visitDate,
            numberOfCandidates: c.numberOfCandidates,
            applicants: [...activeApplicants, ...alumniApplicants],
            selectedStudents: c.selectedStudents || []
        };
    }));

    res.status(200).json({
        status: 'success',
        results: activeDrives.length,
        data: {
            drives: activeDrives
        }
    });
});

exports.getCompanyHistory = catchAsync(async (req, res, next) => {
    // Last 3 years
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    const dept = await PlacementDept.findOne();
    if (!dept) return next(new AppError('Dept not configured', 500));

    const history = dept.companies
        .filter(c => c.visitDate >= threeYearsAgo)
        .map(c => {
            return {
                companyName: c.companyName,
                numberOfStudentsPlaced: c.selectedStudents.length,
                visitDate: c.visitDate,
                feedbacks: c.feedbacks
            };
        });

    res.status(200).json({
        status: 'success',
        results: history.length,
        data: {
            history
        }
    });
});
