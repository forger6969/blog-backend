const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const postStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts",
    format: async (req, file) => "jpg",
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    format: async (req, file) => "jpg",
    public_id: (req, file) => "avatar-" + req.user.id,
  },
});

// Мультеры
const upload = multer({ storage: postStorage });
const uploadAvatar = multer({ storage: avatarStorage });

module.exports = {
  upload,
  uploadAvatar,
  cloudinary,
};
