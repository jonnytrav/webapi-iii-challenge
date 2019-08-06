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
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res
          .status(404)
          .json({ success: false, message: "That user does not exist." });
      }
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

router.post("/", validateUser, (req, res) => {
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

// router.post("/:id/", (req, res) => {
//  ========= Implemented in the postRouter module =========
// });

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  userDB
    .update(id, changes)
    .then(count => {
      if (count === 1) {
        res.status(201).json({ success: true });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Could not find user to update." });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  userDB
    .remove(id)
    .then(count => {
      if (count === 1) {
        res.status(204);
      } else {
        res
          .status(404)
          .json({ success: false, message: "Cannot find user to remove." });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

//custom middleware

// function validateUserId(req, res, next) {
//   const { id } = req.params;
//   if (!id) {
//     res
//       .status(404)
//       .json({ success: false, message: "Please provide a valid ID." });
//   } else {
//     next();
//   }
// }

function validateUser(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ success: false, message: "Missing user data." });
  } else {
    if (!body.name) {
      res
        .status(400)
        .json({ success: false, message: "Missing required name field." });
    } else {
      next();
    }
  }
}

function validatePost(req, res, next) {}

module.exports = router;
