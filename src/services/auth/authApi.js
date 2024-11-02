import axios from 'services/axios/axios'
export const AuthLogin = async(valus)=>{
    try {
        const resData = await axios.post('/authlogin',valus)
        return resData
    } catch (error) {
        console.log(error)
    }
}
export const VerifyToken = async(valus)=>{
    try {
        const resData = await axios.post('/verify-token',valus);
        return resData
    } catch (error) {
        console.log(error)
    }
}
export const ForgotOTP = async(emailOrPhone)=>{
    try {
        const resData = await axios.post('/forgototp',{emailOrPhone:emailOrPhone})
        return resData
    } catch (error) {
        console.log(error)
    }
}
export const ResendOTP = async(valus)=>{
    try {
        const resData = await axios.post('/resendforgototp',valus)
        return resData
    } catch (error) {
        console.log(error)
    }
}
export const VerifyOTPService = async(valus)=>{
    try {
        const resData = await axios.post('/verifyotp',valus)
        return resData
    } catch (error) {
        console.log(error)
    }
}
export const SavePasswordAfterOTP = async(valus)=>{
    try {
        const resData = await axios.post('/setpassword',valus)
        return resData
    } catch (error) {
        console.log(error)
    }
}