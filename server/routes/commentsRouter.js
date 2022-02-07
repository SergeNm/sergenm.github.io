import express from 'express';

const commentsRouter = new express.Router;

import User from '../controllers/UsersController'
import CommentsController from '../controllers/CommentsController';
// const User = require('./controllers/user/user');
// const Post = require('./controllers/post/post');

// user routes
// router.post('/user/create',User.create);
// router.post('/user/find',User.find);
// router.post('/user/find/post/:id', User.postsByUser);
// post routes
commentsRouter.post('/create/:id', CommentsController.create);
commentsRouter.get('/user/:userId',CommentsController.commentByUser);
//commentsRouter.post('/article/:id',CommentsController.userByComment);

export default commentsRouter;