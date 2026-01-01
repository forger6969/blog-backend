const authRoutes = require('../auth/auth.routes')
const userRoutes = require('../users/user.routes')

const registerRoutes = (app) => {
app.use("/api/auth" , authRoutes)
app.use('/api/user' , userRoutes)
};

module.exports = registerRoutes