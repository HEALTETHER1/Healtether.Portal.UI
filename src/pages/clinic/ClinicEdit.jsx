import { useState } from "react";
import profile from "assets/images/upload_image.jpg";
import Sidebar from "components/detail-page/sidebar";
import ClinicPaymentSetting from "./ClinicPaymentSetting";
import ClinicDetail from "./ClinicDetail";
import ClinicSetting from "./ClinicSetting";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import ValidateClient from "validation/Clinic";
import { CreateUpdateClinicApi } from "services/client/client";
import { GetClinicApi } from "services/client/client";

export async function ClinicAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(
    Array.from(formData.keys()).map((key) => [
      key,
      formData.getAll(key).length > 1
        ? formData.getAll(key)
        : formData.get(key),
    ])
  );
  const validation = ValidateClient(updates);
  if (!validation) return false;
  else
    var response = await CreateUpdateClinicApi(
      updates,
      params.id,
      updates.LogoName
    );
  if (response != undefined && response.status == 200)
    return redirect(`/clinic/manageclinic`);
  else return false;
}
export async function ClinicLoader({ params }) {
  var clinicData = undefined;
  if (params?.id != undefined) {
    clinicData = await GetClinicApi(params.id);
    return { clinicData };
  }
  return { clinicData };
}
function ClinicEdit() {
  var { clinicData } = useLoaderData();
  var navigate = useNavigate();
  if (clinicData == null) {
    clinicData = {};
  }
  const settingsArray = [
    "Clinic Detail",
    "Clinic Settings",
    "Payments settings",
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  //   const clinicSubmit = (e) => {
  //     e.preventDefault();
  //   };
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
                {clinicData.adminUserId != null
                  ? clinicData?.adminUserId?.firstName +
                    " " +
                    clinicData?.adminUserId?.lastName
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

        <div className="w-4/6  h-fit  bg-BgDetailPage  flex flex-col rounded-3xl ml-2 p-6 ">
          <div className={`${activeTab === 0 ? "" : "hidden"}`}>
            <ClinicDetail
              logo={clinicData.logo}
              clinicName={clinicData.clinicName}
              adminDetail={clinicData?.adminUserId}
              address={clinicData.address}
            />
          </div>
          <div className={`${activeTab === 1 ? "" : "hidden"}`}>
            <ClinicSetting
              patientId={clinicData.patientId}
              staffId={clinicData.staffId}
              times={clinicData.timeSlots}
            />
          </div>
          <div className={`${activeTab === 2 ? "" : "hidden"}`}>
            <ClinicPaymentSetting
              phonePe={clinicData.phonepeSetting}
              charge={clinicData.consultationCharge}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ClinicEdit;
