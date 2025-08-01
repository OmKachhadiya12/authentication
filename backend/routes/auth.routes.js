import express from "express"
const router = express.Router();
import {registerRoute,loginRoute} from "./../controllers/auth.controller.js"

router.route("/register").post(registerRoute);
router.route("/login").post(loginRoute);

export default router;