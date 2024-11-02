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
        const resData = await axios.post('/authlogin',valus)
        return resData
    } catch (error) {
        console.log(error)
    }
}


export const forgotNewSendOtp = async(phone)=>{
    return await axios.post('/forgotpassSendotp',phone)
}

export const forgotVerifyOtp = async(data)=>{
    try {
        const forgototpCheck = await axios.post('/forgotPassverifyotp',{data})
        return forgototpCheck
    } catch (error) {
        console.log(error)
    }
}

export const GenerateNewPassword = async(values)=>{

    const forgotform =  await axios.post('/generatepassword',{values})
    return forgotform

}
