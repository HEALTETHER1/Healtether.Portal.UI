import axios from "services/axios/axios";
import { nanoid } from "nanoid";
import {
  AppendDocWithExistingDoc,
  AppendFileInForm,
} from "../../utils/AppendFileInForm";
import { axiosFormData } from "../axios/axios";
import store from "../../store/store";
import { GetJSONHederWithToken } from "../../utils/CommonMethods";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddUpdatePatientApi = async (value, id) => {
  try {
    const { currentClinic } = store.getState();
    var form = new FormData();
    var header = GetJSONHederWithToken();
    form.append("clientId", currentClinic?.clinic?._id);
    var formFile = AppendFileInForm(
      value.documents,
      form,
      "documents",
      "documentName"
    );
    var address = {
      house: value.address_house,
      street: value.address_street,
      landmarks: value.address_landmarks,
      city: value.address_city,
      pincode: value.address_pincode,
    };

    var docs = AppendDocWithExistingDoc(value.documentNames, formFile.files);
    if (formFile.files.length > 0) await UpdateDocumentApi(formFile.formData);

    var patientData = new Patient(
      id,
      value.patientId,
      value.firstName,
      value.lastName,
      value.age,
      value.height,
      value.weight,
      value.birthday,
      value.gender,
      value.mobile,
      value.email,
      address,
      value.documentType,
      value.documentNumber,
      docs,
      currentClinic?.clinic?._id
    );
    if (id != null) {
      const response = await axios
        .post("/patient/updatepatient", { patientData }, header)
        .then((response) => {
          if (response.status == 200) return response.data;
        });
      return response;
    } else {
      const response = await axios
        .post("/patient/addpatient", { patientData, id }, header)
        .then((response) => {
          if (response.status == 200) return response.data;
        });
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
export const DeletePatient = async (id) => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .delete("/patient/deletepatient?id=" + id, header)
      .then((response) => {
        if (response.status == 200) return true;
        else return false;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};

export const GetPatient = async (id) => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .get("/patient/getpatient?id=" + id, header)
      .then((response) => {
        console.log(response);
        if (response.status == 200) return response.data;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export const GetPatientLatestAppointment = async (id) => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .get("/patient/getpatientlatestappointment?id=" + id, header)
      .then((response) => {
        console.log(response);
        if (response.status == 200) return response.data;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export const GetPatientWithAllMedicalRecords = async (id) => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .get("/patient/getpatientandmedicalrecords?id=" + id, header)
      .then((response) => {
        console.log(response);
        if (response.status == 200) return response.data;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export const GetPatientOverview = async (page, size, paramStr) => {
  try {
    var header = GetJSONHederWithToken();
    const { currentClinic } = store.getState();
    const formData = await axios
      .get(
        "/patient/getpatients?clientId=" +
          currentClinic?.clinic?._id +
          "&page=" +
          page +
          "&size=" +
          size +
          "" +
          paramStr,
        header
      )
      .then((response) => {
        console.log(response);
        return response;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export const SearchPatientMobileApi = async (value, size) => {
  try {
    var header = GetJSONHederWithToken();
    const { currentClinic } = store.getState();
    const formData = await axios.get(
      "/patient/searchmobile?mobile=" +
        value +
        "&clinicId=" +
        currentClinic?.clinic?._id +
        "&size=" +
        size,
      header
    );
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export class Patient {
  constructor(
    id,
    patientId,
    firstName,
    lastName,
    age,
    height,
    weight,
    birthday,
    gender,
    mobile,
    email,
    address,
    documentType,
    documentNumber,
    documents,
    clientId
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.patientId = patientId;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.birthday = birthday;
    this.gender = gender;
    this.mobile = mobile;
    this.email = email;
    this.address = address;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.documents = documents;
    this.createdOn = new Date().toLocaleString("en-GB", { timeZone: "UTC" });
    this.modifiedOn = new Date().toLocaleString("en-GB", { timeZone: "UTC" });
    this.clientId = clientId;
  }
}
export const PatientSubmitApi = async (value, id) => {
  try {
    // var picExt = value.profilepic     ?.name         .substr(value.profilepic
    //         ?.name.lastIndexOf('.') + 1);

    var data = new Patient(
      value.name,
      value.age,
      value.height,
      value.weight,
      value.birthday,
      value.gender,
      value.mobile,
      value.whatsapp,
      value.email,
      value.address,
      value.documentType,
      value.documentNumber,
      value.upiId,
      value.bankName,
      value.accountName,
      value.account,
      value.ifsc,
      value.isAdmin
    );
    var form = new FormData();
    form.append("profile", value.profilepic);

    // //Documents
    // for (let index = 0; index < value.documents.length; index++) {
    //     var docExt = value.documents[index]
    //         ?
    //             .name
    //             .substr(value.documents[index]
    //                 ?.name.lastIndexOf('.') + 1);
    //     docName.push(nanoid() + '.' + docExt);
    //     form.append("documents", value.documents[index]);
    // }
    // if (value.documents != undefined && value.documents.length == undefined) {
    //     var docExt = value.documents
    //         ?
    //             .name
    //             .substr(value.documents
    //                 ?.name.lastIndexOf('.') + 1);
    //     docName.push(nanoid() + '.' + docExt);
    //     form.append("documents", value.documents);
    // }

    // //Medical Records
    // for (let index = 0; index < value.medicalRecords.length; index++) {
    //     var docExt = value.medicalRecords[index]
    //         ?
    //             .name
    //             .substr(value.medicalRecords[index]
    //                 ?.name.lastIndexOf('.') + 1);
    //     docName.push(nanoid() + '.' + docExt);
    //     form.append("medicalRecords", value.medicalRecords[index]);
    // }
    // if (value.medicalRecords != undefined && value.medicalRecords.length == undefined) {
    //     var docExt = value.medicalRecords
    //         ?
    //             .name
    //             .substr(value.medicalRecords
    //                 ?.name.lastIndexOf('.') + 1);
    //     docName.push(nanoid() + '.' + docExt);
    //     form.append("medicalRecords", value.medicalRecords);
    // }

    // //Procedure Records
    // for (let index = 0; index < value.procedureRecords.length; index++) {
    //     var docExt = value.procedureRecords[index]
    //         ?
    //             .name
    //             .substr(value.procedureRecords[index]
    //                 ?.name.lastIndexOf('.') + 1);
    //     docName.push(nanoid() + '.' + docExt);
    //     form.append("procedureRecords", value.procedureRecords[index]);
    // }
    // if (value.procedureRecords != undefined && value.procedureRecords.length == undefined) {
    //     var docExt = value.procedureRecords
    //         ?
    //             .name
    //             .substr(value.procedureRecords
    //                 ?.name.lastIndexOf('.') + 1);
    //     docName.push(nanoid() + '.' + docExt);
    //     form.append("procedureRecords", value.procedureRecords);
    // }

    // //Prescription Records
    // for (let index = 0; index < value.prescriptionRecords.length; index++) {
    //     var docExt = value.prescriptionRecords[index]
    //         ?
    //             .name
    //             .substr(value.prescriptionRecords[index]
    //                 ?.name.lastIndexOf('.') + 1);
    //     docName.push(nanoid() + '.' + docExt);
    //     form.append("prescriptionRecords", value.prescriptionRecords[index]);
    // }
    // if (value.prescriptionRecords != undefined && value.prescriptionRecords.length == undefined) {
    //     var docExt = value.prescriptionRecords
    //         ?
    //             .name
    //             .substr(value.prescriptionRecords
    //                 ?.name.lastIndexOf('.') + 1);
    //     docName.push(nanoid() + '.' + docExt);
    //     form.append("prescriptionRecords", value.prescriptionRecords);
    // }

    // form.append("profileName", profileName);
    // form.append("documentName", docName);
    // form.append("medicalRecordName", docName);
    // form.append("procedureRecordName", docName);
    // form.append("prescriptionRecordName", docName);
    // const formData = await axios
    //     .post('/patient/addpatient', {data})
    //     .then((response) => {
    //         console.log(response);
    //         result = response;
    //     })
    // const updateDoc = await axios
    //     .post('/patient/updatedocument', form, axiosformData)
    //     .then((response) => {
    //         console.log(response);
    //         result = response;
    //     });
    // const updateMedicalRec = await axios
    //     .post('/patient/updatemedicalrecord', form, axiosformData)
    //     .then((response) => {
    //         console.log(response);
    //         result = response;
    //     });
    // const updateProcedureRec = await axios
    //     .post('/patient/updateprocedurerecord', form, axiosformData)
    //     .then((response) => {
    //         console.log(response);
    //         result = response;
    //     });
    // const updatePrescriptionRec = await axios
    //     .post('/patient/updateprescriptionrecord', form, axiosformData)
    //     .then((response) => {
    //         console.log(response);
    //         result = response;
    //     });

    //return result
  } catch (error) {
    console.log(error);
  }
};
export const UpdateDocumentApi = async (data) => {
  try {
    const { auth } = store.getState();
    var header = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + auth.token,
      },
    };
    const formData = await axios.post("/patient/updatedocument", data, header);
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateMedicalRecordApi = async (data) => {
  try {
    console.log(data);
    const formData = await axios.post("/patient/updatemedicalrecord", data, {
      instance: axiosformData,
    });
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateProcedureRecordApi = async (data) => {
  try {
    console.log(data);
    const formData = await axios.post("/patient/updateprocedurerecord", data, {
      instance: axiosformData,
    });
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export const UpdatePrescriptionRecordApi = async (data) => {
  try {
    console.log(data);
    const formData = await axios.post(
      "/patient/updateprescriptionrecord",
      data,
      { instance: axiosformData }
    );
    return formData;
  } catch (error) {
    console.log(error);
  }
};
