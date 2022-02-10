import express from "express";
import MessagesController from "../controllers/MessagesController";
const messagesRouter = express.Router();

import validateToken from "../middlewares/validateToken.js";

const messages = new MessagesController();

//Get all Messages

/**
 * @openapi
 * '/messages':
 *  get:
 *     tags:
 *     - Messages
 *     summary: Get all Messages
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
 *                  email:
 *                    type: string
 *                  name:
 *                    type: string
 *                  address:
 *                     type: string
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad request
 */

messagesRouter.get('/', validateToken,messages.getAllMessage);


// Add a contact
/**
 * @openapi
 * '/messages':
 *  post:
 *     tags:
 *     - Messages
 *     summary: Add Messages
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - message
 *            properties:
 *              name:
 *                type: string
 *                default: Your name
 *              email:
 *                type: string
 *                default: 'untitled@gmail.com'
 *              address:
 *                type: string
 *                default: Kigali
 *              message:
 *                type: string
 *                default: Send us Message
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */

messagesRouter.post('/', validateToken, messages.addOneMessage);

// Get a specific contact
/**
 * @openapi
 * '/messages/{messageId}':
 *  get:
 *     tags:
 *     - Messages
 *     summary: Get a specific article
 *     parameters:
 *      - name: messageId
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


messagesRouter.get('/:messageId', validateToken,messages.getOneMessage)

//delete a specific contact
/**
 * @openapi
 * '/messages/{messageId}':
 *  delete:
 *     tags:
 *     - Messages
 *     summary: Delete a specific article
 *     parameters:
 *      - name: messageId
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

messagesRouter.delete('/:articleId', validateToken, messages.deleteOneMessage)


//update a specific contact
/**
 * @openapi
 * '/messages/:contactId':
 *  patch:
 *     tags:
 *     - Messages
 *     summary: Modify an Messages
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
messagesRouter.patch('/:articleId', validateToken, messages.updateOneMessage )


export default messagesRouter;

