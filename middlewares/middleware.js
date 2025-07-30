import { body } from "express-validator";
//checking if user is still logged in
const isUserActive = (req, res, next) => {
  if (req.session.userId) {
    return console.log("user is active");
    // return res.status(200).json({ msg: "user is active" });
  } else if (!req.session.userId) {
    console.log("unauthorized");
    return res.status(401).json({ msg: "unathorized" });
  }
  next();
};

export const validateUser = [
  body("username")
    .notEmpty()
    .withMessage("usrename is empty")
    .isString()
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ max: 15, min: 5 })
    .withMessage("password must be greater than 2 and less than 8 characters"),
];

export default isUserActive;
