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


/**
  * @openapi
  * '/comments/create/{userId}':
  *  post:
  *     tags:
  *     - Comments
  *     summary: Submit a comment by specific User for a specific Article
  *     parameters:
  *      - name: userId
  *        in: path
  *        description: The unique id of the user
  *        required: true
  *     requestBody:
  *      required: true
  *      content:
  *       application/json:
  *         schema:
  *          type: object
  *          required:
  *            - comment
  *            - articleId
  *          properties:
  *            comment:
  *             type: string
  *             default: your comment
  *            articleId:
  *             type: string
  *     responses:
  *      200:
  *        description: created
  *      400:
  *        description: Bad request
  *      404:
  *        description: Not Found
  */
commentsRouter.post('/create/:userId', CommentsController.create);

/**
  * @openapi
  * '/comments/user/{userId}':
  *  get:
  *     tags:
  *     - Comments
  *     summary: Get all comments by specific user
  *     parameters:
  *      - name: userId
  *        in: path
  *        description: The unique id of the user
  *        required: true
  *     responses:
  *      200:
  *        description: Recieved
  *      400:
  *        description: Bad request
  *      404:
  *        description: Not Found
  */
commentsRouter.get('/user/:userId',CommentsController.commentByUser);
//commentsRouter.post('/article/:id',CommentsController.userByComment);

export default commentsRouter;