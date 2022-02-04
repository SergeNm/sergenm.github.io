import express from "express";
import Contact from "../models/Contact";
import { verifyUser } from "./verifyToken";


const router = express.Router();

//Get all Contacts
router.get('/', async function (req, res) {
    try{
        const contacts = await Contact.find();
        res.json(contacts)
    }catch(err){
        res.json({message:err})
        console.log(err)
    }
});


// Add a contact
router.post('/', verifyUser, async (req,res)=>{
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
router.delete('/:contactId', verifyUser,async (req,res)=>{
    try{
        const removedContact = await Contact.deleteOne({_id:req.params.contactId})
        res.json(removedContact)
    }catch(err){
        res.json({message:error})
    } 
})


//update contact
router.patch('/:contactId', verifyUser, async (req,res)=>{
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


export {router as contactRouter}