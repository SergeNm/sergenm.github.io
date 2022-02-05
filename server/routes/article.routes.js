import express from "express";
import { verifyUser } from "./verifyToken";
import { getAllArticles,
         addOneArticle, 
         deleteOneArticle,
         updateOneArticle,
         getOneArticle, 
        } from "../controllers/article.controller";


const router = express.Router();

//Get all Contacts

/**
 * @openapi
 * '/api/article':
 *  get:
 *     tags:
 *     - Article
 *     summary: Get all Contacts
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

router.get('/', getAllArticles);


// Add a contact
/**
 * @openapi
 * '/api/article':
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

router.post('/', verifyUser, addOneArticle);

// Get a specific contact
/**
 * @openapi
 * '/api/article/{articleId}':
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


router.get('/:articleId', getOneArticle)

//delete a specific contact
/**
 * @openapi
 * '/api/article/{articleId}':
 *  delete:
 *     tags:
 *     - Article
 *     summary: Delete a specific article
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

router.delete('/:articleId', verifyUser, deleteOneArticle)


//update a specific contact
/**
 * @openapi
 * '/api/contact/:contactId':
 *  patch:
 *     tags:
 *     - Article
 *     summary: Modify an Article
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
//update a specific contact
router.patch('/:articleId', verifyUser, updateOneArticle )


export {router as articleRouter}

