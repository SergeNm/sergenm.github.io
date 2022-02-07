import User from "../models/user.model.js";
import hashPassword from "./helpers/hashPassword.js";
import comparePasswords from "./helpers/comparePasswords.js";
import generateJWT from '../middlewares/generateJWT.js'
import { registerValidation, loginValidation } from '../middlewares/joiValidation'


class UsersController {

  async signup(req, res) {

    try {
    //validate before submit the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })


      let user = await User.findOne({
        username: req.body.username,
      });
      

      if (user) {
        return res.status(400).json({
          error: true,
          message: "Username is already in use",
        });
      }

      user = req.body;

      const hashedPassword = await hashPassword(req.body.password);

      user.password = hashedPassword;

      const newUser = new User(user);

      await newUser.save();

      return res.status(201).send(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Cannot Sign up",
      });
    }
  }

  async login(req, res) {
    
    // //validate login info
    // const { error } = loginValidation(req.body);
    // if (error) return res.status(400).json({ message: error.details[0].message })

    try {
      let user = await User.findOne({ username: req.body.username });

      if (!user) {
        return res.status(404).json({
          error: true,
          message: "Account not found",
        });
      }

      const isValid = await comparePasswords(req.body.password, user.password);

      if (!isValid) {
        return res.status(400).json({
          error: true,
          message: "Invalid password",
        });
      }

      const { error, token } = await generateJWT(user.username);

      if (error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't create access token. Please try again later.",
        });
      }

      user.accessToken = token ;
      user.testing = "testing"

      user.save();

      return res.status(200).send({
        success: true,
        message: "User logged in successfully",
        token: token
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Couldn't login. Please try again.",
      });
    }
  }

  async logout(req, res) {
    try {
      const { username } = req.decoded;

      let user = await User.findOne({ username });

      user.accessToken = "";

      await user.save();

      return res.status(200).json({
        success: true,
        message: "User logged out",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
}

export default UsersController;