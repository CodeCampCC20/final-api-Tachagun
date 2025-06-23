import express from "express"
import { loginDoctor, loginUser, registerDoctor, registerUser } from "../controllers/auth.controller.js"
import { loginSchema, registerDoctorSchema, registerUserSchema, validate } from "../validators/validator.js"
const router = express.Router()



router.post("/register/doctor", validate(registerDoctorSchema), registerDoctor)
// router.post("/register/doctor", (req, res)=>{
//   console.log(req.body)
//   res.json({message:"abc"})
// })
router.post("/register/user", validate(registerUserSchema), registerUser)
router.post("/login/doctor", validate(loginSchema), loginDoctor)
router.post("/login/user", validate(loginSchema), loginUser)





export default router