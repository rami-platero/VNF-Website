import User from "../models/User.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import Role from "../models/Role.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET/* , { expiresIn: "3d" } */);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email,password);
    const token = createToken(user._id);

    res.status(200).json({ email, token, roles: user.roles, roles_name: user.roles_name });
  } catch (error) {
    res.status(400).json(JSON.parse(error.message));
  }
};

export const signupUser = async (req, res) => {
  const { email, password, roles } = req.body;

  try {
    const user = await User.signup(email, password, roles);

    const token = createToken(user._id);

    res.status(200).json({ email, token, roles: user.roles, roles_name: user.roles_name });
  } catch (error) {
    res.status(400).json(JSON.parse(error.message));
  }
};
