const express = require("express");
const router = express.Router();

//@route   GET api/contacts
//@desc    Get all users contacts
//@access  Private
router.get("/", (req, res) => {
  res.send("get all contacts");
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
