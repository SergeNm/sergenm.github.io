// const Post = require('../../models/post');
// const User = require('../../models/user');

import Comment from '../models/comments.model'
import User from '../models/user.model'

export default {
    create : async (req, res) => {

        console.log(req.params);
        let user = req.params;
        let userId = user.userId;

        const { comment, articleId} = req.body;
        const comment_ = await Comment.create({
            comment,
            article:articleId,
            user:userId
        });
        await comment_.save();

        const userById = await User.findById(userId);

        userById.comments.push(comment_);
        await userById.save();

        return res.send(userById);
    },
    commentByUser : async (req,res)=>{
        const { userId } = req.params;
        const userById = await User.findById(userId);
        const commentByUser = await Comment.find({user:userId}); //.populate('user').populate('article')
        res.send(commentByUser);
    }
}