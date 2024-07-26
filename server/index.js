const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")
//Middlewares 
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.urlencoded({extended : false}))
app.use(checkForAuthenticationCookie("token"))



// Routes 
const adminRoute = require("./routes/adminRoute")
const teacherRoute = require("./routes/teacherRoute")
const studentRoute = require("./routes/StudentRoutes")
app.use("/admin", adminRoute);
app.use("/teacher", teacherRoute);
app.use("/student",studentRoute)


mongoose.connect("mongodb://localhost:27017/smit")
.then(()=>{
    console.log("DB connected")
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=>{
        console.log("Server Started",PORT);
    })
})
.catch((error)=> console.log(error.message))
