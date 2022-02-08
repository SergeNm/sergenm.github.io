// const mongoose = require('mongoose');
import mongoose from 'mongoose'
const { Schema } = mongoose;

const ArticleSchema = mongoose.Schema({
    //createdBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    title: {
        type:String,
        required: true 
    },
    body:  {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Article', ArticleSchema);
