const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt= require('bcryptjs')
const User = require("../models/User");

//@route   POST api/users
//@desc    Register a user
//@access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter password with 6 r more character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res
          .status(400)
          .json({ msg: `User with this ${email} already exists` });
      }
      user = new User({
        name:name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);

      user.password =await bcrypt.hash(password , salt);

      await user.save()

      res.send('user saved')

      
    } catch (err) {
      console.log(err.message)
      res.status(500).send('server error')
    }
  }
);
module.exports = router;
