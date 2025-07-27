const db = require("../config/connectDb");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

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

module.exports = {
  adminLogin,
};
