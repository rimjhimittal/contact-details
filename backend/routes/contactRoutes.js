const express = require("express");
const router = express.Router();
const { getContact , createContact, updateContact, getThatContact, deleteContact} = require("../controllers/contactControllers.js");
const validateToken = require("../middleware/validateTokenHandler.js");
router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").put(updateContact).get(getThatContact).delete(deleteContact);

module.exports = router;