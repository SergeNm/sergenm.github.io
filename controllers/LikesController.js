// const Post = require('../../models/post');
// const User = require('../../models/user');

import Like from '../models/like.model'
import User from '../models/user.model'
import Article from '../models/article.model'

export default {
    create: async (req, res) => {
        let user = req.params;
        let userId = user.userId;

        const { article } = req.body;

        const like_ = await Like.create({
            article: article,
            user: userId
        });
        await like_.save();

        const userById = await User.findById(userId);

        if (userById) {
            try {
                userById.likes.push(like_);
                await userById.save();
                return res.send(userById);
            } catch (error) {
                console.log(error)
            }
        }
        else res.send("User not found!");



    },
    likeByUser: async (req, res) => {
        const { userId } = req.params;
        const userById = await User.findById(userId);
        const likeByUser = await Like.find({ user: userById }).populate('user', 'username').populate('article', 'title'); //.populate('article');
        res.send(likeByUser);
    },

    likeByArticle: async (req, res) => {
        const { articleId } = req.params;
        const articleById = await Article.findById(articleId);
        const likeByArticle = await Like.find({ article: articleById }).populate('article', 'title').populate('user', 'username'); //.populate('article');
        res.send(likeByArticle);
    }
}
