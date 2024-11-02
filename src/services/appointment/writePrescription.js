import {GetJSONHederWithToken} from "utils/CommonMethods.js";
import store from "store/store.js";
import axios from "services/axios/axios.js";

export const UpdatePrescriptionApi = async (id, patientId, appointmentId, data) => {
    try {
        const {currentClinic} = store.getState();
        let header = GetJSONHederWithToken();
        return await axios
            .post(
                `/appointment/write-prescription/update?id=${id}&patientId=${patientId}&clientId=${currentClinic?.clinic?._id}&appointmentId=${appointmentId}`, data, header)
            .then((response) => {
                if (response.status === 200)
                    return response.data;
            });
    } catch (error) {
        console.log(error);
    }
};

export const GetPrescriptionByAppointmentId = async (appointmentId) => {
    try {
        const {currentClinic} = store.getState();
        let header = GetJSONHederWithToken();
        return await axios
            .get(`/appointment/write-prescription/getwholeprescription?appointment=${appointmentId}&clientId=${currentClinic?.clinic?._id}`, header)
            .then((response) => {
                if (response.status === 200)
                    return response.data;
            });
    } catch (error) {
        console.log(error);
    }
};

export const GetPrescriptionForReportByAppointmentId = async (appointmentId) => {
    try {
        const {currentClinic} = store.getState();
        let header = GetJSONHederWithToken();
        return await axios
            .get(`/appointment/write-prescription/getprescriptionforreport?appointment=${appointmentId}&clientId=${currentClinic?.clinic?._id}`, header)
            .then((response) => {
                if (response.status === 200)
                    return response.data;
            });
    } catch (error) {
        console.log(error);
    }
};

export const GetPreviousMedicalReportsByPatientId = async (patientId) => {
    try {
        const {currentClinic} = store.getState();
        let header = GetJSONHederWithToken();
        return await axios
            .get(`/appointment/write-prescription/getwholemedicalhistories?patientId=${patientId}&clientId=${currentClinic?.clinic?._id}`, header)
            .then((response) => {
                if (response.status === 200)
                    return response.data;
            });
    } catch (error) {
        console.log(error);
    }
};

export const GetFrequenttextForPrescription = async () => {
    try {
        const {currentClinic} = store.getState();
        let header = GetJSONHederWithToken();
        return await axios
            .get(`/frequency/getfrequenttextforfrescription?clinicId=${currentClinic?.clinic?._id}`, header)
            .then((response) => {
                if (response.status === 200)
                    return response.data;
            });
    } catch (error) {
        console.log(error);
    }
};

export const SearchAllergies = async (text, limit) => {
    try {
        let header = GetJSONHederWithToken();
        return await axios
            .get(`/appointment/write-prescription/searchmasterallergies?name=${text}&limit=${limit}`, header)
            .then((response) => {
                if (response.status === 200)
                    return response.data;
            });
    } catch (error) {
        console.log(error);
    }
}

export const MakeReceiptInAppointmentOverview = async (appointmentId) => {
    try {
        let header = GetJSONHederWithToken();
        const {currentClinic} = store.getState();
        var data = {
            appointmentId: appointmentId,
            clinicId: currentClinic?.clinic?._id,
        }
        return await axios
            .post(`/appointment/write-prescription/makereciept`,{data}, header)
            .then((response) => {
                if (response.status === 200)
                    return response.data;
            });
    } catch (error) {
        console.log(error);
    }
}


export const SearchMedication = async (text, limit) => {
    try {
        let header = GetJSONHederWithToken();
        return await axios
            .get(`/appointment/write-prescription/searchmastermedication?name=${text}&limit=${limit}`, header)
            .then((response) => {
                if (response.status === 200)
                    return response.data;
            });
    } catch (error) {
        console.log(error);
    }
}