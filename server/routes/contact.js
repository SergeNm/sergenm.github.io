const express = require('express');
const contact = require('../models/Contact');
const router = express.Router();
const Contact = require('../models/Contact')
const verify = require('./verifyToken')

//Get all contacts
router.get('/', async (req,res)=>{
    try{
        const contacts = await Contact.find();
        res.json(contacts)
    }catch(err){
        res.json({message:err})
    }
});

// Add a contact
router.post('/', verify, async (req,res)=>{
    const contact = new Contact( {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        message: req.body.message
    });

    try{
        const savedContact = await contact.save();
        res.json(savedContact);
    } catch(err) {
        res.json({message: err})
    }
    
});

// Get a specific contact
router.get('/:contactId', async (req,res)=>{
    try{
        const contact = await Contact.findById(req.params.contactId);
        res.json(contact)
    }catch(err){
        res.json({message:err})
    }
    
})

//delete a specific contact
router.delete('/:contactId', verify,async (req,res)=>{
    try{
        const removedContact = await Contact.deleteOne({_id:req.params.contactId})
        res.json(removedContact)
    }catch(err){
        res.json({message:error})
    } 
})


//update contact
router.patch('/:contactId', async (req,res)=>{
    try{
        const updatedContact = await Contact.updateOne(
            {_id:req.params.contactId}, 
            { $set:{message: req.body.message} }
            )
        res.json(updatedContact)
    }catch(err){
        res.json({message:error})
    } 
})


module.exports = router;