const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "jorimmarcus@gmail.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: "Admin",
      email: "jorimmarcus@gmail.com",
      password: "mostwanted",
      role: "admin",
      phone: "",
      interests: [],
      skills: "",
    });

    console.log("✅ Admin user created successfully");
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
