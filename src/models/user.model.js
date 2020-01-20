const mongoose = require('mongoose')

const UserSchema= mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:1024,
    },
    name:{
        type:String,
        required:false,
        default:"starling"
    },
    user_level:{
        type:Number,
        required:false,
        default:0
    }
})

module.exports = mongoose.model('Users',UserSchema);