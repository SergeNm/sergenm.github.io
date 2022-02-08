import express from 'express';

const likesRouter = new express.Router;

import User from '../controllers/UsersController'
import LikesController from '../controllers/LikesController';


/**
  * @openapi
  * '/likes/create/{userId}':
  *  post:
  *     tags:
  *     - Likes
  *     summary: Submit a Like by specific User for a specific Article
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
  *            - articleId
  *          properties:
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
likesRouter.post('/create/:userId', LikesController.create);

/**
  * @openapi
  * '/likes/user/{userId}':
  *  get:
  *     tags:
  *     - Likes
  *     summary: Get all likes by specific user
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
likesRouter.get('/user/:userId',LikesController.likeByUser);
//likesRouter.post('/article/:id',LikesController.userByComment);

/**
  * @openapi
  * '/likes/article/{articleId}':
  *  get:
  *     tags:
  *     - Likes
  *     summary: Get all comments by specific Article
  *     parameters:
  *      - name: articleId
  *        in: path
  *        description: The unique id of the Article
  *        required: true
  *     responses:
  *      200:
  *        description: Recieved
  *      400:
  *        description: Bad request
  *      404:
  *        description: Not Found
  */
 likesRouter.get('/article/:articleId',LikesController.likeByArticle);

export default likesRouter;