const AdminLogin = require("../../model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const customError = require("../../helper/customErr");

const adminController = {
  // API to handle admin login
  adminLogin: async (req, res) => {
    const { email, password: pwd } = req.body;
    try {
      // Find admin by email
      const admin = await AdminLogin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ error: "Invalid email or password " });
      }
      // Compare passwords for authentication
      const passwordMatch = await bcrypt.compare(pwd, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password " });
      }
      // Generate JWT token for authenticated admin
      const accessToken = jwt.sign(
        { adminId: admin._id, role: "admin" },
        "your-secret-key"
      );
      let { password, ...rest } = admin.toJSON();
      res.json({
        message: "Admin login successfully",
        data: { ...rest, accessToken },
      });
    } catch (error) {
      console.error("Error: ", error);
      customError.Error(res);
    }
  },
  // API to handle admin logout
  adminLogout: async (req, res) => {
    const { adminId } = req.adminId;
    try {
      // Check if the admin exists
      const findAdmin = await AdminLogin.findById(adminId);
      if (!findAdmin) {
        return res.status(400).json({ error: "Admin not found" });
      }
      res.json({ message: "Admin logout successfully" });
    } catch (error) {
      console.log("error: ", error);
      customError.Error(res);
    }
  },
};
module.exports = adminController;
