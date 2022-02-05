import express from "express";
import { verifyUser } from "./verifyToken";
import { getAllContact,
         addOneContact, 
         getOneContact,
         deleteOneContact, 
         updateOneContact
        } from "../controllers/contact.controller";


const router = express.Router();

//Get all Contacts

/**
 * @openapi
 * '/api/contact':
 *  get:
 *     tags:
 *     - Contact
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
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 *                  email:
 *                     type: string
 *                  address:
 *                      type: string
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad request
 */

router.get('/', getAllContact);


// Add a contact
/**
 * @openapi
 * '/api/contact':
 *  post:
 *     tags:
 *     - Contact
 *     summary: Send a Message
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
 *              email:
 *                type: string
 *                default: youremail
 *              name:
 *                type: string
 *                default: Name
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */

router.post('/', verifyUser, addOneContact);


// Get a specific contact
router.get('/:contactId', getOneContact)

/**
 * @openapi
 * '/api/hero/{contactId}':
 *  delete:
 *     tags:
 *     - Contact
 *     summary: Remove hero by id
 *     parameters:
 *      - name: contactId
 *        in: path
 *        description: The unique id of the contact
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */
//delete a specific contact
router.delete('/:contactId', verifyUser, deleteOneContact)

/**
 * @openapi
 * '/api/contact/:contactId':
 *  patch:
 *     tags:
 *     - Contact
 *     summary: Modify a Message
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - message
 *              - id
 *            properties:
 *              id:
 *                type: number
 *                default: 1
 *              email:
 *                type: string
 *                default: youremail
 *              message:
 *                type: string
 *                default: your message
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
//update a specific contact
router.patch('/:contactId', verifyUser, updateOneContact )


export {router as contactRouter}