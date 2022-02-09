import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema({
    liked :{
        type: Boolean,
        default: true
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

export default mongoose.model('Like',LikeSchema);