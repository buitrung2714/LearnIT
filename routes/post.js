const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const Post = require("../models/Post");

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
      user: "612e07f6cc57ace37c7b7f66",
    });
    await newPost.save();

    return res.json({ success: true, message: "Happy Learning", newPost });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
