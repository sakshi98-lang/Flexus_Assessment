const { Validator } = require('node-input-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const staffs = require('../models/app_access _schema')
const staffs_details = require('../models/staff_details_schema')
const jwtsecret = 'flexus'

exports.login = async (req, res) => {
    const v = new Validator(req.body, {
        username: 'required',
        password: 'required',
    })
    v.check().then(async (matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        }
        else {
            let reqData = req.body;
            let userdata = await staffs.findOne({ username: reqData.username }, { password: 1, _id: 1 })
            if (userdata != null) {
                let password = await bcrypt.compare(reqData.password, userdata.password)
                if (password) {
                    let payloadData = { user_id: userdata._id }
                    let token = await jwt.sign({
                        data: payloadData
                    }, jwtsecret, { expiresIn: '1h' });
                    res.json({
                        status: true,
                        message: "Login successful",
                        token: token
                    })
                }
                else {
                    res.json({
                        status: false,
                        message: "Invalid Login Credentials",
                    })
                }
            }
            else {
                res.json({
                    status: false,
                    message: "User does not exist"
                })
            }
        }
    });
}

exports.addStaffdetails = async (req, res) => {
    const v = new Validator(req.body, {
        name: 'required',
        dob: 'required',
        age: 'required',
        gender: 'required',
        mobileNo: 'required'
    })
    v.check().then(async (matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        }
        else {
            let reqData = req.body;
            let staffinfo = await staffs_details.findOne({ name: reqData.name })
            if (staffinfo == null) {
                let insertStaff = await staffs_details.create(reqData);
                if (insertStaff) {
                    res.json({
                        status: true,
                        message: 'Staff details added successfully'
                    })
                }
                else {
                    res.json({
                        status: false,
                        message: 'Staff details failed to add'
                    })
                }
            }
            else {
                res.json({
                    status: false,
                    message: 'Staff name already exists'
                })
            }
        }
    })
}

exports.editStaffdetails = async (req, res) => {
    const v = new Validator(req.body, {
        id: 'required',
    })
    v.check().then(async (matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        }
        else {
            let reqData = req.body;
            reqData.updated_date = Date.now()
            let staffinfo = await staffs_details.updateOne({ _id: reqData.id }, { $set: reqData })
            if (staffinfo.modifiedCount == 1) {
                res.json({
                    status: true,
                    message: 'Staff details updated successfully'
                })
            }
            else {
                res.json({
                    status: false,
                    message: 'Staff details not updated'
                })
            }
        }
    })
}

exports.getStaffdetails = async (req, res) => {
    let reqData = req.body
    const page = parseInt(reqData.page) || 1; 
    const limit = parseInt(reqData.limit) || 5; 
    const skip = (page - 1) * limit; 
    let staffdetails = await staffs_details.find({}, { name: 1, age: 1, dob: 1, gender: 1, mobileNo: 1 }).skip(skip).limit(limit).exec();
    let totalRecords = await staffs_details.countDocuments();

    if (staffdetails) {
        res.json({
            status: true,
            message: 'Staff details',
            data: staffdetails,
            count : totalRecords
        })
    }
    else {
        res.json({
            status: false,
            message: 'No data found',
        })
    }
}

exports.getStaffdetailsbyId = async (req, res) => {
    let staffdetails = await staffs_details.findOne({ _id: req.body.id }, { name: 1, age: 1, dob: 1, gender: 1, mobileNo: 1 }).exec()
    if (staffdetails) {
        res.json({
            status: true,
            message: 'Staff details',
            data: staffdetails
        })
    }
    else {
        res.json({
            status: false,
            message: 'No data found',
        })
    }
}

exports.deleteStaffdetails = async (req,res)=>
{
    let staffdetails = await staffs_details.deleteOne({ _id: req.body.id }).exec();
    if(staffdetails){
        res.json({
            status : true,
            message : 'Staff details deleted successfully'
        })
    }
    else {
        res.json({
            status : false,
            message : 'Staff details failed to delete'
        })
    }

}

exports.createStaff = async (req, res) => {
    const v = new Validator(req.body, {
        username: 'required',
        password: 'required',
    })
    v.check().then(async (matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        }
        else {
            let reqData = req.body;
            let userdata = await staffs.findOne({ username: reqData.username }, { password: 1, _id: 1 })
            if (userdata == null) {
                reqData.password = await bcrypt.hash(reqData.password, 10)
                reqData.staffId = Math.random().toString(36).substr(2, 9)
                let insertStaff = await staffs.create(reqData);
                if (insertStaff) {
                    res.json({
                        status: true,
                        message: 'Registered successfully'
                    })
                }
                else {
                    res.json({
                        status: false,
                        message: 'Registration failed'
                    })
                }
            }
            else {
                res.json({
                    status: false,
                    message: 'Staff already exists'
                })
            }
        }

    })
}