import express from "express";
import bcrypt from "bcrypt";
import { validateUser } from "../middlewares/middleware.js";

import db from "../models/db.js";
import { validationResult } from "express-validator";
const router = express.Router();

/// registeration

router.post("/register", ...validateUser, async (req, res) => {
  const { username, password } = req.body;
  const validationError = validationResult(req);
  if (!validationError.isEmpty())
    return validationError.array().forEach((el) => res.send(el.msg));

  const userExists = db.findOne(username);

  //checking if user exists
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    return res.send("user aleady exists");
  }
  if (userExists && !(await bcrypt.compare(password, userExists.password))) {
    return res.send("invalid user name");
  }
  //if user does not exists then save user credentials
  const hashedpassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    username,
    password: hashedpassword,
  };

  db.add(newUser);

  //activating user session
  req.session.userId = newUser.id;
  req.session.user = newUser;
  return res.send(`welcome: ${req.session.user.username}`);
});

// =====log in ======//
router.post("/login", validateUser, async (req, res) => {
  const { username, password } = req.body;
  const validationError = validationResult(req);
  if (!validationError.isEmpty())
    return validationError.array().forEach((el) => res.send(el.msg));

  const userExists = db.findOne(username);

  if (userExists && !(await bcrypt.compare(password, userExists.password))) {
    res.send("incorrect password");
  } else if (!userExists) {
    res.send("user not found");
  }

  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    req.session.userId = userExists.id;
    req.session.user = userExists;
    return res.send(`welcome back: ${req.session.user.username}`);
  }
});


export default router;
