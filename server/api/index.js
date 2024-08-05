require('dotenv').config()
const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { checkForAuthenticationCookie } = require("../middlewares/authentication");
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")

//Middlewares 
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow cookies to be sent and received
  };
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded({extended : false}))
app.use(checkForAuthenticationCookie("token"))

app.use('/uploads', express.static(path.join(__dirname,'public','uploads')));


// Routes 
const adminRoute = require("../routes/adminRoute")
const teacherRoute = require("../routes/teacherRoute")
const studentRoute = require("../routes/StudentRoutes")
const notesRoute = require("../routes/notesRoute");
const messagesRoute = require("../routes/messagesRoute")

app.use("/admin", adminRoute);
app.use("/teacher", teacherRoute);
app.use("/student",studentRoute)
app.use("/notes",notesRoute);
app.use("/messages",messagesRoute)


mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("DB connected")
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=>{
        console.log("Server Started",PORT);
    })
})
.catch((error)=> console.log(error.message))