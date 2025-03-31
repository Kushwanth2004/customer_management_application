const { Router } = require("express");
const authRouters = require("./auth");

const router = Router();

// auth routes
router.use("/api/auth", authRouters);

module.exports = router;
