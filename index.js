const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();

// ======== MIDDLEWARE ========
app.use(express.json());

// ======== CORRECT CORS SETUP ========
const allowedOrigins = [
  "https://frontend-six-phi-18.vercel.app",
  "https://frontend-git-main-pcybers-projects.vercel.app",
  "https://frontend-ashy-xi-17.vercel.app"
];
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ======== NODEMAILER SETUP ========
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

// Attach transporter to every request
app.use((req, res, next) => {
  req.transporter = transporter;
  next();
});

// ======== ROUTES ========
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running...");
});

// ======== DATABASE CONNECTION ========
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// ======== START SERVER ========
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const cors = require('cors');
// const userRoutes = require('./routes/user.routes');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const PORT = process.env.PORT || 4000;

// // ============ Middleware ============
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(cors({
//   origin: "https://frontend-october-clas.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true,
// }));

// // ============ MongoDB Connection ============
// mongoose.connect(process.env.URI)
//   .then(() => console.log("✅ Connected to MongoDB successfully"))
//   .catch((err) => console.log("❌ Error connecting to MongoDB:", err));

// // ============ Nodemailer Transporter (GMAIL) ============
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS, 
//   },
// });

// // Confirm transporter works
// transporter.verify((err, success) => {
//   if (err) {
//     console.log("❌ Email error:", err);
//   } else {
//     console.log("📧 Email server is ready");
//   }
// });

// // Make transporter available in routes
// app.use((req, res, next) => {
//   req.transporter = transporter;
//   next();
// });

// // ============ Routes ============
// app.use('/user', userRoutes);

// // ============ Start Server ============
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const ejs = require('ejs');
// const cors = require('cors');
// const userRoutes = require('./routes/user.routes');
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const PORT = process.env.PORT || 4000;

// // ============ View Engine (optional if using EJS views) ============
// // app.set('view engine', 'ejs');

// // ============ Middleware ============
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // ✅ Enable CORS for frontend (e.g. React on localhost:5173)
// app.use(cors({
//   origin: "http://localhost:5173", // your frontend origin
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true, // optional, only if you use cookies or auth headers
// }));

// // ============ MongoDB Connection ============
// const URI = process.env.URI;
// mongoose.connect(URI)
//   .then(() => console.log('✅ Connected to MongoDB successfully'))
//   .catch((err) => console.log('❌ Error connecting to MongoDB:', err));

// // ============ Nodemailer Transporter ============
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
//   port: process.env.EMAIL_PORT || 587,
//   secure: false, // true for 465, false for 587
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Make transporter available to routes
// app.use((req, res, next) => {
//   req.transporter = transporter;
//   next();
// });

// // ============ Routes ============
// app.use('/user', userRoutes);

// // ============ Start Server ============
// app.listen(PORT, (err) => {
//   if (err) {
//     console.log('❌ Error starting server:', err);
//   } else {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//   }
// });








// 







// // index.js

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;
// const dotenv = require('dotenv');
// dotenv.config();
// const mongoose = require('mongoose');
// const ejs = require('ejs');



// const router = require('./routes/user.routes')

// app.set('view engine', 'ejs');

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Gmail address
//     pass: process.env.EMAIL_PASS, // 16-character app password
//   },
// });

// // MongoDB connection
// const URI = process.env.URI;

// mongoose.connect(URI)
//   .then(() => console.log('Connected to MongoDB successfully'))
//   .catch((err) => console.log('Error connecting to MongoDB:', err));

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use ('/user', userRoutes)

// // Sample student data
// let allStudent = [
//   { name: 'adeola', class: "web level 2", occupation: 'student', age: 32 },
//   { name: 'adetunji', class: "web level 3", occupation: 'farmer', age: 53 },
//   { name: 'adeola', class: "web level 2", occupation: 'welder', age: 65 },
//   { name: 'adetunji', class: "web level 3", occupation: 'doctor', age: 93 },
//   { name: 'adeola', class: "web level 2", occupation: 'teacher', age: 40 },
//   { name: 'adetunji', class: "web level 3", occupation: 'student', age: 13 }
// ];


// Routes
// app.get('/', (req, res) => res.send('Welcome to to my world!'));

// app.get('/student', (req, res) => res.send(allStudent));

// app.get('/signup', (req, res) => res.render('signup', { message: null }));

// app.get('/signin', (req, res) => res.render('signin', { message: null }));

// app.get('/dashboard', (req, res) => res.render('dashboard', { gender: "male" }));

// // REGISTER route
// app.post('/register', async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   // Validate strong password
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

//     // Send welcome email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: newUser.email,
//       subject: 'Welcome to my world ',
//       html: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
//     <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 30px; text-align: center;">
//       <h1 style="color: #007bff;">Welcome to Flickr Clone, ${newUser.firstName}!</h1>
//       <p style="font-size: 16px; color: #555;">
//         Thank you for signing up! We're thrilled to have you on board. 🎉
//       </p>
//       <p style="font-size: 16px; color: #555;">
//         Get ready to explore amazing features and start sharing your favorite moments.
//       </p>
//       <a href="http://localhost:3000/signin" 
//          style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
//         Sign In to Your Account
//       </a>
//       <p style="margin-top: 20px; font-size: 14px; color: #888;">
//         If you didn’t sign up for this account, please ignore this email.
//       </p>
//     </div>
//   </div>`,
//     };


    
  



//     try {
//       await transporter.sendMail(mailOptions);
//       console.log('Welcome email sent successfully');
//     } catch (emailErr) {
//       console.error('Error sending email:', emailErr);
//     }

//     console.log('User registered successfully');
//     res.redirect('/signin');
//   } catch (err) {
//     console.error('Error saving user:', err);
//     res.render('signup', { message: 'Internal server error' });
//   }
// });

// // SIGNIN route
// app.post('/signin', async (req, res) => {
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
//     res.redirect('/dashboard');
//   } catch (err) {
//     console.error('Error during signin:', err);
//     res.render('signin', { message: 'Internal server error' });
//   }
// });

// Start server


// app.listen(PORT, (err) => {
//   if (err) {
//     console.log('Error starting server:', err);
//   } else {
//     console.log(`App running on port ${PORT}`);
//   }
// });





// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;
// const dotenv = require('dotenv');
// dotenv.config();
// const mongoose = require('mongoose');
// const ejs = require('ejs');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const nodemailer = require('nodemailer');

// app.set('view engine', 'ejs');

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Your Gmail address
//     pass: process.env.EMAIL_PASS, // Your 16-character App Password
//   },
// });

// // MongoDB connection
// const URI = process.env.URI;

// mongoose.connect(URI)
//   .then(() => console.log('Connected to MongoDB successfully'))
//   .catch((err) => console.log('Error connecting to MongoDB:', err));

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Sample data
// let allStudent = [
//   { name: 'adeola', class: "web level 2", occupation: 'student', age: 32 },
//   { name: 'adetunji', class: "web level 3", occupation: 'farmer', age: 53 },
//   { name: 'adeola', class: "web level 2", occupation: 'welder', age: 65 },
//   { name: 'adetunji', class: "web level 3", occupation: 'doctor', age: 93 },
//   { name: 'adeola', class: "web level 2", occupation: 'teacher', age: 40 },
//   { name: 'adetunji', class: "web level 3", occupation: 'student', age: 13 }
// ];

// // Schema and model
// let userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: [true, "firstname is required"],
//     match: [/^[A-Za-z]+$/, 'firstname must contain only letters'],
//     trim: true,
//   },
//   lastName: {
//     type: String,
//     required: [true, "lastname is required"],
//     match: [/^[A-Za-z]+$/, 'lastname must contain only letters'],
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, "email is required"],
//     unique: [true, "email has been taken, please choose another"],
//     match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please provide a valid email address"],
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: [true, "password is required"],
//   },
// });

// let User = mongoose.model('User', userSchema);

// // Routes
// app.get('/', (req, res) => res.send('update this'));

// app.get('/emini', (req, res) => res.sendFile(__dirname + "/index.html"));

// app.get('/student', (req, res) => res.send(allStudent));

// app.get('/signup', (req, res) => {
//   res.render('signup', { message: 'beeni odanpe won gba but lets see' });
// });

// app.get('/signin', (req, res) => res.render('signin'));

// app.get('/dashboard', (req, res) => res.render('dashboard', { gender: "male" }));

// // REGISTER route with Nodemailer
// app.post("/register", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   console.log(req.body);

//   // Validate strong password
//   const strongPasswordRegex =
//     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   if (!strongPasswordRegex.test(password)) {
//     return res.status(400).send(
//       "Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character."
//     );
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send("Email already exists!");
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Save new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     // Send welcome email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: newUser.email,
//       subject: 'Welcome to my world!',
//       html: `
//         <h2>Hello ${newUser.firstName}!</h2>
//         <p>Thank you for asking me to send a mail.</p>
//         <p> i am excited to have you on board! 🎉</p>
//       `,
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       console.log('Welcome email sent successfully');
//     } catch (emailErr) {
//       console.error('Error sending email:', emailErr);
//     }

//     console.log('User registered successfully');
//     res.redirect("/signin");
//   } catch (err) {
//     console.error('Error saving user:', err);
//     res.status(500).send('Internal server error');
//   }
// });

// // Server
// app.listen(PORT, (err) => {
//   if (err) {
//     console.log('Error occurred while starting the server:', err);
//   } else {
//     console.log(`App is running at port ${PORT}`);
//   }
// });


// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;
// const dotenv = require('dotenv');
// dotenv.config();
// const mongoose = require('mongoose');
// const ejs = require('ejs');
// const bcrypt = require('bcrypt'); // fixed typo
// const saltRounds = 10;


// app.set('view engine', 'ejs');

// const URI = process.env.URI;

// // connect mongo
// mongoose.connect(URI)
//   .then(() => {
//     console.log('Connected to MongoDB successfully');
//   })
//   .catch((err) => {
//     console.log('Error connecting to MongoDB:', err);
//   });

// // middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); // added missing parentheses

// // sample data
// let allStudent = [
//   { name: 'adeola', class: "web level 2", occupation: 'student', age: 32 },
//   { name: 'adetunji', class: "web level 3", occupation: 'farmer', age: 53 },
//   { name: 'adeola', class: "web level 2", occupation: 'welder', age: 65 },
//   { name: 'adetunji', class: "web level 3", occupation: 'doctor', age: 93 },
//   { name: 'adeola', class: "web level 2", occupation: 'teacher', age: 40 },
//   { name: 'adetunji', class: "web level 3", occupation: 'student', age: 13 }
// ];

// // schema and model
// let userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: [true, "firstname is required"],
//     match: [/^[A-Za-z]+$/, 'firstname must contain only letters'],
//     trim: true,
//   },
//   lastName: {
//     type: String,
//     required: [true, "lastname is required"],
//     match: [/^[A-Za-z]+$/, 'lastname must contain only letters'],
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, "email is required"],
//     unique: [true, "email has been taken, please choose another"],
//     match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please provide a valid email address"],
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: [true, "password is required"],
//   },
// });

// let User = mongoose.model('User', userSchema);

// // routes
// app.get('/', (req, res) => {
//   res.send('update this');
// });

// app.get('/emini', (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.get('/student', (req, res) => {
//   res.send(allStudent);
// });

// app.get('/signup', (req, res) => {
//   res.render('signup', { message: 'beeni odanpe won gba but lets see' });
// });

// app.get('/signin', (req, res) => {
//   res.render('signin');
// });

// app.get('/dashboard', (req, res) => {
//   res.render('dashboard', { gender: "male" });
// });

// // REGISTER route (cleaned & working)
// app.post("/register", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   console.log(req.body);

//   // Step 1: Validate strong password using regex
//   const strongPasswordRegex =
//     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   if (!strongPasswordRegex.test(password)) {
//     return res.status(400).send(
//       "Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character."
//     );
//   }

//   try {
//     // Step 2: Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send("Email already exists!");
//     }

//     // Step 3: Hash password
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Step 4: Save new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     console.log('User registered successfully');
//     res.redirect("/signin");
//   } catch (err) {
//     console.error('Error saving user:', err);
//     res.status(500).send('Internal server error');
//   }
// });

// // server
// app.listen(PORT, (err) => {
//   if (err) {
//     console.log('Error occurred while starting the server:', err);
//   } else {
//     console.log(`App is running at port ${PORT}`);
//   }
// });







// const express = require('express')
// const app = express()
// const PORT = process.env.PORT || 3000
// const dotenv = require('dotenv')
// dotenv.config()
// const mongoose =require('mongoose')
// const ejs = require('ejs')
// app.set('view engine', 'ejs')
// const URI = process.env.URI
// const bcrpt = require('bcrypt');
// const saltRounds =  10


// mongoose.connect(URI)
// .then(()=>{
// console.log('connected to mongoose');

// }).catch((err)=>{
//     console.log('not connected', err);
    
// })
// // app.get("/", (req, res)=>{
// // res.render("dashboard", {gender: "you are loved"})
// // })

// let allStudent = [{name: 'adeola', class:"web level 2", occupation: 'student', age : 32},
//                   {name: 'adetunji ', class:"web level 3", occupation: 'farmer', age : 53},
//                   {name: 'adeola', class:"web level 2", occupation: 'welder', age : 65},
//                   {name: 'adetunji ', class:"web level 3", occupation: 'doctor', age : 93},
//                   {name: 'adeola', class:"web level 2", occupation: 'teacher', age : 40},
//                   {name: 'adetunji ', class:"web level 3", occupation: 'student', age : 13}
// ]
// app.use(express.urlencoded({ extended: true}))
// app.use(express.json)


// //connect mongo
// mongoose.connect(URI)
// .then(()=>{
//     console.log('connected to mongobd successfully');
    
// })
// .catch((err) =>{
//     console.log('error connecting to mongodb', err);
    
// })


// // schema and model
// let userSchema = new mongoose.Schema({
//     firstName:{
//         type: String,
//         required:[true, "firstname is required"],
//         match:[/^[A-Za-z]+$/, 'firstname must containonly letters'],
//         trim: true,
//     },
//     lastName:{
//         type: String,
//         required:[true, "lastname is required"],
//         match:[/^[A-Za-z]+$/, 'lastname must containonly letters'],
//         trim: true,
//     },
//     email:{
//         type: String,
//         required:[true, "email is required"],
//         unique:[true, "email has been taken , pls choose another email"],
//         match:[
//             /^[^\s@]+@[^\s@+\.[^\s@]+$/, "please provide a valid email address",
//         ],
//         lowercase: true,
//     },
//     password:{
//         type: String,
//         required:[true, "password is required"],
//         // match:[/^(?=.[A-Z]) (?=. *[a-z]) (?=. *\d) (?=. *[@$!%*?&]) [A-Za-z\d@$!%*?&]{8,}$/,
// // "Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character", ],
    
//     },
// })

// let User = mongoose.model('User', userSchema)




// app.get('/', (req, res) =>{
//     res.send('update this')
    
// })
// app.get('/emini', (req, res) =>{
//     res.sendFile(__dirname + "/index.html")
// })
// app.get('/student', (req, res) =>{
//     res.send(allStudent)
// })




// app.get('/signup', (req, res) =>{
//     res.render('signup', {message: 'beeni odanpe won gba but lets see'})
// })

// app.get('/signin', (req, res) =>{
//     res.render('signin')
// })
// app.get('/dashboard', (req, res) =>{
//     res.render('dashboard', {gender: "male"})
// })
// app.post("/register", async (req, res)=>{
//     const {firstName, lastName, email, password } = req.body;
//     console.log(req.body);
    
// })

// // step one to validate strong password // regex isMatch
//  // Step 1: Validate strong password using regex
//   const strongPasswordRegex =
//     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   if (!strongPasswordRegex.test(password)) {
//     return res.status(400).send(
//       "Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character."
//     );
//   }

// //// Step 2 is to Check if user already exists to prevent more than one registrations


// try {
//     // Step 2: Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send("Email already exists!");
//     }
//     // step three is to hash password
//     // return bcrpt.hash(password, saltRounds);
// // })
// const hashedPassword = await bcrypt.hash(password, saltRounds);
// // .then((hashedPassword) =>{
//     // if (!hashedPassword) return ; // if user rxists, skip this step, it is optional
    
//     // step 4 is to save new user
//  const newUser = new User ({
//     firstName,
//     lastName,
//     email,
//     password: hashedPassword, // store hashed passwor not the plain text password
//  })
//  return newUser.save()
// })
// .then((savedUser)=>{
// if (!savedUser) return; // if user exists skip this step, it is also optional
//    console.log('user registered successfully');
//    res.redirect("/signin")
// })


// .catch ((err)=>{
//  if (err !== 'user already exists'){
//     console.error('error saving user:', err);
//     res.status(500).send('internal server error')
    
    
//  }
// })






//  // app.listen (portnumber, callbackfunction)
// // app.listen(3000, () =>{
// //     console.log('App working at port 3000');
    
// // })
// app.listen(PORT, (err) =>{
//     if (err) {
//         console.log('error occurred while starting the server:', err);
        
//     }else{
//         console.log('app is running at port 3000');
        
//     }
    
// }),,,,,, heres  my full code ,  dont change the structure just clean it