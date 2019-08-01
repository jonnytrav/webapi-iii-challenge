const express = require("express");
const router = express.Router();
const userDB = require("./userDb");

router.get("/", (req, res) => {
  userDB
    .get()
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    .catch(err => {
      res.status(404).json({ success: false, err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  userDB
    .getById(id)
    .then(user => {
      res.status(200).json({ success: true, user });
    })
    .catch(err => {
      res.status(404).json({ success: false, err });
    });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;
  userDB
    .getUserPosts(id)
    .then(userPosts => {
      res.status(200).json({ success: true, userPosts });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.post("/", (req, res) => {
  const newUser = req.body;
  userDB
    .insert(newUser)
    .then(user => {
      res.status(201).json({ success: true, user });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.post("/:id/posts", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
