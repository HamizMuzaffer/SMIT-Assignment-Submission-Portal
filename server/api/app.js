const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { checkForAuthenticationCookie } = require("../middlewares/authentication");
const app = express();

// CORS configuration
app.use(cors({
  origin: 'https://smit-student-portal.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie("token"));

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Routes
const adminRoute = require("../routes/adminRoute");
const teacherRoute = require("../routes/teacherRoute");
const studentRoute = require("../routes/StudentRoutes");
const notesRoute = require("../routes/notesRoute");
const messagesRoute = require("../routes/messagesRoute");
app.use('/',(req,res)=>{
  res.send("Hello From Server")
})
app.use("/admin", adminRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);
app.use("/notes", notesRoute);
app.use("/messages", messagesRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;