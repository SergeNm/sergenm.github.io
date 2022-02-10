// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    address: String,
    message:  {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Message', MessageSchema);

