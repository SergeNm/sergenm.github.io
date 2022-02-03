// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
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

export default mongoose.model('Contact', ContactSchema);

