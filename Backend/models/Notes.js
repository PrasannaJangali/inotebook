const mongoose=require('mongoose');

const noteschema=mongoose.Schema({
    
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
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

module.exports=mongoose.model('notes',noteschema);