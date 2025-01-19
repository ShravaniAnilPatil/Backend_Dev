const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Admin= require("../models/Admin");
const User = require("../models/User");


router.post("/admin/signup", async (req, res) => {
  const { email, password, adminname, phone_number, gender} = req.body;

  if (!email || !password || !adminname || !phone_number || !gender) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  try {
   
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already registereed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      adminname,
      phone_number,
      gender,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


  router.post("/admin/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      res.status(200).json({ message: "Login successful", email: admin.email });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  });
  
  router.get('/users', async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Admin email is required." });
    }
  
    try {
      const isAdmin = await Admin.findOne({ email });
      if (!isAdmin) {
        return res.status(403).json({ message: "Access denied. Admin privileges required." });
      }
  
      const users = await User.find({}, '-password'); 
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
    }
  });
  
  
  
module.exports = router;