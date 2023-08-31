const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");

// Authenticate user and get token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create and sign a JSON Web Token
    const payload = {
      user: {
        id: user.uniqueId,
        role: user.role,
        email : user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ payload });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// password change
router.put("/change-password", async (req, res) => {
  const { uniqueId, currentPassword, newPassword } = req.body;
  
  try {
    // Find the user in the database
    const user = await User.findOne({uniqueId});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password is correct
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Hash the new password and update the user's password in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get the currently logged in user
router.get("/:id", async (req, res) => {
  try {
    // Get the user from the database
    console.log(req.params.id);
    const user = await User.findOne({uniqueId : req.params.id}).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Register student programatically
const registerUser = async (email, password, role, uniqueId) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      console.log("User already exists");
      return;
    }

    // Create a new user object
    user = new User({
      email,
      password,
      role,
      uniqueId,
    });

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the database
    await user.save();

    console.log(`Student ${email} registered successfully`);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteUser = async (email) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      console.log("User doesn't exists");
      return;
    }

    user.deleteOne().then(data => console.log(`Student ${email} deleted successfully`));
    
  } catch (err) {
    console.error(err.message);
  }
};

async function register() {
  // Register students from 20ucs001 to 20ucs250
  // for (let i = 75; i <= 250; i++) {
    // const name = "Random Name";
    // const email = `20ucs${i.toString().padStart(3, "0")}@lnmiit.ac.in`;
    // const password = `20ucs${i.toString().padStart(3, "0")}`;
    // role = "student";

    // await registerUser(
    //   "20ucs057@lnmiit.ac.in",
    //   "20ucs057",
    //   "student",
    //   "20ucs057"
    // );
    // await registerUser(
    //   "20uec070@lnmiit.ac.in",
    //   "20uec070",
    //   "student",
    //   "20uec070"
    // );

    // await registerUser(
    //   "medicalofficer@lnmiit.ac.in",
    //   "medicalofficer",
    //   "admin",
    //   "admin1"
    // );

    // await registerUser(
    //   "divyang.rawal@lnmiit.ac.in",
    //   "divyang.rawal",
    //   "teacher",
    //   "1"
    // );
    // await registerUser("preety@lnmiit.ac.in", "preety", "teacher", "2"); 
    // await registerUser(
    //   "gopinath.samanta@lnmiit.ac.in",
    //   "gopinath.samanta",
    //   "teacher",
    //   "3"
    // );
    // await registerUser(
    //   "akash.gupta@lnmiit.ac.in",
    //   "akash.gupta",
    //   "teacher",
    //   "4"
    // );
    // await registerUser(
    //   "test.faculty@lnmiit.ac.in",
    //   "test.faculty",
    //   "teacher",
    //   "420"
    // );
    await registerUser(
      "2K19CSUN01043@mru.edu.in",
      "2K19CSUN01043",
      "student",
      "2K19CSUN01043"
    );
}
register().catch((err) => console.error(err));

module.exports = router;
