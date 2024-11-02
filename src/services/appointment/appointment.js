import axios from "services/axios/axios";
import store from '../../store/store';
import {GetJSONHederWithToken} from "utils/CommonMethods";
import {AppendFileForRecords} from "../../utils/AppendFileInForm";
import { GetMultipartHederWithToken } from "../../utils/CommonMethods";

export const AppointmentSubmitApi = async(value, id) => {
    try {
        const {currentClinic} = store.getState();
        var header = GetJSONHederWithToken();
        var data = new Appointment(id, value.patientId, value.doctorId, value.mobile, value.name, value.gender, value.age, value.birthDate, value.appointmentDate, value.timeSlot, value.doctorName, value.reason, value.virtualConsultation, currentClinic
            ?.clinic
                ?._id,value.instantAppointment,value.clinicPatientId);
        const formData = await axios.post('/appointment/upsert', {data},header);
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const SetStartConsultation = async(id) => {
    try {
        const {currentClinic} = store.getState();
        var data = {
            id: id,
            clientId:currentClinic?.clinic
            ?._id
        }
        var header = GetJSONHederWithToken();
        const formData = await axios.post('/appointment/startconsultation', {
            data
        }, header)
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const EndConsultation = async(prescription, medical, procedure,removeFile, appointmentId) => {
    try {
        const {currentClinic} = store.getState();
        var jsonHeader = GetJSONHederWithToken();
        var multipartHeader =  GetMultipartHederWithToken();
        let isUpdateDoc = false;
        var form = new FormData();
        form.append("clientId", currentClinic?.clinic?._id);
        var prescriptionFile = AppendFileForRecords(prescription, form, "prescription", "prescriptionName");
        if (prescriptionFile.files.length > 0) {
            isUpdateDoc = true;
            form = prescriptionFile.formData;
        }
        var medicalFile = AppendFileForRecords(medical, form, "medical", "medicalName");
        if (medicalFile.files.length > 0) {
            isUpdateDoc = true;
            form = medicalFile.formData;
        }
        var procedureFile = AppendFileForRecords(procedure, form, "procedure", "procedureName");
        if (procedureFile.files.length > 0) {
            isUpdateDoc = true;
            form = procedureFile.formData;
        }

        var data = {
            id: appointmentId,
            prescriptionRecords: prescriptionFile.files,
            medicalRecords: medicalFile.files,
            procedureRecords: procedureFile.files,
            removeRecords:removeFile,
            clientId: currentClinic?.clinic?._id,

        }
        const formData = await axios.post('/appointment/endconsultation', {data}, jsonHeader).then((response) => {
            console.log(response);
            return response;
        })
        if (isUpdateDoc) {
            await axios
                .post('/appointment/updatedocument', form, multipartHeader)
                .then((response) => {
                    return response;
                });
        }
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const SaveAsDraftApi = async(prescription, medical, procedure,removeFile, appointmentId) => {
    try {
        const {currentClinic} = store.getState();
        var jsonHeader = GetJSONHederWithToken();
        var multipartHeader =  GetMultipartHederWithToken();
        let isUpdateDoc = false;
        var form = new FormData();
        form.append("clientId", currentClinic?.clinic?._id);
        var prescriptionFile = AppendFileForRecords(prescription, form, "prescription", "prescriptionName");
        if (prescriptionFile.files.length > 0) {
            isUpdateDoc = true;
            form = prescriptionFile.formData;
        }
        var medicalFile = AppendFileForRecords(medical, form, "medical", "medicalName");
        if (medicalFile.files.length > 0) {
            isUpdateDoc = true;
            form = medicalFile.formData;
        }
        var procedureFile = AppendFileForRecords(procedure, form, "procedure", "procedureName");
        if (procedureFile.files.length > 0) {
            isUpdateDoc = true;
            form = procedureFile.formData;
        }

        var data = {
            id: appointmentId,
            prescriptionRecords: prescriptionFile.files,
            medicalRecords: medicalFile.files,
            procedureRecords: procedureFile.files,
            removeRecords:removeFile,
            clientId: currentClinic?.clinic?._id
        }
        const formData = await axios.post('/appointment/draftrecords', {data}, jsonHeader).then((response) => {
            return response;
        })
        if (isUpdateDoc) {
            await axios
                .post('/appointment/updatedocument', form, multipartHeader)
                .then((response) => {
                    return response;
                });
        }
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const GetAppointmentOverview = async(page, size, param) => {
    try {
        const {currentClinic} = store.getState();
        var header = GetJSONHederWithToken();
        const formData = await axios.get('/appointment/getappointments?clinicId=' + currentClinic
            ?.clinic
                ?._id + '&page=' + page + '&size=' + size + '' + param, header);
        return formData

    } catch (error) {
        console.log(error)
    }
}

export const GetAppointmentCountToday = async() => {
    try {
        const {currentClinic} = store.getState();
        var header = GetJSONHederWithToken();
        const formData = await axios.get('/appointment/getappointmentcount?clinicId=' + currentClinic
            ?.clinic
                ?._id, header);
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const GetAppointmentConsultation = async(id) => {
    try {
        var header = GetJSONHederWithToken();
        const formData = await axios.get('/appointment/getappointmentconsultation?id=' + id, header);

        if (formData.status == 200) 
            return formData.data;
        
        return null;

    } catch (error) {
        console.log(error)
    }
}
export const GetAppointmentById = async(id) => {
    try {
        var header = GetJSONHederWithToken();
        const formData = await axios.get('/appointment/getappointmentbyid?id=' + id, header);

        if (formData.status == 200) 
            return formData.data;
        
        return null;

    } catch (error) {
        console.log(error)
    }
}
export const GetPatientAppointmentDetailsForFollowUpAndCancel = async(id) => {
    try {
        var header = GetJSONHederWithToken();
        const formData = await axios.get('/patient/getpatientandappointmentdetails?id=' + id, header);

        if (formData.status == 200) 
            return formData.data;
        
        return null;

    } catch (error) {
        console.log(error)
    }
}
export const GetCurrentRecords = async(id) => {
    try {
        var header = GetJSONHederWithToken();
        const formData = await axios.get('/appointment/getcurrentrecords?id=' + id, header);

        if (formData.status == 200) 
            return formData.data;
        
        return null;

    } catch (error) {
        console.log(error)
    }
}
export const SetFollowUpAppointment = async(appointmentId,followUpDate,followUpTimeSlot) => {
    try {
        var header = GetJSONHederWithToken();
        var data = {
            id: appointmentId,
            appointmentDate:followUpDate,
            timeSlot:followUpTimeSlot
        }
        const formData = await axios.post('/appointment/followup',{data}, header);
            return formData;
        

    } catch (error) {
        console.log(error)
    }
}

export const RescheduleAppointment = async(appointmentId,rescheduleDate,rescheduleTimeSlot) => {
    try {
        var header = GetJSONHederWithToken();
        var data = {
            id: appointmentId,
            appointmentDate:rescheduleDate,
            timeSlot:rescheduleTimeSlot
        }
        const formData = await axios.post('/appointment/reschedule',{data}, header);
            return formData;
        

    } catch (error) {
        console.log(error)
    }
}
export const Cancel = async(appointmentId) => {
    try {
        var header = GetJSONHederWithToken();
        var data = {
            id: appointmentId,
        }
        const formData = await axios.post('/appointment/cancelled',{data}, header);
            return formData;
        

    } catch (error) {
        console.log(error)
    }
}
export class Appointment
{
    constructor(id, patientId, doctorId, mobile, name, gender, age, birthDate, appointmentDate,
                timeSlot, doctorName, reason, virtualConsultation, clientId,instantAppointment,clinicPatientId)
    {
        this.id = id,
        this.mobile = mobile;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.birthDate = birthDate?.trim()!=""?birthDate:undefined;
        this.appointmentDate = appointmentDate;
        this.timeSlot = timeSlot;
        this.reason = reason;
        this.virtualConsultation = virtualConsultation
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.clientId = clientId;
        this.instantAppointment=instantAppointment;
        this.clinicPatientId=clinicPatientId;
    }
}