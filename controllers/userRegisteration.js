
import db from "../models/db.js";


const authUserReigster = async (req, res) => {
  //checking if user exists/
  const { username, email, password } = req.body;
  const userExists = db.findOne(username);

  //checking if user exists
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    return res.send("user aleady exists");
  }
  if (userExists && !(await bcrypt.compare(password, userExists.password))) {
    return res.send("invalid user name");
  }
  //if user does not exists
  const hashedpassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    username,
    password: hashedpassword,
  };
 
db.add(newUser)
  
  //activating user session
  req.session.userId = newUser.id;
  req.session.user = newUser;
  isUserActive(req, res);
  res.send(`welcome: ${req.session.user.username}`);
};

export default authUserReigster;
