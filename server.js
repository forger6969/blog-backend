require("dotenv").config()
const { default: mongoose } = require("mongoose");
const app = require("./app")

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("mongodb connected!");
    
})

app.listen(process.env.PORT , ()=>{
    console.log(`App run at http://localhost:${process.env.PORT}`);  
})