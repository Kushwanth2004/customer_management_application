const { Router } = require("express");
const adminRouters = require("./admin");
const userRouters = require("./user");
const isAuth = require("../middleware/isAuth");

const router = Router();


// admin routes
router.use("/api/admin", adminRouters);

// user routes
router.use("/api/user", isAuth("user"), userRouters);

module.exports = router;
