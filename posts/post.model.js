const { default: mongoose, Schema } = require("mongoose");

const postSchema = mongoose.Schema(
  {
    postDescribe: { type: String, required: true },
    pictures: [{ type: String, required: true }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    commentsCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likesCount: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
