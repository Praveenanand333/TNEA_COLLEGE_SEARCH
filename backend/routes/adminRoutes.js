const express = require("express");
const router = express.Router();
const { adminLogin, uploadJsonData } = require("../controllers/adminController");
const uploadMiddleware = require("../Middleware/uploadMiddleware");

router.post("/login", adminLogin);
router.post("/admin/uploads",uploadMiddleware.single("jsonfile"),uploadJsonData)

module.exports = router;
