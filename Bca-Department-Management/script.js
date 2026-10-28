// Sample student data
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
        name: "Ashish Kumar ",
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
    }
];
// Home section show karna
function showHome() {
    document.getElementById("homeSection").style.display = "block";
    document.getElementById("studentSection").style.display = "none";
}
// Student Information section show karna
function showStudentInfo() {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("studentSection").style.display = "block";
}
// Roll number se student search karna
function searchStudent() {
    let roll = document.getElementById("rollNo").value;
    let result = document.getElementById("result");
    if (roll === "") {
        result.innerHTML = '<p class="error">Please enter student roll number.</p>';
        return;
    }
    let student = students.find(s => s.rollNo === Number(roll));
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
        <p><strong>Residential Address:</strong> ${student.residentialAddress}</p>
    </div>
`;
    } else {
        result.innerHTML =
            '<p class="error">Student not found! Please enter a valid roll number.</p>';
    }
}