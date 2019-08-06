const express = require("express");
const postsDB = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  postsDB
    .get()
    .then(posts => {
      res.status(200).json({ success: true, posts });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  postsDB
    .getById(id)
    .then(post => {
      if (post) {
        res.status(200).json({ success: true, post });
      } else {
        res.status(404).json({
          success: false
          // message: "Cannot locate resource. Try a new ID."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ success: true, err });
    });
});

router.post("/", (req, res) => {
  // ====NOT SURE IF THIS IS GOOD PRACTICE BUT ID IS DECLARED IN THE BODY OF POST REQUEST IN POSTMAN====
  postBody = req.body;
  postsDB
    .insert(postBody)
    .then(newPost => {
      res.status(201).json({ success: true, newPost });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  postsDB
    .remove(id)
    .then(count => {
      if (count === 1) {
        res.status(204).json({ success: true });
      } else {
        res.status(404).json({
          success: false,
          message: "Request completed but no file deleted. I rhymed on purpose."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  postsDB
    .update(id, changes)
    .then(count => {
      if (count === 1) {
        res.status(201).json({ success: true });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Could not update. Try a new ID." });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  // console.log(req);
  if (!id) {
    res.status(404).json({ success: false, message: "Suppy valid ID." });
  } else {
    next();
  }
}

module.exports = router;
