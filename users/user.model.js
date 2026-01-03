const { default: mongoose, Schema } = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  avatar:{type:String , default:"https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1"},
  email: { type: String, unique: true, required: true },
  showedName: {
    type: String,
    default: function () {
      return this.username;
    },
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },

  postCount: { type: Number, default: 0 },

  password: { type: String, required: true , select:false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
