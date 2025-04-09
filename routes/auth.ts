import express from "express";
import { login } from "../middlewares/auth/authenticate.js";

const router = express.Router();

router.post("/login", login);

export default router;
