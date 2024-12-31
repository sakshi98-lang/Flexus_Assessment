const mongoose = require('mongoose')
const config = require('../config/local')

mongoose.connect(config.dbConnection).then((data) => {
  if (data) {
    console.log("Mongodb Connection Successful")
  }
  else {
    console.log("Mongodb Connection failed")
  }
})

