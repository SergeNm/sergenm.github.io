import express from "express";
import ArticlesController from "../controllers/ArticlesController";
const articlesRouter = express.Router();

import validateToken from "../middlewares/validateToken.js";

const articles = new ArticlesController();

//Get all Articles

/**
 * @openapi
 * '/articles':
 *  get:
 *     tags:
 *     - Article
 *     summary: Get all Articles
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  createdBy:
 *                    type: string
 *                  title:
 *                     type: string
 *                  body:
 *                      type: string
 *       400:
 *         description: Bad request
 */

 articlesRouter.get('/', articles.getAllArticles);


 // Add a article
 /**
  * @openapi
  * '/articles':
  *  post:
  *     tags:
  *     - Article
  *     summary: Add Article
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *            type: object
  *            required:
  *              - title
  *              - body
  *            properties:
  *              title:
  *                type: string
  *                default: The tile of articlr
  *              body:
  *                type: string
  *                default: The body of article
  *     responses:
  *      201:
  *        description: Created
  *      409:
  *        description: Conflict
  *      404:
  *        description: Not Found
  */
 
  articlesRouter.post('/', validateToken, articles.addOneArticle);
 
 // Get a specific article
 /**
  * @openapi
  * '/articles/{articleId}':
  *  get:
  *     tags:
  *     - Article
  *     summary: Get a specific article
  *     parameters:
  *      - name: articleId
  *        in: path
  *        description: The unique id of the article
  *        required: true
  *     responses:
  *      200:
  *        description: Removed
  *      400:
  *        description: Bad request
  *      404:
  *        description: Not Found
  */
 
 
  articlesRouter.get('/:articleId', articles.getOneArticle)
 
 //delete a specific article
 /**
  * @openapi
  * '/articles/{articleId}':
  *  delete:
  *     tags:
  *     - Article
  *     summary: Delete a specific article
  *     parameters:
  *      - name: articleId
  *        in: path
  *        description: The unique id of the article
  *        required: true
  *     security:
  *     - Bearer : []
  *     responses:
  *      200:
  *        description: Removed
  *      400:
  *        description: Bad request
  *      404:
  *        description: Not Found
  */
 
  articlesRouter.delete('/:articleId', validateToken, articles.deleteOneArticle)
 
 
 //update a specific article
 /**
  * @openapi
  * '/articles/:articleId':
  *  patch:
  *     tags:
  *     - Article
  *     summary: Modify an Article
  *     parameters:
  *      - name: articleId
  *        in: path
  *        description: The unique id of the article
  *        required: true
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *            type: object
  *            required:
  *              - title
  *              - body
  *            properties:
  *              title:
  *                type: string
  *                default: your title
  *              body:
  *                type: string
  *                default: your body
  *     responses:
  *      200:
  *        description: Modified
  *      400:
  *        description: Bad Request
  *      404:
  *        description: Not Found
  */
 //update a specific article
 articlesRouter.patch('/:articleId', validateToken, articles.updateOneArticle )
 

 export default articlesRouter;