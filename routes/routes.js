const express = require("express");
const commentControllers = require("../controllers/comment.controller");
const postControllers = require("../controllers/post.controller");
const authControllers = require("../controllers/auth.controller");
const router = express.Router();

router.route("/login").post(authControllers.login);
router.route("/register").post(authControllers.register);
router.route("/getPosts").get(postControllers.getAllPosts);
router.route("/getComments").post(commentControllers.getAllComments);
router.route("/addPost").post(postControllers.addPost);
router.route("/addComment").post(commentControllers.addComment);


module.exports = router;