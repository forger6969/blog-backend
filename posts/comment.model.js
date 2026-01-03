const { default: mongoose, Schema } = require("mongoose");

const commentSchema = mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  likesCount: { type: Number, default: 0 },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
