const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const auth = require('../../../config/auth')
const {verifySignUp, authJwt} = require('../middlewares/index')

router.post('/register', [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted], userController.registerNewUser)
router.post('/login', userController.loginUser)
router.get('/getUserInfo', auth, userController.getUserDetails)

module.exports = router