const mongoose = require("mongoose");
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var subjectSchema = mongoose.Schema({
    subName: {type:String,unique:true,required:true},
    aktuCode:String,
    assingment:{type:Array},
    notes:{type:Array}
});

module.exports = mongoose.model('Subject', subjectSchema);