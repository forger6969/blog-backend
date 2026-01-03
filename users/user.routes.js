const express = require("express");
const routes = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const { getMe, takeSomeone,follow,changeAvatar } = require("./users.controller");
const { uploadAvatar } = require("../config/cloudinary.config");

routes.get("/me", authMiddleware, getMe);
routes.get("/take/:id", authMiddleware, takeSomeone);
routes.post("/follow/:followUserId",authMiddleware , follow)
routes.post("/avatar", authMiddleware , uploadAvatar.array("pictures", 1) , changeAvatar)

module.exports = routes;
