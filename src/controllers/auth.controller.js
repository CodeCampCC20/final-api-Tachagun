import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import { registerDoctorSchema, validate } from "../validators/validator.js";

export const registerDoctor = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, specialization } = req.body;
    console.log(req.body);
    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });
    console.log(doctor);
    if (doctor) {
      createError(400, "This username has already been used by other user");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: hashPassword,
        specialization: specialization,
      },
    });
    // console.log(result)
    res.json({ message: `Register doctor ${result.username} Successfully` });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;
    console.log(req.body);
    const doctor = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log(doctor);
    if (doctor) {
      createError(400, "This username has already been used by other user");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
      },
    });

    res.json({ message: `Register user ${result.username} Successfully` });
  } catch (error) {
    next(error);
  }
};

export const loginDoctor = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });
    if (!doctor) {
      createError(400, "Username or Password is Invalid!");
    }

    const checkPassword = bcrypt.compareSync(password, doctor.password);
    if (!checkPassword) {
      createError(400, "Wrong Password");
    }

    const payload = {
      id: doctor.id,
      username: doctor.username,
    };

    const token = jwt.sign(payload, process.env.SECRET_CODE, {
      expiresIn: "1d",
    });

    res.json({
      message: `Welcom Dr.${doctor.username}`,
      payload,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      createError(400, "Username or Password is Invalid!");
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      createError(400, "Wrong Password");
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.SECRET_CODE, {
      expiresIn: "1d",
    });

    res.json({
      message: `Welcom User ${user.username}`,
      payload,
      token,
    });
  } catch (error) {
    next(error);
  }
};