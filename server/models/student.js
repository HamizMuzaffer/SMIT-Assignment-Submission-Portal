const mongoose = require('mongoose');
const {createHmac, randomBytes} = require("crypto")
const {createTokenForUser} = require("../services/authentication")

const studentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        requrired : true,
        unique : true
    },
    CNIC : {
       type : Number,
       required : true,
       unique : true
    },
    password : {
        type : String,
        required : true
    },
    
    courseName : {
        type : String,
        default : null
    },

    teacherName : {
        type : String,
        required : true,
        ref : "Teacher"
    },
    salt : {
        type : String,      
     }
})

studentSchema.pre("save", function(next){
    const student = this;
    if(!student.isModified) return
    const salt = randomBytes(16).toString();
    const createHashedPassoword = createHmac("sha256",salt).update(student.password).digest("hex");
    this.salt = salt;
    this.password = createHashedPassoword;
    next()

})

studentSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    console.log(`Searching for email: ${email}`); // Log the email being searched

    const student = await this.findOne({email: new RegExp(`^${email}$`, 'i')});
    if (!student) throw new Error("User Not Found");

    const salt = student.salt;
    const hashedPassword = student.password;

    const userProvidedPassword = createHmac("sha256", salt).update(password).digest("hex");

    if (userProvidedPassword !== hashedPassword) throw new Error("Incorrect Password");

    const token = createTokenForUser(student);
    return { token, student };
});



const Student = mongoose.model("Student",studentSchema)
module.exports = Student;
