const express = require("express");
const router = express.Router();
const { getContact , createContact, updateContact, getThatContact, deleteContact} = require("../controllers/contactControllers.js")

router.route("/").get(getContact).post(createContact);
router.route("/:id").put(updateContact).get(getThatContact).delete(deleteContact);

module.exports = router;