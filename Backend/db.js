const mongoose = require('mongoose');
const mongooseURI="mongodb://localhost:27017/inotebook";

const connecttomongo=()=>{
  mongoose.connect(mongooseURI,()=>{
        console.log("mongoose connected");
})
}
module.exports = connecttomongo;
    