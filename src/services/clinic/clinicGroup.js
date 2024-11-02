import axios from "services/axios/axios";
import { GetJSONHederWithToken } from "utils/CommonMethods";

export const AddNewGroup = async (value) => {
  try {
    var header = GetJSONHederWithToken();
    var data = { groupName: value.groupName };
    const formData = await axios.post("/clinic/create", { data }, header);
    return formData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGroups = async () => {
  try {
    var header = GetJSONHederWithToken();
    const groupData = await axios.get("/clinic/get", header);
    return groupData;
  } catch (error) {
    console.log(error);
  }
};
