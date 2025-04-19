import { NextFunction, Response, Request } from "express";
import Users from "../../models/users";
import { sign } from "jsonwebtoken";
import config from "config";
import TwitterError from "../../errors/twitter-error";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

function generateToken(user: Users): string {
  return sign(
    {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    config.get<string>("app.jwtSecret"),
    { expiresIn: "2h" }
  );
}


export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();
    const user = await Users.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      return next(new TwitterError(StatusCodes.UNAUTHORIZED, "Wrong credentials"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new TwitterError(StatusCodes.UNAUTHORIZED, "Wrong credentials"));
    }

    const jwt = generateToken(user);
    res.json({ jwt, role: user.role });
  } catch (err) {
    console.error("Login failed:", err); // ייתן עוד רמזים
    alert("Login failed. Please check your credentials.");
  }
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await Users.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
      return next(
        new TwitterError(StatusCodes.CONFLICT, `Email ${normalizedEmail} already exists. Please choose another email.`)
      );
    }

    const newUser = await Users.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password,
    });

    const jwt = generateToken(newUser);
    res.status(201).json({ jwt, role: newUser.role });
  } catch (e) {
    next(e);
  }
}
