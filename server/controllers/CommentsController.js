// const Post = require('../../models/post');
// const User = require('../../models/user');

import Comment from '../models/comments.model'
import User from '../models/user.model'

export default {
    create : async (req, res) => {

        console.log(req.params);
        let user = req.params;
        let userId = user.id;

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
    userByComment : async (req,res)=>{
        const { commentId } = req.params;
        const userByComment = await Comment.findById(commentId).populate('user').populate('article');
        res.send(userByComment);
    }
}