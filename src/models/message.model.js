const mongoose = require('mongoose')

const MessageSchema= mongoose.Schema({
    data:{
        type:String,
        required:true
    },
    user_id:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:false,
        default:Date.now()
    }
})

module.exports = mongoose.model('Messages',MessageSchema);