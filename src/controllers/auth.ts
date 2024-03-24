import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import argon from "argon2";
import jwt from "jsonwebtoken";

import User from "../models/user";
import { config } from "dotenv";

const handleSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Email or password is incorrect" });

  const validPassword = await argon.verify(user.password, password);
  if (!validPassword)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Email or password is incorrect" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "");
  res.status(StatusCodes.OK).send({ token });
};

const handleSignUp = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  const emailFound = await User.findOne({ email });
  if (emailFound)
    return res
      .status(StatusCodes.CONFLICT)
      .send({ message: "Email already in use" });

  const userNameFound = await User.findOne({ userName });
  if (userNameFound)
    return res
      .status(StatusCodes.CONFLICT)
      .send({ message: "User name already in use" });

  const hashPassword = await argon.hash(password);
  const newUser = await User.create({
    email,
    userName,
    password: hashPassword,
  });

  const userResponse = {
    id: newUser._id,
    username: newUser.userName,
    email: newUser.email,
    createdAt: newUser.createdAt,
  };

  return res.status(StatusCodes.CREATED).send(userResponse);
};

export { handleSignIn, handleSignUp };
