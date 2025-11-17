// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const User = require('../models/user.models');
// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');
// dotenv.config();
// const cors = require('cors')


// // const bcrypt = require('bcrypt');
// // const saltRounds = 10;
// // const User = require('../models/user.models');
// // const nodemailer = require('nodemailer');
// // const dotenv = require('dotenv');
// // const cors = require('cors');

// // // Load environment variables
// // dotenv.config();




// const getSignup = (req, res) =>{
//      res.render('signup', { message: null })
// }

// const getSignin = (req, res) => {
//     res.render('signin', { message: null })

// }
// const getDash =(req, res) => res.send('Welcome to my world!')


// const getDashboard = (req, res) => {
//     res.render('dashboard', { gender: "male" })
// }


// const postRegister = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   // Strong password validation
//   const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   if (!strongPasswordRegex.test(password)) {
//     return res.render('signup', { message: 'Password must be at least 8 chars, with uppercase, lowercase, number, special char.' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.render('signup', { message: 'Email already exists!' });
//     }

//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = new User({ firstName, lastName, email, password: hashedPassword });
//     await newUser.save();

//     // Send welcome email using transporter from index.js

    

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: newUser.email,
//       subject: `Welcome to my world, ${newUser.firstName}!`,
//       html: `
//       <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
//         <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 30px; text-align: center;">
//           <h1 style="color: #007bff;">Welcome to Flickr Clone, ${newUser.firstName}!</h1>
//           <p style="font-size: 16px; color: #555;">
//             Thank you for signing up! We're thrilled to have you on board. 🎉
//           </p>
//           <p style="font-size: 16px; color: #555;">
//             Get ready to explore amazing features and start sharing your favorite moments.
//           </p>
//           <a href="http://localhost:3000/user/signin" 
//              style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
//             Sign In to Your Account
//           </a>
//           <p style="margin-top: 20px; font-size: 14px; color: #888;">
//             If you didn’t sign up for this account, please ignore this email.
//           </p>
//         </div>
//       </div>`
//     };

//     try {
//       await req.transporter.sendMail(mailOptions);
//       console.log('Welcome email sent successfully');
//     } catch (emailErr) {
//       console.error('Error sending email:', emailErr);
//     }

//     console.log('User registered successfully');
//     // res.redirect('/user/signin');

//   } catch (err) {
//     console.error('Error saving user:', err);
//     res.render('signup', { message: 'Internal server error' });
//   }
// }
// const postSignin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.render('signin', { message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.render('signin', { message: 'Invalid email or password' });
//     }

//     console.log(`${user.firstName} logged in successfully`);
//     // res.redirect('/user/dashboard');
//     res.status(201).jason({success:true, message:"user loggged in successfully"})
//   } catch (err) {
//     console.error('Error during signin:', err);
//     res.status('signin', { message: 'Internal server error' });
//     // res.status(400).send("invalid email or password")
//   }
// }

// const postSignOut =  (req, res) => {
//   try {
//     // If you’re using sessions in the future, you’ll clear them here
//     console.log('User signed out successfully');
//     // res.redirect('/user/signin'); // or '/' if you prefer
//   } catch (err) {
//     console.error('Error during signout:', err);
//     res.status(500).send('Internal Server Error');
//   }
// }

// const allStudent = [
//   { name: 'adeola', class: "web level 2", occupation: 'student', age: 32 },
//   { name: 'adetunji', class: "web level 3", occupation: 'farmer', age: 53 },
//   { name: 'adeola', class: "web level 2", occupation: 'welder', age: 65 },
//   { name: 'adetunji', class: "web level 3", occupation: 'doctor', age: 93 },
//   { name: 'adeola', class: "web level 2", occupation: 'teacher', age: 40 },
//   { name: 'adetunji', class: "web level 3", occupation: 'student', age: 13 }
// ];


// const getAllStudents = (req, res) => {
//     res.send(allStudent)
// }





// module.exports ={getDash, getAllStudents, getSignup, getSignin, getDashboard, postRegister, postSignin, postSignOut }
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user.models');
const Student = require('../models/student.models'); // ✅ Corrected
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// ------------------ Routes ------------------

// Optional: Signup/Signin endpoints for testing
const getSignup = (req, res) => res.status(200).json({ message: "Signup page endpoint" });
const getSignin = (req, res) => res.status(200).json({ message: "Signin page endpoint" });
const getDash = (req, res) => res.send('Welcome to my world!');
const getDashboard = (req, res) => res.status(200).json({ message: "Dashboard loaded" });

// ------------------ Register User ------------------
const postRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 chars, with uppercase, lowercase, number, special char.'
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    // Optional: Send welcome email if transporter is configured
    if (req.transporter) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: `Welcome, ${newUser.firstName}!`,
        html: `<h1>Welcome, ${newUser.firstName}!</h1><p>Thank you for signing up 🎉</p>`
      };
      try {
        await req.transporter.sendMail(mailOptions);
        console.log('Welcome email sent');
      } catch (err) {
        console.error('Email error:', err);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { id: newUser._id, email: newUser.email }
    });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// ------------------ Signin User ------------------
const postSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const { _id, firstName, lastName, email: userEmail } = user;
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { _id, firstName, lastName, email: userEmail },
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ------------------ Signout ------------------
const postSignOut = (req, res) => {
  try {
    console.log('User signed out successfully');
    res.status(200).json({ success: true, message: 'User signed out successfully' });
  } catch (err) {
    console.error('Signout error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// ------------------ Students ------------------
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json({ success: true, data: students });
  } catch (err) {
    console.error("Fetching students error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addStudent = async (req, res) => {
  const { name, class: studentClass, occupation, age } = req.body;
  if (!name || !studentClass || !occupation || !age) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newStudent = new Student({ name, class: studentClass, occupation, age });
    await newStudent.save();
    return res.status(201).json({ success: true, data: newStudent });
  } catch (err) {
    console.error("Saving student error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ------------------ Exports ------------------
module.exports = {
  getDash,
  getAllStudents,
  addStudent,
  getSignup,
  getSignin,
  getDashboard,
  postRegister,
  postSignin,
  postSignOut
};

// const postSignin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     console.log(`${user.firstName} logged in successfully`);
//     res.status(200).json({ success: true, message: "User logged in successfully" });

//   } catch (err) {
//     console.error('Error during signin:', err);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };



// ------------------ Example Students Data ------------------
// const allStudent = [
//   { name: 'adeola', class: "web level 2", occupation: 'student', age: 32 },
//   { name: 'adetunji', class: "web level 3", occupation: 'farmer', age: 53 },
//   { name: 'adeola', class: "web level 2", occupation: 'welder', age: 65 },
//   { name: 'adetunji', class: "web level 3", occupation: 'doctor', age: 93 },
//   { name: 'adeola', class: "web level 2", occupation: 'teacher', age: 40 },
//   { name: 'adetunji', class: "web level 3", occupation: 'student', age: 13 }
// ];

// const getAllStudents = (req, res) => {
//   res.status(200).json({ success: true, data: allStudent });
// };
// const Student = require('../models/student.model'); // new model


// Remove hardcoded array
// const allStudent = [...];

// Fetch all students from MongoDB





// ------------------ Exports ------------------
// module.exports = {
//   getDash,
//   getAllStudents,
//   getSignup,
//   getSignin,
//   getDashboard,
//   postRegister,
//   postSignin,
//   postSignOut
// };

