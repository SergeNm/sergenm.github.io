
import Contact from '../models/Contact'

//Get all Contacts
export const getAllContact = async function (req, res) {
    try{
        const contacts = await Contact.find();
        res.json(contacts)
    }catch(err){
        res.json({message:err})
        console.log(err)
    }
}

//Add contact
export const addOneContact = async (req,res)=>{
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
}

//Get a specific contact
export const getOneContact =  async (req,res)=>{
    try{
        const contact = await Contact.findById(req.params.contactId);
        res.json(contact)
    }catch(err){
        res.json({message:err})
    } 
}


//delete a specific contact
export const deleteOneContact = async (req,res)=>{
    try{
        const removedContact = await Contact.deleteOne({_id:req.params.contactId})
        res.json(removedContact)
    }catch(err){
        res.json({message:error})
    } 
}

//update a specific contact
export const updateOneContact = async (req,res)=>{
    try{
        const updatedContact = await Contact.updateOne(
            {_id:req.params.contactId}, 
            { $set:{message: req.body.message} }
            )
        res.json(updatedContact)
    }catch(err){
        res.json({message:error})
    } 
}