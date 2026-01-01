const express = require("express")
const cors = require("cors")
const registerRoutes = require('./routes/allRoutes.routes')

const app = express()
app.use(express.json())
app.use(cors())
registerRoutes(app)

module.exports = app