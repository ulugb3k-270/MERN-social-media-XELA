import express from "express"
import { working, signin, signup } from "../controller/auth.js"

const router = express.Router()

router.get("/", working)
router.post("/signin", signin)
router.post("/signup", signup)


export default router