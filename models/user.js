import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name :{
        type:String,
        required: '{PATH} is required!'
    },
    bio: {
        type:String
    },
    website:{
        type:String
    },
    posts : [
        {type: mongoose.Schema.Types.ObjectId, ref:'Post'}
    ]
},{
    timestamps: true
})

export default mongoose.model('User',UserSchema);