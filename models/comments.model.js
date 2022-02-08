import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    comment :{
        type: String
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    article :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Comment',CommentSchema);