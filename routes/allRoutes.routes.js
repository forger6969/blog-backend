const authRoutes = require('../auth/auth.routes')
const userRoutes = require('../users/user.routes')
const postRoutes = require("../posts/post.routes")

const registerRoutes = (app) => {
app.use("/api/auth" , authRoutes)
app.use('/api/user' , userRoutes)
app.use("/api/posts" , postRoutes)
};

module.exports = registerRoutes