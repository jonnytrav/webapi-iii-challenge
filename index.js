const express = require("express");
const server = express();

const postRoute = require("./posts/postRouter");
const userRoute = require("./users/userRouter");

// ==== LOGGER MIDDLEWARE .GET('ORIGIN) DOES NOT WORK SO I REMOVED IT BUT IT STILL LOGS THE OTHER INFO ====
// ==== .GET('ORIGIN') MAY WORK WHEN THE CLIENT ISNT POSTMAN ====
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request to ${req.url}.`
  );
  next();
}

// const errHelper = (status, message, res) => {
//   res.status(status).json({ success: false, err: message });
// };

server.use(express.json());
server.use(logger);
server.use("/api/users", userRoute);
server.use("/api/posts", postRoute);

const port = 4000;

server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
