const { Router } = require("express");
const router = Router();
const adminController = require("../../controllers/admin");

// api/admin/profile
router.use("/profile", adminController.profile);

router.get("/users", adminController.getUsers);

router.post("/users",adminController.addUser);

router.put("/users/:id",adminController.updateUser);

router.delete("/users/:id",adminController.deleteUser);

module.exports = router;
