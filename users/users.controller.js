const Post = require("../posts/post.model");
const User = require("./user.model");

const getMe = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    const posts = await Post.find({ author: id }).populate("comments");

    res.json({ user, posts });
  } catch (err) {
    console.log(err);
  }
};

const takeSomeone = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ succes: false, message: "User not found" });
    }

    res.json({ succes: true, user });
  } catch (err) {
    res.status(500).json({ succes: false, message: err.message });
  }
};

const changeAvatar = async (req, res) => {
  try {
    const { id } = req.user;
    const links = req.files[0].path;

    if (!links) {
      return res
        .status(400)
        .json({ succes: false, message: "picture is required!" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { avatar: links },
      { new: true }
    );

    res.status(200).json({ succes: true, message: "avatar changed", user });
  } catch (err) {
    res.status(500).json({ succes: false, message: err.message });
  }
};

const follow = async (req, res) => {
  try {
    const { id } = req.user;
    const { followUserId } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ succes: false, message: "followUserId is required" });
    }

    if (followUserId === id) {
      return res
        .status(400)
        .json({ succes: false, message: "You can't subscribe to yourself." });
    }

    const followUser = await User.findById(followUserId);
    const followedUser = await User.findById(id);

    const findFollow = followUser.followers.find((f) => f.toString() === id);

    if (findFollow) {
      const followIndex = followUser.followers.findIndex(
        (f) => f.toString() === id
      );
      followUser.followers.splice(followIndex, 1);
      followUser.followersCount -= 1;
      followUser.save();

      const followedIndex = followedUser.following.findIndex(
        (f) => f.toString() === followUserId
      );
      followedUser.following.splice(followedIndex, 1);
      followedUser.followingCount -= 1;

      res.status(200).json({
        succes: true,
        message: "You are unfollow",
      });
    } else {
      followUser.followers.push(id);
      followUser.followersCount += 1;
      followUser.save();

      followedUser.following.push(followUserId);
      followedUser.followingCount += 1;
      followedUser.save();

      res.json({ succes: true, message: `You follow!` });
    }
  } catch (err) {
    res.status(500).json({ succes: false, message: err.message });
    console.log(err);
  }
};

module.exports = { getMe, takeSomeone, follow, changeAvatar };
