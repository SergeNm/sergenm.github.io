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
router.post('/', verifyUser, addOneContact);

// Get a specific contact
router.get('/:contactId', getOneContact)

//delete a specific contact
router.delete('/:contactId', verifyUser, deleteOneContact)


//update a specific contact
router.patch('/:contactId', verifyUser, updateOneContact )


export {router as contactRouter}