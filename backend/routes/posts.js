const express = require("express");

const PostController = require("../controllers/posts");


const router = express.Router();

router.post("", PostController.createPost);

// router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.get("", PostController.getPosts);

// router.get("/:id", PostController.getPost);

// router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
