import express from 'express'

const router = express.Router()

/**
 * @openapi
 * /Home:
 *  get:
 *     tags:
 *     - Home
 *     description: Returns API operational status
 *     responses:
 *       200:
 *         description: API is  running
 */
router.get('/home', (req, res) => res.sendStatus(200))


export default router
