import axios  from "services/axios/axios";

export const fetchBookingData = async()=>{
    try {
        const resData = await axios.get('/admin/fetchBooking')
        return resData
    } catch (error) {
        console.log(error)
    }
}