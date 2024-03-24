import express from "express";
import paths from "../config/paths";
import { handleSignIn, handleSignUp } from "../controllers/auth";
import { validateData } from "../middlewares/validation";
import { loginSchema, signUpSchema } from "../validation";

const router = express.Router();

router.post(paths.auth.singIn, validateData(loginSchema), handleSignIn);
router.post(paths.auth.signUp, validateData(signUpSchema), handleSignUp);

export default router;
