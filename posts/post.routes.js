const express = require("express")
const routes = express.Router()
const {upload} = require("../config/cloudinary.config")
const {createPost , getAllMyPosts , like,addComment,getAllPosts} = require("./post.controller")
const {authMiddleware} = require("../middlewares/auth.middleware")

routes.post("/post" ,authMiddleware, upload.array("pictures" , 5) , createPost)
routes.get("/myPosts" , authMiddleware , getAllMyPosts)
routes.post("/like/:postId", authMiddleware , like)
routes.post("/comment/:postId" , authMiddleware , addComment)
routes.get("/posts" , authMiddleware , getAllPosts)


module.exports = routes