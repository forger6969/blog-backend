const express = require("express")
const routes = express.Router()
const {loginUser , registerUser} = require("./auth.controller")
const {validateLogin , validateRegister} = require('./auth.validation')
const {authMiddleware} = require('../middlewares/auth.middleware')
const User = require('../users/user.model')

routes.post('/register' , validateRegister , registerUser)
routes.post("/login", validateLogin , loginUser)

module.exports = routes