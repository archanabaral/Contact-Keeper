const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const Contact = require("../models/Contact");

//@route   GET api/contacts
//@desc    Get all users contacts
//@access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route   POST api/contacts
//@desc    Add new contacts
//@access  Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route   PUT api/contacts/:id
//@desc    update a contacts
//@access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Build contact object
  const ContactFields = {};
  if (email) ContactFields.email = email;
  if (name) ContactFields.name = name;
  if (phone) ContactFields.phone = phone;
  if (type) ContactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    console.log(contact.user);
    console.log(req.user.id);
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: ContactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route   DELETE api/contacts
//@desc    delete contacts
//@access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(401).json({ msg: "contact not found" });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
