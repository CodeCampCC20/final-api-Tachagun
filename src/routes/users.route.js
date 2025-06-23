import express from "express"
import { editUser, getDoctor, getUser } from "../controllers/user.controller.js"
import { authCheck } from "../middlewares/auth.middleware.js"

const router = express.Router()



router.get("/users/me", authCheck, getUser)
router.patch("/users/me", authCheck, editUser)

router.get("/doctors/me", authCheck, getDoctor)
// router.post("/doctors/me", )






export default router