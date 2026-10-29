// ==========================================
// SAMPLE STUDENT DATA
// ==========================================

const students = [
    {
        name: "Ankit Kumar Thakur",
        rollNo: 865,
        idNo: 2,
        session: "2025-28",
        course: "BCA",
        fatherName: "Vikash Thakur",
        dob: "06-05-2006",
        gender: "M",
        age: 19,
        residentialAddress:
            "Vill.- Meghua, P.S.- Rasepur, Dist.- East Champaran"
    },

    {
        name: "Ashish Kumar",
        rollNo: 866,
        idNo: "06",
        session: "2025-28",
        course: "BCA",
        fatherName: "Kamlesh Prasad",
        dob: "26-01-2008",
        gender: "M",
        age: 18,
        residentialAddress:
            "Raniput Khaidhki, Patna City"
    },
    {
        name: "Adarsh Sinha",
        rollNo: 862,
        idNo: "02",
        session: "2025-28",
        course: "BCA",
        fatherName: "Vivek Kumar Sinha",
        dob: "26-02-2027",
        gender: "M",
        age: 19,
        residentialAddress:
            "Vinod Bhawan, Kankarbag Main Road, Patna 800020 Bihar"
    },

    {
        name: "Ashish Kumar",
        rollNo: 888,
        idNo: "06",
        session: "2025-28",
        course: "BCA",
        fatherName: "Om Prakash",
        dob: "10-08-2008",
        gender: "M",
        age: 18,
        residentialAddress:
            "vill-Harbanshpur, Mausauri Patna, 804452"
    }
];


// ==========================================
// SEMESTER 1 SUBJECT DATA
// Based on the syllabus pages reviewed
// ==========================================

const semesterSubjects = {

    1: [
        {
            name: "Computer Fundamentals and Organizations",
            code: "CC-1",
            credits: "4",
            lectures: "60 Lectures"
        },

        {
            name: "Programming Techniques Using C",
            code: "CC-2",
            credits: "4",
            lectures: "60 Lectures"
        },

        {
            name: "Mathematics",
            code: "GE-1",
            credits: "6",
            lectures: "60 Lectures"
        },

        {
            name: "English Composition",
            code: "AECC-1",
        }
    ],
    2: [
    {
    name: "Programming in Java",
    code: "CC-3",
    credits: "4",
    lectures: "60 Lecture"
    },
    {
    name: "System Design",
    code: "To be confirmed",
    credits: "To be confirmed",
    lectures: "To be confirmed"
    },
    {
    name: "Mathematics",
    code: "GE-2",
    credits: "6",
    lectures: "60"
    },
    {
        name: "Environmental Studies (EVS)",
        code: "AECC-2",
        credits: "To be confirmed",
        lectures: "To be confirmed"
    }
    ],
    3: [
    {
        name: "Python Programming",
        code: "CC-5",
        credits: 4,
        lectures: 60
    },
    {
        name: "Structured System Analysis and Design",
        code: "CC-7",
        credits:"6(5+1)",
        lectures: "60 Lecture"
    },
    {
        name: "Operating Systems",
        code: "CC-6",
        credits: 4,
        lectures: "60 Lecture"
    },
     {
        name: "Statistics & Probability",
        code: "STAT I",
        credits: "(05+01)",
        lectures: "60 Lecture"
    }
    ],
    4:[
        {
            name: "Computer Networks",
            code: "CC-8",
            credits: "6(5+1)",
            lectures: "60 Lecture"
        },
        {
            
            name: "VB.NET",
            code: "CC-9",
            credits: "4",
            lectures: "60 Lecture"
        },
        {
            name: "RDBMS and Oracle",
            code: "CC-10",
            credits: "4",
            lectures: "60 Lecture"
        },
        {
            name: "Statistics & Probability",
            code: "SEC-2",
            credits: "(05+01)",
            lectures: "60 Lecture"
        },
    ],
    5:[
        {
            name: "Data stuctures",
            code: "CC-11",
            credits: "4",
            lectures: "60 Lecture"
        },
        {
            name: "Introduction to Big Data Analytics",
            code: "CC-12",
            credits: "6(5+1)",
            lectures: "60 Lecture"
        },
    ],
    6:[
        {
            name: "Web Technology",
            code: "CC-13",
            credits: "4",
            lectures: "60 Lecture"
        },
        {
            name: "Android and App Developmemt",
            code: "CC-14",
            credits: "4",
            lectures: "60 Lecture"
        }
    ]
};


// ==========================================
// SHOW HOME SECTION
// ==========================================

function showHome() {

    document.getElementById("homeSection").style.display = "block";

    document.getElementById("studentSection").style.display = "none";

    document.getElementById("subjectSection").style.display = "none";

    document.getElementById("result").innerHTML = "";

    document.getElementById("rollNo").value = "";

}


// ==========================================
// SHOW STUDENT INFORMATION
// ==========================================

function showStudentInfo() {

    document.getElementById("homeSection").style.display = "none";

    document.getElementById("studentSection").style.display = "block";

    document.getElementById("subjectSection").style.display = "none";

    document.getElementById("result").innerHTML = "";

    document.getElementById("rollNo").value = "";

}


// ==========================================
// CLEAR STUDENT SEARCH RESULT
// ==========================================

function clearResult() {

    document.getElementById("result").innerHTML = "";

}


// ==========================================
// SEARCH STUDENT BY ROLL NUMBER
// ==========================================

function searchStudent() {

    let roll = document.getElementById("rollNo").value;

    let result = document.getElementById("result");


    // Check empty input
    if (roll === "") {

        result.innerHTML =
            '<p class="error">Please enter student roll number.</p>';

        return;
    }


    // Find student
    let student = students.find(
        s => s.rollNo === Number(roll)
    );


    // Display student information
    if (student) {

        result.innerHTML = `
            <div class="student-card">

                <h3>Student Information</h3>

                <p><strong>Name:</strong> ${student.name}</p>

                <p><strong>Roll No.:</strong> ${student.rollNo}</p>

                <p><strong>ID No.:</strong> ${student.idNo}</p>

                <p><strong>Session:</strong> ${student.session}</p>

                <p><strong>Father's Name:</strong> ${student.fatherName}</p>

                <p><strong>Course:</strong> ${student.course}</p>

                <p><strong>Date of Birth:</strong> ${student.dob}</p>

                <p><strong>Residential Address:</strong>
                    ${student.residentialAddress}
                </p>

            </div>
        `;

    } else {

        result.innerHTML = `
            <p class="error">
                Student not found! Please enter a valid roll number.
            </p>
        `;

    }

}


// ==========================================
// SHOW SUBJECT INFORMATION
// ==========================================

function showSubjectInfo() {

    document.getElementById("homeSection").style.display = "none";

    document.getElementById("studentSection").style.display = "none";

    document.getElementById("subjectSection").style.display = "block";


    // Show semester selection page
    document.getElementById("semesterPage").style.display = "block";

    document.getElementById("subjectsPage").style.display = "none";


    // Clear previous student search
    document.getElementById("result").innerHTML = "";

    document.getElementById("rollNo").value = "";

}


// ==========================================
// SHOW SELECTED SEMESTER SUBJECTS
// ==========================================

function showSemesterSubjects(semester) {

    // Hide semester cards
    document.getElementById("semesterPage").style.display = "none";


    // Show subject details page
    document.getElementById("subjectsPage").style.display = "block";


    // Update heading
    document.getElementById("semesterHeading").textContent =
        "Semester " + semester + " — Subject Information";


    // Get subject list container
    let subjectsList = document.getElementById("subjectsList");

    let description = document.getElementById("semesterDescription");


    // Get subjects for the selected semester
    let subjects = semesterSubjects[semester];


    // If subject data is not available
    if (!subjects) {

        description.textContent =
            "Subject information for this semester will be added after verifying the syllabus.";

        subjectsList.innerHTML = `
            <div class="info-message">

                <h3>Subject List Not Added Yet</h3>

                <p>
                    The subjects for Semester ${semester}
                    have not been added yet.
                </p>

            </div>
        `;

        return;
    }


    // Update description
    description.textContent =
        "Here are the subjects listed for Semester " + semester + ".";


    // Clear previous subject cards
    subjectsList.innerHTML = "";


    // Display every subject as a card
    subjects.forEach(function(subject, index) {

        subjectsList.innerHTML += `
            <div class="subject-card">

                <span class="subject-number">
                    SUBJECT ${index + 1}
                </span>

                <h3>${subject.name}</h3>

                <p>
                    <strong>Course:</strong>
                    ${subject.code}
                </p>

                <p>
                    <strong>Credits:</strong>
                    ${subject.credits}
                </p>

                <p>
                    <strong>Duration:</strong>
                    ${subject.lectures}
                </p>

            </div>
        `;

    });

}


// ==========================================
// BACK TO SEMESTER SELECTION
// ==========================================

function backToSemesters() {

    // Hide selected semester subjects
    document.getElementById("subjectsPage").style.display = "none";


    // Show all six semester cards
    document.getElementById("semesterPage").style.display = "block";


    // Clear previous subject cards
    document.getElementById("subjectsList").innerHTML = "";

}