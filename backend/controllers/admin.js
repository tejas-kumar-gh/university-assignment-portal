const bcrypt = require('bcryptjs');
const adminSchema = require('../models/Admin');

async function register(req, res) {
  const { name, email, password, role } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    await adminSchema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(200).json({
      message: "Admin created successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = register;
