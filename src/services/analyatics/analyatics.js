import axios from "services/axios/axios";
import {GetJSONHederWithToken} from "utils/CommonMethods";


export const getGenderRatio = async(type, startDate, endDate) => {
    try {
        let header = GetJSONHederWithToken();
        let obj={
            type:type,
        }
        if(startDate){
            obj.startDate=startDate;
        }
        if(endDate){
            obj.endDate=endDate;
        }
        const data = await axios.post('/analyatic/getGenderRatio',obj,header);
        return data

    } catch (error) {
        console.log(error)
    }
}
export const getPatientAgeGroup = async(type, startDate, endDate) => {
    try {
        let header = GetJSONHederWithToken();
        let obj={
            type:type,
        }
        if(startDate){
            obj.startDate=startDate;
        }
        if(endDate){
            obj.endDate=endDate;
        }
        const data = await axios.post('/analyatic/getAgeGroupRatio',obj,header);
        return data

    } catch (error) {
        console.log(error)
    }
}

export const getPatientAppointmentAnalyasis= async(type,startDate, endDate)=>{
    console.log("type",type);
    try {
        let header = GetJSONHederWithToken();
        let obj={
            type:type,
        }
        if(startDate){
            obj.startDate=startDate;
        }
        if(endDate){
            obj.endDate=endDate;
        }
        const data = await axios.post('/analyatic/getPatientAnalysis',obj,header);
        return data

    } catch (error) {
        console.log(error)
    }
}




