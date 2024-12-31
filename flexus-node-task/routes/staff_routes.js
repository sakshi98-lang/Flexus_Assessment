const express = require('express')
const router = express.Router();
const staff_controller = require('../controllers/staff_controller')
const authenticate = require('../middlewares/authenticate')

router.post('/login',staff_controller.login)

router.post('/create_staff',staff_controller.createStaff)

router.post('/add_staff_details',authenticate,staff_controller.addStaffdetails)

router.post('/edit_staff_details',authenticate,staff_controller.editStaffdetails)

router.post('/get_staff_details',staff_controller.getStaffdetails)

router.post('/get_staff_detailsbyId',staff_controller.getStaffdetailsbyId)

router.post('/delete_staff_details',authenticate,staff_controller.deleteStaffdetails)


 
module.exports = router;