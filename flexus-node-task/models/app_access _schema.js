const mongoose = require('mongoose')

const staff = new mongoose.Schema({
    staffId : {
        type : String,
        require : true
    },
    username : {
        type : String
    },
    password : {
        type : String
    },
    isLocked : {
        type : Boolean,
        default : false
    },
    created_at : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('App_access',staff)