const express = require("express")
const routes = express.Router()
const {upload} = require("../config/cloudinary.config")
const {createPost , getAllPosts , like,addComment} = require("./post.controller")
const {authMiddleware} = require("../middlewares/auth.middleware")

routes.post("/post" ,authMiddleware, upload.array("pictures" , 5) , createPost)
routes.get("/posts" , authMiddleware , getAllPosts)
routes.post("/like/:postId", authMiddleware , like)
routes.post("/comment/:postId" , authMiddleware , addComment)

module.exports = routes