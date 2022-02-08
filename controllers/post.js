// const Post = require('../../models/post');
// const User = require('../../models/user');

import Post from '../models/post'
import User from '../models/user'

export default {
    create : async (req, res) => {

        console.log(req.params);
        let user = req.params;
        let id = user.id;
        const { title, subtitle} = req.body;
        const post = await Post.create({
            title,
            subtitle,
            user:id
        });
        await post.save();

        const userById = await User.findById(id);

        userById.posts.push(post);
        await userById.save();

        return res.send(userById);
    },
    userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('user');
        res.send(userByPost);
    }
}