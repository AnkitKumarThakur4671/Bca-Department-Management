const API_BASE = "http://localhost:3000";

// ==========================================
// SEMESTER SUBJECT DATA
// ==========================================
const semesterSubjects = {
    1: [
        { name: "Computer Fundamentals and Organizations", code: "CC-1", credits: "4", lectures: "60 Lectures" },
        { name: "Programming Techniques Using C", code: "CC-2", credits: "4", lectures: "60 Lectures" },
        { name: "Mathematics", code: "GE-1", credits: "6", lectures: "60 Lectures" },
        { name: "English Composition", code: "AECC-1" }
    ],

    2: [
        { name: "Programming in Java", code: "CC-3", credits: "4", lectures: "60 Lectures" },
        { name: "Computer System Architecture", code: "To be confirmed", credits: "6(5+1)", lectures: "60 Lectures" },
        { name: "Mathematics", code: "GE-2", credits: "6", lectures: "60 Lectures" },
        { name: "Environmental Studies (EVS)", code: "AECC-2", credits: "To be confirmed", lectures: "To be confirmed" }
    ],

    3: [
        { name: "Python Programming", code: "CC-5", credits: "4", lectures: "60 Lectures" },
        { name: "Structured System Analysis and Design", code: "CC-7", credits: "6(5+1)", lectures: "60 Lectures" },
        { name: "Operating Systems", code: "CC-6", credits: "4", lectures: "60 Lectures" },
        { name: "Statistics & Probability", code: "STAT I", credits: "(05+01)", lectures: "60 Lectures" }
    ],

    4: [
        { name: "Computer Networks", code: "CC-8", credits: "6(5+1)", lectures: "60 Lectures" },
        { name: "VB.NET", code: "CC-9", credits: "4", lectures: "60 Lectures" },
        { name: "RDBMS and Oracle", code: "CC-10", credits: "4", lectures: "60 Lectures" },
        { name: "Statistics & Probability", code: "SEC-2", credits: "(05+01)", lectures: "60 Lectures" }
    ],

    5: [
        { name: "Data Structures", code: "CC-11", credits: "4", lectures: "60 Lectures" },
        { name: "Introduction to Big Data Analytics", code: "CC-12", credits: "6(5+1)", lectures: "60 Lectures" }
    ],

    6: [
        { name: "Web Technology", code: "CC-13", credits: "4", lectures: "60 Lectures" },
        { name: "Android and App Development", code: "CC-14", credits: "4", lectures: "60 Lectures" }
    ]
};

// ==========================================
// SEMESTER-WISE TEACHER DATA
// ==========================================
const semesterTeachers = {
    1: {
        "Computer Fundamentals and Organizations": "Chaubey sir",
        "Programming Techniques Using C": "Priyanka Kumari",
        "Mathematics": "Dinesh Majhi & Avinash sir",
        "English Composition": "Neha Kumari"
    },

    2: {
        "Programming in Java": "Jha sir",
        "Computer System Architecture": "Priyanka Kumari",
        "Mathematics": "Dinesh Majhi & Avinash sir",
        "Environmental Studies (EVS)": "Amit sir & Shashi Prabha"
    },

    3: {
        "Python Programming": "Jha sir",
        "Structured System Analysis and Design": "Priyanka Kumari",
        "Operating Systems": "Ajit Singh",
        "Statistics & Probability": "Anjani Kumar Sinha"
    },

    4: {
        "Computer Networks": "Not confirmed",
        "VB.NET": "Not confirmed",
        "RDBMS and Oracle": "Not confirmed",
        "Statistics & Probability": "Anjani Kumar Sinha"
    },

    5: {
        "Data Structures": "Not confirmed",
        "Introduction to Big Data Analytics": "Not confirmed"
    },

    6: {
        "Web Technology": "Not confirmed",
        "Android and App Development": "Not confirmed"
    }
};

// ==========================================
// COMMON HELPER FUNCTIONS
// ==========================================
function hideAllSections() {
   const sectionIds = [
    "homeSection",
    "studentSection",
    "addStudentSection",
    "updateStudentSection",
    "subjectSection",
    "teacherSection"
];

    sectionIds.forEach(function (id) {
        const section = document.getElementById(id);

        if (section) {
            section.style.display = "none";
        }
    });
}

// ==========================================
// HOME
// ==========================================
function showHome() {
    hideAllSections();

    document.getElementById("homeSection").style.display = "block";

    document.getElementById("result").innerHTML = "";
    document.getElementById("rollNo").value = "";
}

// ==========================================
// STUDENT INFORMATION
// ==========================================
function showStudentInfo() {
    hideAllSections();

    document.getElementById("studentSection").style.display = "block";

    document.getElementById("result").innerHTML = "";
    document.getElementById("rollNo").value = "";
}

function clearResult() {
    document.getElementById("result").innerHTML = "";
}

// ==========================================
// SEARCH STUDENT BY ROLL NUMBER
// ==========================================
async function searchStudent() {
    const roll = document.getElementById("rollNo").value.trim();
    const result = document.getElementById("result");

    if (roll === "") {
        result.innerHTML =
            '<p class="error">Please enter student roll number.</p>';
        return;
    }

    result.innerHTML = "<p>Searching student...</p>";

    try {
        const response = await fetch(
            `${API_BASE}/api/students/${encodeURIComponent(roll)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success || !data.student) {
            result.innerHTML =
                '<p class="error">Student not found! Please check the roll number.</p>';
            return;
        }
        const student = data.student;

        let dob = "Not available";

        if (student.dob) {
            const dateString = String(student.dob).slice(0, 10);

            if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                const parts = dateString.split("-");
                dob = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
                dob = dateString;
            }
        }
        // Create the student information card safely
        const card = document.createElement("div");
        card.className = "student-card";

        const heading = document.createElement("h3");
        heading.textContent = "Student Information";
        card.appendChild(heading);

        const details = [
            ["Name", student.student_name],
            ["Roll No.", student.roll_no],
            ["Session", student.session],
            ["Father's Name", student.father_name],
            ["Course", student.course],
            ["Date of Birth", dob],
            ["Gender", student.gender],
            ["Residential Address", student.address]
        ];

        details.forEach(function ([label, value]) {
            const paragraph = document.createElement("p");
            const strong = document.createElement("strong");

            strong.textContent = label + ": ";
            paragraph.appendChild(strong);
            paragraph.appendChild(
                document.createTextNode(
                    value === null || value === undefined || value === ""
                        ? "Not available"
                        : String(value)
                )
            );

            card.appendChild(paragraph);
        });

        result.replaceChildren(card);

    } catch (error) {
        console.error("Student search error:", error);

        result.innerHTML =
            '<p class="error">Server se connection nahi ho pa raha hai. Check karo ki server chal raha hai.</p>';
    }
}

// ==========================================
// SUBJECT INFORMATION
// ==========================================
function showSubjectInfo() {
    hideAllSections();

    document.getElementById("subjectSection").style.display = "block";
    document.getElementById("semesterPage").style.display = "block";
    document.getElementById("subjectsPage").style.display = "none";

    document.getElementById("result").innerHTML = "";
    document.getElementById("rollNo").value = "";
}

function showSemesterSubjects(semester) {
    document.getElementById("semesterPage").style.display = "none";
    document.getElementById("subjectsPage").style.display = "block";

    document.getElementById("semesterHeading").textContent =
        `Semester ${semester} — Subject Information`;

    const subjectsList = document.getElementById("subjectsList");
    const description = document.getElementById("semesterDescription");
    const subjects = semesterSubjects[semester];

    subjectsList.innerHTML = "";

    if (!subjects) {
        description.textContent = "Subject information is not available yet.";
        return;
    }

    description.textContent =
        `Here are the subjects listed for Semester ${semester}.`;

    subjects.forEach(function (subject, index) {
        const card = document.createElement("div");
        card.className = "subject-card";

        const number = document.createElement("span");
        number.className = "subject-number";
        number.textContent = `SUBJECT ${index + 1}`;

        const heading = document.createElement("h3");
        heading.textContent = subject.name;

        const code = document.createElement("p");
        code.textContent = `Course: ${subject.code}`;

        const credits = document.createElement("p");
        credits.textContent = `Credits: ${subject.credits ?? "Not available"}`;

        const duration = document.createElement("p");
        duration.textContent =
            `Duration: ${subject.lectures ?? "Not available"}`;

        card.append(number, heading, code, credits, duration);
        subjectsList.appendChild(card);
    });
}

function backToSemesters() {
    document.getElementById("subjectsPage").style.display = "none";
    document.getElementById("semesterPage").style.display = "block";
    document.getElementById("subjectsList").innerHTML = "";
}

// ==========================================
// TEACHER INFORMATION
// ==========================================
function showTeacherInfo() {
    hideAllSections();

    document.getElementById("teacherSection").style.display = "block";
    document.getElementById("teacherSubjectsPage").style.display = "none";

    document.querySelector("#teacherSection .semester-grid").style.display =
        "grid";

    document.getElementById("teacherSubjectsList").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("rollNo").value = "";
}

function showSemesterTeachers(semester) {
    document.querySelector("#teacherSection .semester-grid").style.display =
        "none";

    document.getElementById("teacherSubjectsPage").style.display = "block";

    document.getElementById("teacherSemesterHeading").textContent =
        `Semester ${semester} — Teacher Information`;

    const subjects = semesterSubjects[semester] || [];
    const teachers = semesterTeachers[semester] || {};
    const teacherList = document.getElementById("teacherSubjectsList");

    teacherList.innerHTML = "";

    if (subjects.length === 0) {
        teacherList.textContent = "Subject information is not available yet.";
        return;
    }

    subjects.forEach(function (subject) {
        const card = document.createElement("div");
        card.className = "subject-card";

        const heading = document.createElement("h3");
        heading.textContent = subject.name;

        const code = document.createElement("p");
        code.textContent = `Course Code: ${subject.code}`;

        const teacher = document.createElement("p");
        teacher.textContent =
            `Teacher: ${teachers[subject.name] || "Not Assigned"}`;

        card.append(heading, code, teacher);
        teacherList.appendChild(card);
    });
}

function backToTeacherSemesters() {
    document.getElementById("teacherSubjectsPage").style.display = "none";

    document.querySelector("#teacherSection .semester-grid").style.display =
        "grid";

    document.getElementById("teacherSubjectsList").innerHTML = "";
}
// ==========================================
// UPDATE STUDENT - LOAD EXISTING DETAILS
// ==========================================

function showUpdateStudent() {
    hideAllSections();

    document.getElementById("updateStudentSection").style.display = "block";

    document.getElementById("updateStudentForm").style.display = "none";

    document.getElementById("updateStudentMessage").innerHTML = "";

    document.getElementById("updateRollNo").value = "";
}

async function loadStudentForUpdate() {

    const roll = document.getElementById("updateRollNo").value.trim();

    const message = document.getElementById("updateStudentMessage");

    const form = document.getElementById("updateStudentForm");

    if (roll === "") {
        message.textContent = "Please enter student roll number.";
        message.className = "error";
        form.style.display = "none";
        return;
    }

    message.textContent = "Searching student...";
    message.className = "";

    form.style.display = "none";

    try {

        const response = await fetch(
            `${API_BASE}/api/students/${encodeURIComponent(roll)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success || !data.student) {

            message.textContent = "Student not found! Please check roll number.";

            message.className = "error";

            return;
        }

        const student = data.student;

        // Fill existing student details

        document.getElementById("updateStudentName").value =
            student.student_name || "";

        document.getElementById("updateFatherName").value =
            student.father_name || "";

        document.getElementById("updateSession").value =
            student.session || "";

        document.getElementById("updateCourse").value =
            student.course || "";

        document.getElementById("updateDob").value =
            student.dob ? String(student.dob).slice(0, 10) : "";

        document.getElementById("updateGender").value =
            student.gender || "";

        document.getElementById("updateAddress").value =
            student.address || "";

        message.textContent = "Student found! You can now edit the details.";

        message.className = "";

        message.style.color = "green";

        form.style.display = "block";

    } catch (error) {

        console.error("Load student error:", error);

        message.textContent = "Server se connection nahi ho pa raha hai.";

        message.className = "error";
    }
}
// ==========================================
// UPDATE STUDENT DETAILS IN DATABASE
// ==========================================

async function updateStudent(event) {

    event.preventDefault();

    const roll = document.getElementById("updateRollNo").value.trim();

    const message = document.getElementById("updateStudentMessage");

    const student = {
        student_name: document.getElementById("updateStudentName").value.trim(),
        father_name: document.getElementById("updateFatherName").value.trim(),
        session: document.getElementById("updateSession").value.trim(),
        course: document.getElementById("updateCourse").value.trim(),
        dob: document.getElementById("updateDob").value,
        gender: document.getElementById("updateGender").value,
        address: document.getElementById("updateAddress").value.trim()
    };

    message.textContent = "Updating student...";
    message.className = "";

    try {

        const response = await fetch(
            `${API_BASE}/api/students/${encodeURIComponent(roll)}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {

            message.textContent = data.message || "Unable to update student.";

            message.className = "error";

            return;
        }

        message.textContent = "Student details updated successfully!";

        message.style.color = "green";

    } catch (error) {

        console.error("Update student error:", error);

        message.textContent = "Server se connection nahi ho pa raha hai.";

        message.className = "error";
    }
}

// ==========================================
// ADD STUDENT
// ==========================================
function showAddStudent() {
    hideAllSections();

    document.getElementById("addStudentSection").style.display = "block";
}

async function addStudent(event) {
    event.preventDefault();

    const message = document.getElementById("addStudentMessage");

    message.textContent = "Saving student...";
    message.className = "";
    message.style.color = "";

    const student = {
        roll_no: document.getElementById("newRollNo").value.trim(),
        student_name: document.getElementById("newStudentName").value.trim(),
        father_name: document.getElementById("newFatherName").value.trim(),
        session: document.getElementById("newSession").value.trim(),
        course: document.getElementById("newCourse").value.trim(),
        dob: document.getElementById("newDob").value,
        gender: document.getElementById("newGender").value,
        address: document.getElementById("newAddress").value.trim()
    };

    try {
        const response = await fetch(`${API_BASE}/api/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            message.textContent =
                data.message || "Unable to add student. Please try again.";
            message.className = "error";
            return;
        }

        message.textContent = "Student added successfully!";
        message.style.color = "green";

        document.getElementById("addStudentForm").reset();

    } catch (error) {
        console.error("Add student error:", error);

        message.textContent =
            "Server se connection nahi ho pa raha hai.";
        message.className = "error";
    }
}