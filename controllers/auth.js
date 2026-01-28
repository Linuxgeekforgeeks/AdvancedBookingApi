import { createError } from "../lib/error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(200).json("User has been created successfully.");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      next(createError(404, "User not found."));
    }

    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!isCorrectPassword) {
      return next(createError(400, "Wrong username or password"));
    }

    const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET)

    const { password,isAdmin, ...OtherDetails } = user._doc;
    res.cookie("access_token",token,{httpOnly:true}).status(200).json(OtherDetails);
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (req, res,next) => {
  try {
    const {username, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { username },
      { $set: { password: hashedPassword } },
    );
    res.status(200).json("Password Updated.");
  } catch (error) {
    next(error);
  }
};
export const logout = () => {};
