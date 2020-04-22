const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const Contact = require("../models/contacts");

//@route   GET api/contacts
//@desc    Get all users contacts
//@access  Private
router.get("/",auth, async (req, res) => {
  try{
    const contacts= await Contact.find({
      user: req.user.id
    }).sort({date: -1});
    res.json(contacts);

  }catch(err){
    console.log(err.message);
    res.status(500).send("server error");

  }
});

//@route   POST api/contacts
//@desc    Add new contacts
//@access  Private
router.post("/", (req, res) => {
  res.send("add contact");
});

//@route   PUT api/contacts/:id
//@desc    update a contacts
//@access  Private
router.put("/", (req, res) => {
  res.send("update contact");
});

//@route   DELETE api/contacts
//@desc    delete contacts
//@access  Private
router.delete("/", (req, res) => {
  res.send("delete contact");
});

module.exports = router;
