// const Post = require('../../models/post');
// const User = require('../../models/user');

import Comment from '../models/comments.model'
import User from '../models/user.model'
import Article from '../models/article.model'

export default {
    create : async (req, res) => {
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
        const commentByUser = await Comment.find({user:userById}).populate('user', 'username').populate('article', 'title'); //.populate('article');
        res.send(commentByUser);
    },

    commentByArticle : async (req,res)=>{
        const { articleId } = req.params;
        const articleById = await Article.findById(articleId);
        const commentByArticle = await Comment.find({article:articleById}).populate('article', 'title').populate('user', 'username'); //.populate('article');
        res.send(commentByArticle);
    }
}
