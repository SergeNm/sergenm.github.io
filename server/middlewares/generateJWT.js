import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const options = {
  expiresIn: "24h",
};

async function generateJWT(username) {
  try {
    const payload = { username };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {});
    return { error: false, token };
  } catch (error) {
    return { error: true };
  }
}

export default generateJWT;