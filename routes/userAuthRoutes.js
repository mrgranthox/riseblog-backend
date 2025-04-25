import express from 'express'
import { isAuthenticatd, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, updateProfile, verifyEmail, verifyResetOtp } from '../controllers/userAuthControllers.js'
import userAuth from '../middleware/userAuth.js'
import { getUserData } from '../controllers/getUserController.js'
import { allUsers } from '../controllers/getAllUsers.js'
import upload from '../middleware/imageUpload.js'


const userAuthRouter = express.Router()


userAuthRouter.post('/update-profile',userAuth, upload.single('profilePicture'), updateProfile)
userAuthRouter.post('/register', register)
userAuthRouter.post('/login', login)
userAuthRouter.post('/logout', logout)
userAuthRouter.get('/data', userAuth, getUserData )
userAuthRouter.post('/send-verify-otp', userAuth, sendVerifyOtp )
userAuthRouter.post('/validate-otp',  verifyResetOtp )
userAuthRouter.post('/verify-account', userAuth, verifyEmail )
userAuthRouter.get('/is-auth', userAuth, isAuthenticatd )
userAuthRouter.post('/send-rest-otp', sendResetOtp )
userAuthRouter.post('/reset-password', resetPassword )
userAuthRouter.get('/users', allUsers )


export default userAuthRouter