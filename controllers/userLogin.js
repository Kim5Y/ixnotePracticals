import bcrypt from "bcrypt";
import db from "../models/db.js";
import isUserActive from "../middlewares/middleware.js";

async function authUserLogin(req, res) {
  const { username, password } = req.body;

  if (username === "" || password === "") return res.send("invalid user credentials");

  const userExists = db.findOne(username);

  if (userExists && !(await bcrypt.compare(password, userExists.password))) {
    res.send("incorrect password");
  } else if (!userExists) {
    res.send("user not found");
  }

  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    req.session.userId = userExists.id;
    req.session.user = userExists;
    isUserActive(req, res);
    return res.send(`welcome back: ${req.session.user.username}`);
  }
}

export default authUserLogin;
