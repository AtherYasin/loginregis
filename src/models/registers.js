const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      confirmpassword: {
        type: String,
        required: true,
      },
})


registrationSchema.pre("save", async function(next){
  if(this.isModified("password")){

    // const passwordHash = await bcrypt.hash(password, 10)

    // console.log(`the current password is ${this.password}`);    
    this.password = await bcrypt.hash(this.password,10)
    // console.log(`the current password is ${this.password}`);
    this.confirmpassword = undefined
  }
  next();
})


const RegistrationData = new mongoose.model("RegistrationData",registrationSchema);


module.exports = RegistrationData;