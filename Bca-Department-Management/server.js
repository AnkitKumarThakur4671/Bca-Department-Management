const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// MySQL connection settings from .env
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
};

// Test database connection
app.get("/api/status", async (req, res) => {
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.query(
            "SELECT DATABASE() AS databaseName"
        );

        res.json({
            success: true,
            message: "Backend and MySQL connected successfully!",
            database: rows[0].databaseName
        });

    } catch (error) {
        console.error("Database connection error:", error.message);

        res.status(500).json({
            success: false,
            message: "Database connection failed."
        });

    } finally {
        if (connection) {
            await connection.end();
        }
    }
});
// Get all students from MySQL database
app.get("/api/students", async (req, res) => {
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.query(
           "SELECT * FROM students ORDER BY CAST(roll_no AS UNSIGNED) ASC"
        );

        res.json({
            success: true,
            students: rows
        });

    } catch (error) {
        console.error("Fetch students error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch students."
        });

    } finally {
        if (connection) await connection.end();
    }
});


// Search student using roll number
app.get("/api/students/:rollNo", async (req, res) => {
    let connection;

    try {
        const rollNo = req.params.rollNo;

        connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.execute(
            `SELECT id, roll_no, student_name, father_name,
                    session, course, dob, gender, address
             FROM students
             WHERE roll_no = ?
             LIMIT 1`,
            [rollNo]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        res.json({
            success: true,
            student: rows[0]
        });

    } catch (error) {
        console.error("Student search error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to search student."
        });

    } finally {
        if (connection) {
            await connection.end();
        }
    }
});
// Update student details
app.put("/api/students/:rollNo", async (req, res) => {
    let connection;

    try {
        const rollNo = req.params.rollNo;

        const {
            student_name,
            father_name,
            session,
            course,
            dob,
            gender,
            address
        } = req.body;

        connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            `UPDATE students
             SET student_name = ?,
                 father_name = ?,
                 session = ?,
                 course = ?,
                 dob = ?,
                 gender = ?,
                 address = ?
             WHERE roll_no = ?`,
            [
                student_name,
                father_name,
                session,
                course,
                dob || null,
                gender,
                address,
                rollNo
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        res.json({
            success: true,
            message: "Student updated successfully!"
        });

    } catch (error) {
        console.error("Update student error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to update student."
        });

    } finally {
        if (connection) await connection.end();
    }
});
// Add a new student to the database
app.post("/api/students", async (req, res) => {
    let connection;

    try {
        const {
            roll_no,
            student_name,
            father_name,
            session,
            course,
            dob,
            gender,
            address
        } = req.body;

        // Check that all fields are provided
        if (
            !roll_no ||
            !student_name?.trim() ||
            !father_name?.trim() ||
            !session?.trim() ||
            !course?.trim() ||
            !dob ||
            !gender ||
            !address?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all student details."
            });
        }

        connection = await mysql.createConnection(dbConfig);

        // Insert student details into MySQL
        const [result] = await connection.execute(
            `INSERT INTO students
                (roll_no, student_name, father_name, session,
                 course, dob, gender, address)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                String(roll_no).trim(),
                student_name.trim(),
                father_name.trim(),
                session.trim(),
                course.trim(),
                dob,
                gender,
                address.trim()
            ]
        );

        res.status(201).json({
            success: true,
            message: "Student added successfully!",
            studentId: result.insertId
        });

    } catch (error) {
        console.error("Add student error:", error.message);

        // Handle duplicate roll number
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "This roll number already exists. Please enter a different roll number."
            });
        }

        res.status(500).json({
            success: false,
            message: "Unable to add student. Please check the details and try again."
        });

    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// Open website
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});