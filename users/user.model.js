const { default: mongoose, Schema } = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
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

  posts:[{type:Schema.Types.ObjectId , ref:"Post"}],
  postCount:{type:Number , default:0},

  password:{type:String , required:true}
  
});

const User = mongoose.model("User" , userSchema)
module.exports = User