# Placement Management System - Dummy Data

Here is a comprehensive set of dummy data (25 items total) matching your exact MongoDB Mongoose schemas for Students, Placement Department (Companies), and Alumni. You can use these to test your frontend inputs, Postman API requests, or seed your database manually later.

## 🏢 1. Companies (Placement Dept Operations)

These are payloads for adding new companies `POST /api/placement/companies`.

```json
[
  {
    "companyName": "TechNova Solutions",
    "role": "Software Development Engineer",
    "jdSkills": ["React", "Node.js", "MongoDB", "JavaScript"],
    "cgpaCriteria": 7.5,
    "backlog": false,
    "branchesAllowed": ["CSE", "ISE"],
    "numberOfCandidates": 5,
    "visitDate": "2026-05-10T10:00:00.000Z",
    "applicationDeadline": "2026-05-01T23:59:59.000Z",
    "description": "Looking for passionate full-stack web developers to join our core engineering team."
  },
  {
    "companyName": "DataSys Analytics",
    "role": "Data Analyst",
    "jdSkills": ["Python", "SQL", "Machine Learning", "Excel"],
    "cgpaCriteria": 6.8,
    "backlog": true,
    "branchesAllowed": ["CSE", "ISE", "ECE", "ME"],
    "numberOfCandidates": 3,
    "visitDate": "2026-06-15T09:00:00.000Z",
    "applicationDeadline": "2026-06-05T17:00:00.000Z",
    "description": "Entry-level Data Analyst role focusing on business intelligence and data pipelines."
  },
  {
    "companyName": "CloudNet Systems",
    "role": "Cloud DevOps Engineer",
    "jdSkills": ["AWS", "Docker", "Kubernetes", "Linux"],
    "cgpaCriteria": 7.0,
    "backlog": false,
    "branchesAllowed": ["CSE", "ISE", "ECE"],
    "numberOfCandidates": 2,
    "visitDate": "2026-07-20T11:00:00.000Z",
    "applicationDeadline": "2026-07-10T23:59:59.000Z",
    "description": "Seeking graduates with a strong understanding of networking and containerization."
  },
  {
    "companyName": "FinEdge Tech",
    "role": "Backend Engineer",
    "jdSkills": ["Java", "Spring Boot", "Microservices", "MySQL"],
    "cgpaCriteria": 8.0,
    "backlog": false,
    "branchesAllowed": ["CSE", "ISE"],
    "numberOfCandidates": 4,
    "visitDate": "2026-08-05T09:30:00.000Z",
    "applicationDeadline": "2026-07-25T12:00:00.000Z",
    "description": "Join our fast-paced fintech engineering team to build scalable financial transactions."
  },
  {
    "companyName": "Mechtronics Innovations",
    "role": "System Automation Engineer",
    "jdSkills": ["C++", "MATLAB", "Embedded Systems", "IoT"],
    "cgpaCriteria": 6.5,
    "backlog": true,
    "branchesAllowed": ["ECE", "ME"],
    "numberOfCandidates": 6,
    "visitDate": "2026-08-12T10:00:00.000Z",
    "applicationDeadline": "2026-08-01T23:59:59.000Z",
    "description": "Core engineering role bridging hardware and software logic for IoT devices."
  }
]
```

## 🎓 2. Students (Registration Operations)

These are payloads for registering students `POST /api/auth/register`.

```json
[
  {
    "name": "Arjun Kumar",
    "email": "arjun.kumar@example.com",
    "password": "Password123!",
    "usn": "1SJ22CS001",
    "phone": "9876543210",
    "branch": "CSE",
    "cgpa": 8.4,
    "skills": ["React", "Node.js", "JavaScript", "HTML"],
    "backlogs": false,
    "resume": "https://example.com/resumes/arjun-kumar.pdf"
  },
  {
    "name": "Priya Sharma",
    "email": "priya.sharma@example.com",
    "password": "Password123!",
    "usn": "1SJ22IS023",
    "phone": "8765432109",
    "branch": "ISE",
    "cgpa": 7.8,
    "skills": ["Python", "SQL", "Java", "C++"],
    "backlogs": false,
    "resume": "https://example.com/resumes/priya-sharma.pdf"
  },
  {
    "name": "Rahul Verma",
    "email": "rahul.v@example.com",
    "password": "Password123!",
    "usn": "1SJ22EC045",
    "phone": "7654321098",
    "branch": "ECE",
    "cgpa": 6.9,
    "skills": ["C++", "Embedded Systems", "MATLAB", "IoT"],
    "backlogs": true,
    "resume": "https://example.com/resumes/rahul-verma.pdf"
  },
  {
    "name": "Sneha Reddy",
    "email": "sneha.r@example.com",
    "password": "Password123!",
    "usn": "1SJ22CS089",
    "phone": "6543210987",
    "branch": "CSE",
    "cgpa": 9.1,
    "skills": ["Java", "Spring Boot", "Microservices", "React"],
    "backlogs": false,
    "resume": "https://example.com/resumes/sneha-reddy.pdf"
  },
  {
    "name": "Vikram Singh",
    "email": "vikram.s@example.com",
    "password": "Password123!",
    "usn": "1SJ22ME102",
    "phone": "9988776655",
    "branch": "ME",
    "cgpa": 7.2,
    "skills": ["AutoCAD", "SolidWorks", "Python", "Excel"],
    "backlogs": true,
    "resume": "https://example.com/resumes/vikram-singh.pdf"
  },
  {
    "name": "Neha Gupta",
    "email": "neha.g@example.com",
    "password": "Password123!",
    "usn": "1SJ22IS041",
    "phone": "8877665544",
    "branch": "ISE",
    "cgpa": 8.0,
    "skills": ["AWS", "Docker", "Linux", "Python"],
    "backlogs": false,
    "resume": "https://example.com/resumes/neha-gupta.pdf"
  },
  {
    "name": "Aditya Patel",
    "email": "aditya.p@example.com",
    "password": "Password123!",
    "usn": "1SJ22CS012",
    "phone": "7766554433",
    "branch": "CSE",
    "cgpa": 6.4,
    "skills": ["JavaScript", "HTML", "CSS"],
    "backlogs": true,
    "resume": "https://example.com/resumes/aditya-patel.pdf"
  },
  {
    "name": "Meghana Rao",
    "email": "meghana.rao@example.com",
    "password": "Password123!",
    "usn": "1SJ22EC076",
    "phone": "6655443322",
    "branch": "ECE",
    "cgpa": 7.5,
    "skills": ["Verilog", "C", "Python", "Machine Learning"],
    "backlogs": false,
    "resume": "https://example.com/resumes/meghana-rao.pdf"
  },
  {
    "name": "Rohan Das",
    "email": "rohan.das@example.com",
    "password": "Password123!",
    "usn": "1SJ22CS154",
    "phone": "5544332211",
    "branch": "CSE",
    "cgpa": 8.8,
    "skills": ["Node.js", "MongoDB", "Express", "React"],
    "backlogs": false,
    "resume": "https://example.com/resumes/rohan-das.pdf"
  },
  {
    "name": "Kavya Iyer",
    "email": "kavya.i@example.com",
    "password": "Password123!",
    "usn": "1SJ22IS099",
    "phone": "9900112233",
    "branch": "ISE",
    "cgpa": 7.9,
    "skills": ["SQL", "Tableau", "Python", "Data Analysis"],
    "backlogs": false,
    "resume": "https://example.com/resumes/kavya-iyer.pdf"
  },
  {
    "name": "Suraj Nair",
    "email": "suraj.nair@example.com",
    "password": "Password123!",
    "usn": "1SJ22ME034",
    "phone": "8811223344",
    "branch": "ME",
    "cgpa": 6.8,
    "skills": ["MATLAB", "C++", "IoT"],
    "backlogs": false,
    "resume": "https://example.com/resumes/suraj-nair.pdf"
  },
  {
    "name": "Ananya Joshi",
    "email": "ananya.j@example.com",
    "password": "Password123!",
    "usn": "1SJ22CS056",
    "phone": "7722334455",
    "branch": "CSE",
    "cgpa": 8.2,
    "skills": ["Java", "React", "SQL", "Git"],
    "backlogs": false,
    "resume": "https://example.com/resumes/ananya-joshi.pdf"
  },
  {
    "name": "Karan Malhotra",
    "email": "karan.m@example.com",
    "password": "Password123!",
    "usn": "1SJ22EC011",
    "phone": "6633445566",
    "branch": "ECE",
    "cgpa": 7.1,
    "skills": ["C", "C++", "Linux", "Networking"],
    "backlogs": true,
    "resume": "https://example.com/resumes/karan-malhotra.pdf"
  },
  {
    "name": "Swati Deshmukh",
    "email": "swati.d@example.com",
    "password": "Password123!",
    "usn": "1SJ22IS027",
    "phone": "5544556677",
    "branch": "ISE",
    "cgpa": 8.5,
    "skills": ["Python", "Django", "PostgreSQL", "JavaScript"],
    "backlogs": false,
    "resume": "https://example.com/resumes/swati-deshmukh.pdf"
  },
  {
    "name": "Manoj Tiwari",
    "email": "manoj.t@example.com",
    "password": "Password123!",
    "usn": "1SJ22CS119",
    "phone": "4455667788",
    "branch": "CSE",
    "cgpa": 6.6,
    "skills": ["HTML", "CSS", "PHP", "MySQL"],
    "backlogs": true,
    "resume": "https://example.com/resumes/manoj-tiwari.pdf"
  }
]
```

## 🌟 3. Alumni Data (Placed Students)

If you need to manually insert Alumni directly into the database (since normally they automatically get generated when an Admin selects a student during the placement pipeline), use this structure:

```json
[
  {
    "studentData": {
      "name": "Pranav Kulkarni",
      "email": "pranav.k@example.com",
      "usn": "1SJ21CS088",
      "phone": "9966332211",
      "branch": "CSE",
      "cgpa": 8.9,
      "skills": ["React", "Express", "MongoDB", "Node.js"],
      "resume": "https://example.com/resumes/pranav.pdf"
    },
    "password": "$2a$12$SomeHashedPasswordExample123", 
    "companyJoined": "TechNova Solutions",
    "role": "Software Development Engineer",
    "placedDate": "2025-05-15T00:00:00.000Z",
    "appRole": "alumni"
  },
  {
    "studentData": {
      "name": "Aishwarya Bhat",
      "email": "aish.bhat@example.com",
      "usn": "1SJ21IS042",
      "phone": "8855221144",
      "branch": "ISE",
      "cgpa": 8.1,
      "skills": ["AWS", "Docker", "Python", "Kubernetes"],
      "resume": "https://example.com/resumes/aish.pdf"
    },
    "password": "$2a$12$SomeHashedPasswordExample123",
    "companyJoined": "CloudNet Systems",
    "role": "Cloud DevOps Engineer",
    "placedDate": "2025-07-22T00:00:00.000Z",
    "appRole": "alumni"
  },
  {
    "studentData": {
      "name": "Tariq Ahmed",
      "email": "tariq.a@example.com",
      "usn": "1SJ21EC019",
      "phone": "7744112255",
      "branch": "ECE",
      "cgpa": 7.4,
      "skills": ["C++", "Python", "SQL", "Excel"],
      "resume": "https://example.com/resumes/tariq.pdf"
    },
    "password": "$2a$12$SomeHashedPasswordExample123",
    "companyJoined": "DataSys Analytics",
    "role": "Data Analyst",
    "placedDate": "2025-06-18T00:00:00.000Z",
    "appRole": "alumni"
  },
  {
    "studentData": {
      "name": "Pooja Hegde",
      "email": "pooja.h@example.com",
      "usn": "1SJ21CS143",
      "phone": "6633221188",
      "branch": "CSE",
      "cgpa": 9.2,
      "skills": ["Java", "Spring", "Microservices", "Hibernate"],
      "resume": "https://example.com/resumes/pooja.pdf"
    },
    "password": "$2a$12$SomeHashedPasswordExample123",
    "companyJoined": "FinEdge Tech",
    "role": "Backend Engineer",
    "placedDate": "2025-08-10T00:00:00.000Z",
    "appRole": "alumni"
  },
  {
    "studentData": {
      "name": "Gautam Menon",
      "email": "gautam.m@example.com",
      "usn": "1SJ21ME092",
      "phone": "5522114477",
      "branch": "ME",
      "cgpa": 7.6,
      "skills": ["IoT", "MATLAB", "Embedded C"],
      "resume": "https://example.com/resumes/gautam.pdf"
    },
    "password": "$2a$12$SomeHashedPasswordExample123",
    "companyJoined": "Mechtronics Innovations",
    "role": "System Automation Engineer",
    "placedDate": "2025-08-20T00:00:00.000Z",
    "appRole": "alumni"
  }
]
```
