const mongoose = require('mongoose')

const Staff_details = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    dob : {
        type : Date,
    },
    age : {
        type : Number,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
    mobileNo : {
        type : String,
        require : true
    },
    isActive : {
        type : Boolean,
    },
    created_date : {
        type : Date,
        default : Date.now()
    },
    created_by : {
        type : String,
        default : 'staff'
    },
    updated_date : {
        type : Date,
        default : Date.now()
    },
    updated_by : {
        type : String,
        default : 'staff'
    }
})

module.exports = mongoose.model('Staff_details',Staff_details)