import axios from 'axios'
import {GetJSONHederWithToken} from "utils/CommonMethods";
import store from '../../store/store';
const WHATSAPP_API_URL = import.meta.env.VITE_WHATSAPP_API_URL;

console.log(WHATSAPP_API_URL)
const axiosWhatsapp = axios.create({
    baseURL: WHATSAPP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
// export const axiosFormData = axios.create({     baseURL: WHATSAPP_API_URL,
// }); export function SetHeaderToken(token) {
// axiosWhatsapp.defaults.headers.common['Authorization'] ="Bearer "+token;
// axiosFormData.defaults.headers.common['Authorization'] ="Bearer "+token;
// axiosFormData.defaults.headers.common['Content-Type']
// ="multipart/form-data"; }
export default axiosWhatsapp;
export const GetRecentChats = async() => {
    try {
        const {currentClinic} = store.getState();
        var header = GetJSONHederWithToken();
        const formData = await axiosWhatsapp.get('/whatsappchat/getrecentchat?clinicId=' + currentClinic
            ?.clinic
                ?._id, header);
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const GetMessageForChats = async(mobile,pg,pgSize) => {
    try {
        const {currentClinic} = store.getState();
        var header = GetJSONHederWithToken();
        const formData = await axiosWhatsapp.get('/whatsappchat/getmessage?pg='+pg+'&pgSize='+pgSize+'&mobile=' + mobile + '&clinicId=' + currentClinic
            ?.clinic
                ?._id, header);
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const MarkAsReaded = async(mobile) => {
    try {
        const {currentClinic} = store.getState();
        var header = GetJSONHederWithToken();
        const formData = await axiosWhatsapp.post('/whatsappchat/markasread', {
            data: {
                mobile: mobile,
                clinicId: currentClinic
                    ?.clinic
                        ?._id
            }
        }, header);
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const AddRecentChat = async(mobile) => {
    try {
        const {currentClinic} = store.getState();
        var header = GetJSONHederWithToken();
        const formData = await axiosWhatsapp.post('/whatsappchat/addrecentchat', {
            data: {
                mobile: mobile,
                clinicId: currentClinic
                    ?.clinic
                        ?._id
            }
        }, header);
        return formData

    } catch (error) {
        console.log(error)
    }
}

export const SendLiveMessage = async(mobile,message) => {
    try {
        const {currentClinic} = store.getState();
        var header = GetJSONHederWithToken();
        const formData = await axiosWhatsapp.post('/whatsappchat/addmessage', {
            data: {
                mobile: mobile,
                message:message,
                clinicId: currentClinic
                    ?.clinic
                        ?._id
            }
        }, header);
        return formData

    } catch (error) {
        console.log(error)
    }
}