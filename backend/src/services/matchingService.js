const Student = require('../models/Student');
const emailService = require('./emailService');

exports.matchStudentsToCompany = async (company) => {
    // 1. Fetch NOT_PLACED students
    const students = await Student.find({ placementStatus: 'NOT_PLACED' });

    let eligibleStudents = [];

    students.forEach(student => {
        // Evaluate base criteria ONLY if the company specified them
        if (company.cgpaCriteria !== undefined && company.cgpaCriteria !== null) {
            if (student.cgpa < company.cgpaCriteria) return;
        }

        if (company.backlog !== undefined && company.backlog !== null) {
            if (company.backlog === false && student.backlogs === true) return;
        }
        if (company.branchesAllowed && company.branchesAllowed.length > 0 && !company.branchesAllowed.includes(student.branch)) return;

        // Compare jdSkills vs student.skills
        const studentSkills = new Set((student.skills || []).map(s => s.toLowerCase()));
        let matchedSkillsCount = 0;

        company.jdSkills.forEach(skill => {
            if (studentSkills.has(skill.toLowerCase())) {
                matchedSkillsCount++;
            }
        });

        // Require at least one matching skill if the company has specified required skills
        if (company.jdSkills && company.jdSkills.length > 0 && matchedSkillsCount === 0) {
            return; // Reject student if absolutely zero skills align
        }

        eligibleStudents.push({
            student,
            matchedSkillsCount
        });
    });

    // Sort: highest matchedSkillsCount, then CGPA
    eligibleStudents.sort((a, b) => {
        if (b.matchedSkillsCount !== a.matchedSkillsCount) {
            return b.matchedSkillsCount - a.matchedSkillsCount;
        }
        return b.student.cgpa - a.student.cgpa;
    });

    // Update students' eligibleCompanies field
    // Also trigger email notification
    for (const item of eligibleStudents) {
        // update the student document
        item.student.eligibleCompanies.push(company._id);
        await item.student.save({ validateBeforeSave: false });

        // Send email
        await emailService.sendJobEligibilityEmail(item.student, company);
    }
};

exports.matchStudentToAllCompanies = async (student) => {
    const PlacementDept = require('../models/PlacementDept');
    const dept = await PlacementDept.findOne();
    if (!dept) return;

    // Check basic eligibility against all active companies sequentially
    for (const company of dept.companies) {
        if (company.cgpaCriteria !== undefined && company.cgpaCriteria !== null) {
            if (student.cgpa < company.cgpaCriteria) continue;
        }

        if (company.backlog !== undefined && company.backlog !== null) {
            if (company.backlog === false && student.backlogs === true) continue;
        }

        if (company.branchesAllowed && company.branchesAllowed.length > 0 && !company.branchesAllowed.includes(student.branch)) {
            continue;
        }

        // Skill parsing
        const studentSkills = new Set((student.skills || []).map(s => s.toLowerCase()));
        let matchedSkillsCount = 0;
        company.jdSkills.forEach(skill => {
            if (studentSkills.has(skill.toLowerCase())) {
                matchedSkillsCount++;
            }
        });

        // Require at least 1 matching skill
        if (company.jdSkills && company.jdSkills.length > 0 && matchedSkillsCount === 0) {
            continue;
        }

        // Student passes all hard constraints for this company, mark eligible.
        // Prevent duplicate pushes if re-run natively
        if (!student.eligibleCompanies.includes(company._id)) {
             student.eligibleCompanies.push(company._id);
        }
    }

    await student.save({ validateBeforeSave: false });
};
