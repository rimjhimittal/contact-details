const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

//@desc Create new contact
//@route POST /api/contacts
//@access public
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
    });
    res.status(201).json(contact) //create a new entity
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json(updatedContact);
})

//@desc Get That contact
//@route GET /api/contacts/:id
//@access public
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
//@access public
const deleteContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.remove();
    res.status(200).json(contact)
})

module.exports = { getContact , createContact, updateContact, getThatContact, deleteContact}