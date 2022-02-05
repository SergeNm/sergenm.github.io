// // const router = require('express').Router();
// // const User = require('../models/User');
// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcryptjs');
// // const { registerValidation, loginValidation } = require('../validation');

import express from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {registerValidation, loginValidation} from '../validation'

const router = express.Router();

//REGISTER NEW USER
router.post('/register', async (req, res) => {

    //validate before submit the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

    //check if the email is already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json({ message: "Email already Exist" })

    //Hashing passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save();
        res.json(savedUser)
    } catch (err) {
        res.status(400).json({ message: err })
        console.log(err)
    }
})

//LOGIN
router.post('/login', async (req, res) => {

    //validate login info
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

    //check if the email is already exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "No such user found" });

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json({ message: "Invalid Password" });

    // //if success
    //res.status(200).json("Logged in successfully");

    //create and assign a token
    let payload = {_id: user._id}
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

})



export {router as userRouter};
