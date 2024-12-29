import express from "express";
import { register , login, logout, getUser} from "../controller/userController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router()


router.post("/register", register)

router.post("/login", login)

router.get("/getuser",isAuthorized,getUser)

router.get("/logout",isAuthorized,logout)   // protected route
export default router