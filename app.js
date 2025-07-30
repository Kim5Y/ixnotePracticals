import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import router from "./routes/routes.js";


const app = express();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("server running on PORT:", PORT));

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRETE_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);


//routing
app.use("/", router);

// app.post(
//   "/posting",
//   ,
//   (req, res) => {
//     const { username, password } = req.body;
//     console.log(username, password);
//     const error = validationResult(req);
//     if (!error.isEmpty()) return res.send(error.array());
//     res.send("completed");
//   }
// );
