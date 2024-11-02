import axios from "services/axios/axios";
import store from "../../store/store";
import { GetJSONHederWithToken } from "../../utils/CommonMethods";

export const GetPaymentOverview = async (page, size, paramStr) => {
  try {
    const { currentClinic } = store.getState();
    var header = GetJSONHederWithToken();
    const response = await axios
      .get(
        "/payment/getpayments?clientId=" +
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
        return response;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const AddInvoice = async (id, patientId, clientId, data) => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .post(
        "/payment/addinvoice?id=" +
          id +
          "&patientId=" +
          patientId +
          "&clientId=" +
          clientId +
          "&staffName=" +
          clientId +
          "&staffId=" +
          clientId,
        data,
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
export const SetCashPayment = async (data) => {
  try {
    var header = GetJSONHederWithToken();
    const formData = await axios
      .post("/payment/setcashpayment", data, header)
      .then((response) => {
        console.log(response);
        return response;
      });
    return formData;
  } catch (error) {
    console.log(error);
  }
};

export const GetInvoiceById = async (invoiceId) => {
  try {
    var header = GetJSONHederWithToken();
    const invoice = await axios
      .get("/payment/getinvoicebyid?id=" + invoiceId, header)
      .then((response) => {
        console.log(response);
        return response;
      });
    return invoice;
  } catch (error) {
    console.log(error);
  }
};
