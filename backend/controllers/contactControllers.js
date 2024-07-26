const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res)=>{ 
    console.log("hi i am create request", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Please fill all the fields!")
    }
    const contact = await Contact.create({
        name,
        email, 
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact) //create a new entity
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        req.status(403);
        throw new Error("Dont try to update someone else's contact")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json(updatedContact);
})

//@desc Get That contact
//@route GET /api/contacts/:id
//@access private
const getThatContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(req.body);
})

//@desc Delete That contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        req.status(403);
        throw new Error("Dont try to delete someone else's contact")
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact)
})

module.exports = { getContact , createContact, updateContact, getThatContact, deleteContact}