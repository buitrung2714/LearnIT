const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const Post = require("../models/Post");

// @route GET /api/posts
// @desc Get Post
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.userID,
    }).populate("user", ["username"]);
    return res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// @route POST /api/posts
// @desc Create Post
// @access Private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //Simple Validation
  if (!title)
    return res.status(400).json({ success: false, message: "Title is empty" });

  try {
    //All good
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userID,
    });
    await newPost.save();

    return res.json({
      success: true,
      message: "Happy Learning",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// @route PUT /api/posts/id
// @desc Update Post
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //Simple Validation
  if (!title)
    return res.status(400).json({ success: false, message: "Title is empty" });

  try {
    let updatePost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const updateCondition = { _id: req.params.id, user: req.userID };

    updatePost = await Post.findByIdAndUpdate(updateCondition, updatePost, {
      new: true,
    });

    //User not authorize to update post or post not found
    if (!updatePost)
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorize",
      });

    res.json({ success: true, post: updatePost, message: "Excellent" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// @route DELETE /api/posts/id
// @desc Remove Post
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id, user: req.userID };
    const deletePost = await Post.findByIdAndRemove(deleteCondition);

    //User not authorize or Post not found
    if (!deletePost)
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorize",
      });

    res.json({ success: true, message: "Delete Post Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
