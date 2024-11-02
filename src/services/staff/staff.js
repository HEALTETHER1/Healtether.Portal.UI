import axios from 'services/axios/axios';
import {nanoid} from 'nanoid'
import { AppendFileInForm } from '../../utils/AppendFileInForm';
import store from '../../store/store';
import { GetJSONHederWithToken } from '../../utils/CommonMethods';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const axiosformData = {
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

export const StaffSubmitApi = async(value, id, profileName,documentNames) => {
    let result;
    try {
      //  var docName = [];
      //  documentNames= (documentNames==undefined || documentNames=='')?[]:documentNames.split(',');
       const { currentClinic }= store.getState();
        let isUpdateDoc = false;
        let form = new FormData();
        if (value.profilepic.size > 0) {
            var picExt = value.profilepic?.name
                    .substr(value.profilepic
                        ?.name.lastIndexOf('.') + 1);
            profileName = (profileName==undefined || profileName=='') && value.profilepic != undefined
                ? nanoid() + '.' + picExt
                : profileName;
            form.append("profile", value.profilepic);
            isUpdateDoc = true;
        }
        form.append("profileName", profileName);
        let documentFile = AppendFileInForm(value.documents, form, "documents", "documentName");
        if(documentFile.files.length>0)
        {
            isUpdateDoc = true;
            form=documentFile.formData;
        }
        let address = {
            house: value.address_house,
            street: value.address_street,
            landmarks: value.address_landmarks,
            city: value.address_city,
            pincode: value.address_pincode
        };
        let data = new Staff(id, value.staffId, value.firstName, value.lastName, value.specialization, value.isDoctor, value.age, value.birthday, value.gender, value.mobile, value.whatsapp, value.email, address, value.documentType, value.documentNumber, value.upiId, value.bankName, value.accountName,
            value.account, value.ifsc, value.isAdmin, profileName, documentFile.files, currentClinic?.clinic?._id,value.availableTimeSlot);
        let header = GetJSONHederWithToken();
        const formData = await axios
            .post('/staff/upsert', {data},header)
            .then((response) => {
                console.log(response);
                result = response;
            })
        if (isUpdateDoc) {
            const updateDoc = await axios
                .post('/staff/updatedocument', form, axiosformData)
                .then((response) => {
                    result = response;
                });
        }
        return result

    } catch (error) {
        console.log(error)
    }
}
export const UpdateDocumentApi = async(data) => {
    try {
        console.log(data);
        const formData = await axios.post('/staff/updatedocument', data, {instance: axiosformData})
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const GetStaffOverview = async(clientId,page, size,paramStr) => {
    try {
        var header = GetJSONHederWithToken();
        const formData = await axios
            .get('/staff/getstaffs?clientId='+clientId+'&page=' + page + '&size=' + size+''+paramStr,header)
            .then((response) => {
                return response;
            })
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const GetStaffApi = async(id) => {
    try {
        var header = GetJSONHederWithToken();
        const formData = await axios
            .get('/staff/getstaff?id=' + id,header)
            .then((response) => {
                if (response.status == 200) 
                    return response.data;
                }
            )
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const CheckMobileNumberExists = async(mobile,id) => {
    try {
        var header = GetJSONHederWithToken();
        const formData = await axios
            .get('/staff/checkmobilenumber?mobile='+mobile+ (id!=null?'&id=' + id:''),header)
            .then((response) => {
                if (response.status == 200) 
                    return response.data.exists;
                }
            )
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const GetDoctorsApi = async() => {
    try {
        const {currentClinic}= store.getState();
        var header = GetJSONHederWithToken();
        const formData = await axios
            .get('/staff/getdoctorsbyclinic?clinicId=' + currentClinic?.clinic?._id,header)
            .then((response) => {
                if (response.status == 200) 
                    return response.data;
                }
            )
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const GetDoctorsWithAvailableTimeSlotApi = async() => {
    try {
        const {currentClinic}= store.getState();
        let header = GetJSONHederWithToken();
        let response = await axios
            .get('/staff/getdoctorswithtime?clinicId=' + currentClinic?.clinic?._id,header)
            .then((response) => {
                    if (response.status == 200)
                        return response.data;
                }
            )
        return response

    } catch (error) {
        console.log(error)
    }
}
export const GetDoctorAvailableTimeSlotApi = async(doctorId) => {
    try {
        const {currentClinic}= store.getState();
        let header = GetJSONHederWithToken();
        let response = await axios
            .get('/staff/gettimeslotofdoctor?clinicId=' + currentClinic?.clinic?._id+'&id='+doctorId,header)
            .then((response) => {
                    console.log(response);
                    if (response.status == 200)
                        return response.data;
                }
            )
        return response

    } catch (error) {
        console.log(error)
    }
}
export const SearchStaffName = async(name,size) => {
    try {
        const formData =await axios.get('/staff/searchstaffname?name='+name+'&size='+size); 
        return formData

    } catch (error) {
        console.log(error)
    }
}
export const DeleteStaff = async(id) => {
    try {
        var header = GetJSONHederWithToken();
        const formData = await axios
            .delete('/staff/deletestaff?id=' + id,header)
            .then((response) => {
                if (response.status == 200) 
                    return true;
                else
                        return false;
                }
                
            )
        return formData

    } catch (error) {
        console.log(error)
    }
}
export class Staff
{
    constructor(id,staffId, firstName,lastName, specialisation, isDoctor, age, birthday, gender, mobile, whatsapp, email, address, documentType, documentNumber, upiId, bankName, accountName, account, ifsc, isAdmin, profilepic, documents,clientId,availableTimeSlot)
    {
        this.id = id;
        this.staffId=staffId;
        this.firstName = firstName;
        this.lastName= lastName;
        this.specialisation = specialisation;
        this.isDoctor = isDoctor;
        this.age = age;
        this.birthday = birthday?.trim()!=""?birthday:undefined;
        this.gender = gender;
        this.mobile = mobile;
        this.whatsapp = whatsapp;
        this.email = email;
        this.address = address;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.upiId = upiId;
        this.bankName = bankName;
        this.account = account;
        this.accountName = accountName;
        this.ifsc = ifsc;
        this.isAdmin = isAdmin;
        this.createdOn = new Date().toLocaleString('en-GB', {timeZone: 'UTC'});
        this.modifiedOn = new Date().toLocaleString('en-GB', {timeZone: 'UTC'});
        this.profilepic = profilepic,
        this.documents = documents,
        this.clientId=clientId,
        this.availableTimeSlot=availableTimeSlot
    }

}