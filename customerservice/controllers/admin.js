const Auth = require("../models/Auth");

const profile = async (req, res, next) => {
  try {
    const user = req.user;

    const data = await Auth.findOne({ userName: user.userName }).select(
      "name email"
    );

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res) => {
  console.log('shabdjasbhd');
  
  try {
    const users = await Auth.find();
    return res.status(200).json({ success: true, users })
  } catch (error) {
    next(error);
  }
}

const addUser = async (req, res) => {
  try {
    const { userName, email, password, role, name, phonenumber, address } = req.body;

    // Check if all required fields are provided
    if (!userName || !email || !password || !name || !phonenumber || !address) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if username already exists
    const isUserNameExist = await Auth.isUserNameExist(userName);
    if (isUserNameExist) {
      return res.status(400).json({ error: `Username '${userName}' is already registered!` });
    }

    // Check if email is already registered
    const existingEmail = await Auth.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already registered!" });
    }


    // Create new user
    const newUser = new Auth({
      userName,
      email,
      password,
      role,
      name,
      phonenumber,
      address,
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully!", user: newUser });

  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, role, name, phonenumber, address, active } = req.body;

    const updatedUser = await Auth.findByIdAndUpdate(
      id,
      { userName, email, role, name, phonenumber, address, active },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await Auth.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
}

module.exports = { profile, getUsers, addUser, updateUser, deleteUser };
