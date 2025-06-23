import { token } from "morgan";
import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";
import { number } from "yup";

export const getUser = async (req, res, next) => {
  try {
    const { id, username } = req.user;
    console.log(req.user);
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
        username,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      createError(400, "You have no access to this page");
    }

    res.json({ result: user, message: `Welcome user ${username}` });
  } catch (error) {
    next(error);
  }
};

export const editUser = async (req, res, next) => {
  try {
    const {id} = req.params
    const {username} = req.body
    console.log(req.user)
    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.update({
      where : {
        id: Number(id)
      },
      data: {
        username: username,
        password: hashPassword
      }
      
    })
  } catch (error) {

  }
}

export const getDoctor = async (req, res, next) => {
  try {
    const { id, username } = req.user;
    console.log(id);
    const doctor = await prisma.doctor.findUnique({
      where: {
        username,
      },
    });
    if (!doctor) {
      createError(400, "You have no access to this page");
    }

    res.json({ result: doctor, message: `Welcome Dr.${doctor.username}` });
  } catch (error) {
    next(error);
  }
};
