// const mongoose = require('mongoose');
import { string } from '@hapi/joi';
import mongoose from 'mongoose'
const { Schema } = mongoose;

const ArticleSchema = mongoose.Schema({
    //createdBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'images/default.jpg'
    },
    // images: [
    //     {
    //         positioned: Number,
    //         path: String
    //     }
    // ],
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Article', ArticleSchema);
