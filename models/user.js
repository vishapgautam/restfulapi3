const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var userSchema = mongoose.Schema({
    email: {type:String,unique:true,required:true},
    password:String,
    name: String,
});

module.exports = mongoose.model('User', userSchema);