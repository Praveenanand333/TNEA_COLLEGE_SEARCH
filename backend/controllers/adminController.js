const fs = require("fs");
const db = require("../config/connectDb");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// Admin Login
const adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admin WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Admin login successful" });
  });
});


const uploadJsonData = asyncHandler(async (req, res) => {
  console.log("Uploaded file info:",req.file);
  const filePath = req.file.path;
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData);

  if (!Array.isArray(jsonData)) {
    fs.unlinkSync(filePath);
    return res.status(400).json({ message: "Invalid JSON format." });
  }

  const year = new Date().getFullYear();

  for (const item of jsonData) {
    const collegeId = item.coc;
    const collegeName = item.con;
    const courseId = item.brc;
    const courseName = item.brn;

    // Insert College
    db.query("SELECT * FROM colleges WHERE id = ?", [collegeId], (err, results) => {
      if (!err && results.length === 0) {
        db.query("INSERT INTO colleges (id, name) VALUES (?, ?)", [collegeId, collegeName]);
      }
    });

    // Insert Course
    db.query("SELECT * FROM courses WHERE id = ?", [courseId], (err, results) => {
      if (!err && results.length === 0) {
        db.query("INSERT INTO courses (id, name) VALUES (?, ?)", [courseId, courseName]);
      }
    });

    const communities = ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"];

    for (const community of communities) {
      const value = item[community];
      if (value !== "" && value !== undefined) {
        const collegeCourseId = `${collegeId}${courseId}${year}${community}`;

        // Determine if value is cutoff or rank
        const isCutoff = Number(value) < 500;
        const columnToInsert = isCutoff ? "min_cutoff" : "max_rank";

        // Check if the record already exists
        db.query(
          "SELECT * FROM college_courses WHERE college_course_id = ?",
          [collegeCourseId],
          (err, results) => {
            if (err) return;

            if (results.length === 0) {
              // Insert new record
              const min_cutoff = isCutoff ? value : null;
              const max_rank = isCutoff ? null : value;

              db.query(
                "INSERT INTO college_courses (college_course_id, college_id, course_id, year, community, min_cutoff, max_rank) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [collegeCourseId, collegeId, courseId, year, community, min_cutoff, max_rank]
              );
            } else {
              // Update existing record
              const updateSql = `UPDATE college_courses SET ${columnToInsert} = ? WHERE college_course_id = ?`;
              db.query(updateSql, [value, collegeCourseId]);
            }
          }
        );
      }
    }
  }


 return res.status(200).end();

});
module.exports = {
  adminLogin,
  uploadJsonData
};