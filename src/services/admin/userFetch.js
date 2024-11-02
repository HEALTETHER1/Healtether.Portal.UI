import axios from 'services/axios/axios.js'

export const userFetchapi = async()=>{
    try {
        const res = await axios.get('/admin/fetchUserData')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const userBlockApi = async(id)=>{
    try {
        const resData = await axios.patch(`/admin/userBlockingApi?id=${id}`)
        return resData
    } catch (error) {
        console.log(error)
    }
}

export const AdminLoginApi = async(values)=>{
    const response =  await axios.post('/admin/loginVerify',{values})
    return response
}

export const fetchUserCountApi = async()=>{
    const fetchCountUser = await axios.get('/admin/fetchUserCount')
    return fetchCountUser
}
export const fetchBookingCountApi = async()=>{
    const fetchCountBooking = await axios.get('/admin/fetchBookingCount')
    return fetchCountBooking
}
export const fetchRevenueCountApi = async()=>{
    const fetchCountRevenue = await axios.get('/admin/fetchRevenueCount')
    return fetchCountRevenue
}

export const fetchBookingDetails = async()=>{
    try {
        return await axios.get('/admin/fetchBookingDate')
    } catch (error) {
        console.log(error);
        
    }
}