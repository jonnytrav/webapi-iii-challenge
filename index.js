const express = require("express");
const server = express();

const postRoute = require("./posts/postRouter");
const userRoute = require("./users/userRouter");

server.use(express.json());
server.use("/api/users", userRoute);
server.use("/api/posts", postRoute);

const port = 4000;

server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
