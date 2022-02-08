import express from 'express';

const router = new express.Router;

import User from '../controllers/user'
import Post from '../controllers/post';
// const User = require('./controllers/user/user');
// const Post = require('./controllers/post/post');

// user routes
router.post('/user/create',User.create);
router.post('/user/find',User.find);
router.post('/user/find/post/:id', User.postsByUser);
// post routes
router.post('/post/create/:id', Post.create);
router.post('/post/populate/:id',Post.userByPost);

export default router;