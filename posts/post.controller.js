const User = require("../users/user.model");
const Comment = require("./comment.model");
const Post = require("./post.model");

const getAllPosts = async (req, res) => {
  try {
    const { id } = req.user;

    const posts = await Post.find({ author: id });

    res.json({ succes: true, posts });
  } catch (err) {
    res.status(500).json({ succes: false, message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { postText } = req.body;

    if (!postText) {
      return res.json({ succes: false, message: "postText is required" });
    }

    const pictures = req.files.map((file) => file.path);

    if (pictures.length <= 0) {
      return res.json({ succes: false, message: "pictures is required" });
    }

    const userID = req.user.id;
    const post = new Post({ postText, pictures, author: userID });
    await post.save();

    const postsCount = await Post.countDocuments({ author: userID });
    const user = await User.findByIdAndUpdate(
      userID,
      { postCount: postsCount },
      { new: true }
    );

    res.json({ succes: true, message: "post created!", post });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const like = async (req, res) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;

    if (!postId) {
      return res
        .status(400)
        .json({ succes: false, message: "postId is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post is not found", succes: false });
    }

    const isLikeAndIndex = post.likes.findIndex((f) => f.toString() === id);

    if (isLikeAndIndex !== -1) {
      post.likes.splice(isLikeAndIndex, 1);
      post.likesCount -= post.likesCount === 0 ? 0 : 1;
      await post.save();
      res.json({ succes: true, isLike: false });
    } else {
      post.likes.push(id);
      post.likesCount += 1;
      await post.save();
      res.json({ succes: true, isLike: true });
    }
  } catch (err) {
    res.status(500).json({ succes: false, message: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { id } = req.user;
    const { text } = req.body;

    if (!postId || !text) {
      return res
        .status(400)
        .json({ succes: false, message: "postId and text is required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ succes: false, message: "post not found" });
    }

    const comment = new Comment({ author: id, text, post: postId });
    await comment.save();

    post.comments.push(comment._id);
    post.commentsCount += 1;
    post.save();

    res.json({succes:true , message:"Comment added!"})
  } catch (err) {
    res.status(500).json({ succes: false, message: err.message });
  }
};

module.exports = { createPost, getAllPosts, like , addComment};
