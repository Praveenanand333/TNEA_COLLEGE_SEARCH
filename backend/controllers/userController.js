const db = require("../config/connectDb");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const registerUser =asyncHandler(async(req, res) => {
  const { email, password, Cutoff, Rank } = req.body;

  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertSql = "INSERT INTO users (email, password, Cutoff, Rank) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [email, hashedPassword, Cutoff, Rank], (err, result) => {
      if (err) return res.status(500).json({ message: "Insert failed", error: err });

      return res.status(201).json({ message: "User registered successfully" });
    });
  });
});


module.exports = {
  registerUser,
};
