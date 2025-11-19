const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getDash,
  getAllStudents,
  getSignup,
  getSignin,
  getDashboard,
  postRegister,
  postSignin,
  postSignOut
} = require('../controllers/user.controllers');

// ======== GET Routes ========
router.get('/', getDash);
router.get('/student', auth, getAllStudents);
// router.get('/all-students' auth, getAllStudents); 
router.get('/signup', getSignup);
router.get('/signin', getSignin);
router.get('/dashboard', getDashboard);

// ======== POST Routes ========
router.post('/register', postRegister);
router.post('/signin', postSignin);
router.post('/signout', postSignOut);

module.exports = router;




// const express = require('express');
// const router = express.Router();

// const { getDash, getAllStudents, getSignup, getSignin, getDashboard , postRegister, postSignin, postSignOut } = require('../controllers/user.controllers')





// router.get('/', getDash);
// router.get('/student', getAllStudents);
// router.get('/signup', getSignup);
// router.get('/signin', getSignin);
// router.get('/dashboard', getDashboard);

// // REGISTER route
// router.post('/register', postRegister);

// // SIGNIN route
// router.post('/signin', postSignin);


// // SIGNOUT route
// router.post('/signout', postSignOut);

// module.exports = router;
