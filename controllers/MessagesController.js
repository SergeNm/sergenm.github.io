
import Message from '../models/message.model'

class MessagesController {
    //Get all Messages
    async getAllMessage(req, res) {
        try {
            const messages = await Message.find();
            res.json(messages)
        } catch (err) {
            res.json({ message: err })
            console.log(err)
        }
    }

    //Add message
    async addOneMessage(req, res) {
        const message = new Message({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            message: req.body.message
        });

        try {
            const savedMessage = await message.save();
            res.json(savedMessage);
        } catch (err) {
            res.json({ message: err })
        }
    }

    //Get a specific message
    async getOneMessage(req, res) {
        try {
            const message = await Message.findById(req.params.messageId);
            res.json(message)
        } catch (err) {
            res.json({ message: err })
        }
    }


    //delete a specific message
    async deleteOneMessage(req, res) {
        try {
            const removedMessage = await Message.deleteOne({ _id: req.params.messageId })
            res.json(removedMessage)
        } catch (err) {
            res.json({ message: error })
        }
    }
}

export default MessagesController;
