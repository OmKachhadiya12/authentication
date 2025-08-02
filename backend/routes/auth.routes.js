import express from "express"
const router = express.Router();
import {registerRoute,loginRoute,logoutRoute} from "./../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

router.route("/register").post(registerRoute);
router.route("/login").post(loginRoute);
router.route("/logout").get(isAuthenticated,logoutRoute);
router.route("/dashboard").get(isAuthenticated,(req,res) => {
    res.status(200).json({message: "This is your Dashboard.",user: req.user});
});

export default router;