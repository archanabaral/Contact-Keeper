const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

const router = express.Router();

//@route   GET api/auth
//@desc    Get logged in users
//@access  Private
router.get("/", (req, res) => {
  res.send("get logged in user");
});

//@route   POST api/auth
//@desc    Authnticate user and get token
//@access  Public
router.post(
  "/",
  [
    check("email", "please include valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: "invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const payload={
        user:{
          id:user.id
        }
      }
      jwt.sign(payload , config.get('jwtSecret'), {
        expiresIn : 360000
      }, (err,token)=>{
        if(err) throw err;
        res.json({token});

      })

      
    } catch (err) {
      console.log(err.message)
      res.status(500).send('server error')
    }
  }
);

module.exports = router;
