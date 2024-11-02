import { useState } from "react";
import profile from "assets/images/upload_image.jpg";
import Sidebar from "components/detail-page/sidebar";
import ClinicPaymentSetting from "./ClinicPaymentSetting";
import ClinicSetting from "./ClinicSetting";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import store from "../../store/store";
import { GetClinicApi } from "services/client/client";
import { ValidateClientSetting } from "validation/Clinic";
import { UpdateClinicSettingApi } from "../../services/client/client";

export async function SettingAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(
    Array.from(formData.keys()).map((key) => [
      key,
      formData.getAll(key).length > 1
        ? formData.getAll(key)
        : formData.get(key),
    ])
  );
  const validation = ValidateClientSetting(updates);
  if (!validation) return false;
  else {
    var { currentClinic } = store.getState();
    var response = await UpdateClinicSettingApi(
      updates,
      currentClinic?.clinic?._id
    );
    if (response != undefined && response.status == 200)
      return redirect(`/dashboard`);
    else return false;
  }
}
export async function SettingLoader({ params }) {
  var { currentClinic } = store.getState();
  var clinicData = undefined;
  if (currentClinic?.clinic?._id != undefined) {
    clinicData = await GetClinicApi(currentClinic?.clinic?._id);
    return { clinicData };
  }
  return { clinicData };
}
function Settings() {
  var { clinicData } = useLoaderData();
  var { user } = store.getState();

  if (clinicData == null) {
    clinicData = {};
  }
  const settingsArray = ["Clinic Settings", "Payments settings"];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const navigate = useNavigate();
  // const clinicSubmit=(e)=>{
  // e.preventDefault();
  // }
  return (
    <div className="h-full ">
      <Form
        className="flex flex-row h-full pt-2"
        method="post"
        encType="multipart/form-data"
        noValidate
      >
        <div className="w-2/6 ml-2">
          <div className="flex flex-row  items-center shadow-sm p-2  h-[10rem] border-b border-[#D9D9D9]">
            <img
              src={profile}
              alt="Staff Profile Pic"
              title="Staff Profile Pic"
              className="h-[110px] w-[110px] rounded-[50%] object-cover"
            />
            <div className="flex flex-col ml-3 space-y-2">
              <div className="  px-2.5 py-1 w-fit text-TextPrimary bg-yellow-400 justify-center  rounded-lg  text-center text-sm font-light  hover:shadow-md">
                Admin
              </div>

              <div className=" text-TextPrimary text-[1.5rem] font-medium ">
                {user.user != null
                  ? user.user?.firstName + " " + user.user?.lastName
                  : "N/A"}
              </div>
              <div className="space-x-2">
                <button
                  type="submit"
                  className="bg-Primary text-white text-sm w-fit h-fit px-2 py-1 rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-TextBgPrimary text-TextPrimary text-sm w-fit h-fit px-2 py-1 rounded-md border"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-[0.6rem] flex-col mt-[0.6rem]">
            {settingsArray.map((data, index) => {
              return (
                <Sidebar
                  key={index}
                  id={index}
                  name={data}
                  isActive={activeTab === index}
                  isVisible={true}
                  isEnabled={true}
                  onClick={() => {
                    handleTabClick(index);
                    return index;
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="w-4/6  h-fit bg-BgPrimary flex flex-col rounded-3xl ml-2 p-6">
          <div className={`${activeTab === 0 ? "" : "hidden"}`}>
            <ClinicSetting
              patientId={clinicData.patientId}
              staffId={clinicData.staffId}
              times={clinicData.timeSlots}
            />
          </div>
          <div className={`${activeTab === 1 ? "" : "hidden"}`}>
            <ClinicPaymentSetting phonePe={clinicData.phonepeSetting} />
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Settings;
