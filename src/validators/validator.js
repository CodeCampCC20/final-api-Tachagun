import { object, ref, string } from "yup";

export const registerDoctorSchema = object({
  username: string().required("Please Enter Username"),
  password: string().required("Please Enter Password"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Confirm password does not match"
  ),
  specialization: string().required("Please Enter Your Specialization"),
});

export const registerUserSchema = object({
  username: string().required("Please Enter Username"),
  password: string().required("Please Enter Password"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Confirm password does not match"
  ),
});

export const loginSchema = object({
  username: string().required("Please Enter Username"),
  password: string().required("Please Enter Password"),
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(",");
    const mergeErr = new Error(errTxt);
    next(mergeErr);
  }
};
