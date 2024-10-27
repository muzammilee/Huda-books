const express=require('express')
const commonRouter=express()
const authController=require('../controller/authcontroller')

commonRouter.set('view engine','ejs')
commonRouter.set('views','./views/common')


commonRouter.get('/signup',authController.signupGet)
commonRouter.post('/signup',authController.signupPost)

module.exports = commonRouter   