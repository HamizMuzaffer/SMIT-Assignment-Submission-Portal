const mongoose = require('mongoose');
const {createHmac, randomBytes} = require("crypto")
const {createTokenForUser} = require("../services/authentication")

const teacherSchema = mongoose.Schema({
    name : {
        type: String,
        required : true
    },

    email : {
           type : String,
           required : true
    },

    password : {
        type : String,
        require : true
    },
    course : {
        type : String,
        required : true
    },
    salt : {
        type : String,      
     }

}); 

teacherSchema.pre("save", function(next){
    const teacher = this;
    if(!teacher.isModified) return
    const salt = randomBytes(16).toString();
    const createHashedPassoword = createHmac("sha256",salt).update(teacher.password).digest("hex");
    this.salt = salt;
    this.password = createHashedPassoword;
    next()

})

teacherSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    console.log(`Searching for email: ${email}`); // Log the email being searched

    const teacher = await this.findOne({email: new RegExp(`^${email}$`, 'i')});
    if (!teacher) throw new Error("User Not Found");

    const salt = teacher.salt;
    const hashedPassword = teacher.password;

    const userProvidedPassword = createHmac("sha256", salt).update(password).digest("hex");

    if (userProvidedPassword !== hashedPassword) throw new Error("Incorrect Password");

    const token = createTokenForUser(teacher);
    return { token ,teacher };
});



const Teacher = mongoose.model("Teacher",teacherSchema)
module.exports = Teacher;