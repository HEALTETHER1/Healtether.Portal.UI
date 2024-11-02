import axios from "services/axios/axios";
import store from '../../store/store';
import {GetJSONHederWithToken} from "utils/CommonMethods";

export const GetNotificationOverview = async(page, size,) => {
    try {
        const {currentClinic} = store.getState();
        var header = GetJSONHederWithToken();
        const formData = await axios.get('/notification/getnotification?clinicId=' + currentClinic
            ?.clinic
                ?._id + '&page=' + page + '&size=' + size, header);
        return formData

    } catch (error) {
        console.log(error)
    }
}