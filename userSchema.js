const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    password:{
        type:String
    },
    vehicleDetails:{
         type:String
    },
    test:{
        type:Array,
        default:[]
    }  
})

module.exports = mongoose.model('user', userSchema)
