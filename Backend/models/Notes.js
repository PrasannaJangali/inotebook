const mongoose=require('mongoose');

const noteschema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    tag:{
       type: String,
       default:"General",
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

module.exports=mongoose.model('notes',noteschema);