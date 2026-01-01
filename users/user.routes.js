const express=require("express")
const routes = express.Router()
const {authMiddleware} = require('../middlewares/auth.middleware')
const {getMe} = require("./users.controller")

routes.get('/me' , authMiddleware , getMe)

module.exports = routes