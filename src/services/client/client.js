import axios from "services/axios/axios";
import { nanoid } from "nanoid";
import { axiosFormData } from "../axios/axios";
import store from "../../store/store";
import { GetJSONHederWithToken } from "../../utils/CommonMethods";

export const GetClientOverview = async (page, size, paramStr) => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .get(
        "/clinic/getclients?page=" + page + "&size=" + size + "" + paramStr,
        header
      )
      .then((response) => {
        return response;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export const DeleteClient = async (id) => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .delete("/clinic/deleteclient?id=" + id, header)
      .then((response) => {
        if (response.status == 200) return true;
        else return false;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};
export const CreateUpdateClinicApi = async (value, id, logoName) => {
  let result;
  try {
    let isUpdateDoc = false;
    var form = new FormData();
    if (value.Logo.size > 0) {
      var picExt = value.Logo?.name.substr(
        value.Logo?.name.lastIndexOf(".") + 1
      );
      logoName =
        (logoName == undefined || logoName == "") && value.Logo != undefined
          ? nanoid() + "." + picExt
          : logoName;
      form.append("Logo", value.Logo);
      isUpdateDoc = true;
      form.append("logoName", logoName);
    }
    value.LogoName = logoName;
    const formData = await axios
      .post("/clinic/upsert", { value, id })
      .then((response) => {
        result = response;
      });
    if (isUpdateDoc) {
      const updateDoc = await axios
        .post("/clinic/updatedocument", form, axiosFormData)
        .then((response) => {
          result = response;
        });
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateClinicSettingApi = async (value, id) => {
  let result;
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .put("/clinic/updatesetting", { value, id }, header)
      .then((response) => {
        result = response;
        return result;
      });

    return result;
  } catch (error) {
    console.log(error);
  }
};
export const GetClinicApi = async (id) => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .get("/clinic/getclient?id=" + id, header)
      .then((response) => {
        if (response.status == 200) return response.data;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};

export const GetTimeSlotsApi = async (id) => {
  try {
    const { currentClinic } = store.getState();
    var header = GetJSONHederWithToken();
    const formData = await axios
      .get(
        "/clinic/getclinictimeslots?id=" + currentClinic?.clinic?._id,
        header
      )
      .then((response) => {
        if (response.status == 200) return response.data;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};

export const GetAllClinic = async () => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .get("/clinic/getallclients", header)
      .then((response) => {
        if (response.status == 200) return response.data;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};

export const GetCurrentPatientId = async () => {
  try {
    var header = GetJSONHederWithToken();
    const { currentClinic } = store.getState();
    const formData = await axios
      .get("/clinic/getpatientid?id=" + currentClinic?.clinic?._id, header)
      .then((response) => {
        if (response.status == 200) return response.data;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};

export const GetCurrentStaffId = async () => {
  try {
    var header = GetJSONHederWithToken();
    const { currentClinic } = store.getState();
    const formData = await axios
      .get("/clinic/getstaffid?id=" + currentClinic?.clinic?._id, header)
      .then((response) => {
        if (response.status == 200) return response.data;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};

export const GetCurrentInvoiceId = async () => {
  try {
    var header = GetJSONHederWithToken();
    const { currentClinic } = store.getState();
    const formData = await axios
      .get("/clinic/getbillnumber?id=" + currentClinic?.clinic?._id, header)
      .then((response) => {
        if (response.status == 200) return response.data;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};
