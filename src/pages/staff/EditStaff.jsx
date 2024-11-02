import { useEffect, useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import Sidebar from "components/detail-page/sidebar";
import Documents from "components/detail-page/Documents";
import BankDetails from "components/detail-page/BankDetails";
import ContactDetails from "components/detail-page/ContactDetails";
import AvailableTimeSlot from "components/detail-page/staff/AvailableTimeSlot.jsx";
import Status from "components/detail-page/Status";
import { StaffSubmitApi } from "services/staff/staff";
import ValidateStaff from "../../validation/Staff.js";
import StaffPersonalDetails from "../../components/detail-page/staff/StaffPersonalDetails.jsx";
import { GetStaffApi } from "services/staff/staff.js";
import { CheckMobileNumberExists } from "../../services/staff/staff.js";
import { alertBox, confirm } from "../../components/dialog/prompt.jsx";
import { GetErrorMessageForStaff } from "../../utils/CommonMethods.js";
import { GetCurrentStaffId } from "../../services/client/client.js";
export async function StaffAction({ request, params }) {
    const formData = await request.formData();
    const updates =  Object.fromEntries(Array.from(formData.keys()).map(key => [key, formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)]));
   const validation= ValidateStaff(updates);
   if(!validation)
   return false;

    var response= await StaffSubmitApi( updates,params.id,updates.profileName,updates.documentNames);
    if(response.status==200 && response?.data?.isSuccess==false)
    {
       var messageText= GetErrorMessageForStaff(response?.data?.description);
        alertBox({
            show: true,
            title: 'Message',
            proceed:undefined,
            confirmation: messageText
        });
        return false;
    }


   if(response.status==200)
    return redirect(`/staff/managestaffs`);
    else
    return false;
}
export async function StaffLoader({params}) {
    var staffData=undefined;
    if(params?.id!=undefined)
    {
        staffData = await GetStaffApi(params.id);
        return {staffData};
    }
    return {staffData};
}
function EditStaff(){
    const blob_URL = import.meta.env.VITE_BLOB_URL + "client1/staff/"; 
    var {staffData} = useLoaderData();
    const [autoId,SetAutoId]=useState(staffData?.staffId);
    if(staffData==undefined)
    {
        staffData={};
    }
    const settingsArray = ["Status", "Personal details", "Contact details","Bank details","Available time slot","Documents"];
    const [activeTab,
        setActiveTab] = useState(0);
        var isLoadingAutoid=false;
       
      useEffect(() => {
        if(staffData?.staffId==null && !isLoadingAutoid)
        {
            isLoadingAutoid=true;
            const fetchAutoId=async()=>{
                let data=await GetCurrentStaffId();
                let generatedId="";
                if(data?.staffId?.prefix!=null && data?.staffId?.prefix!="")
                {
                    generatedId=data.staffId.prefix+"_"
                }
                generatedId=generatedId+(data.staffId.currentStaffId);
                if(data?.staffId?.suffix!=null && data.staffId.suffix!="")
                {
                    generatedId=generatedId+"_"+data.staffId.suffix;
                }
                SetAutoId(generatedId);
            }
            fetchAutoId();
        }
    },[isLoadingAutoid]);
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    return( <div className="h-full ">   
    <Form className="flex flex-row h-full pt-2 " method="post" encType="multipart/form-data" noValidate>
        <div className='w-[30%] ml-2'>
            <div className='flex gap-[0.8rem] flex-col mt-[0.6rem] bg-[#FBFAFC] h-full p-6'>
                {settingsArray.map((data, index) => {
                    return (<Sidebar key={index}
                        id={index}
                        name={data}
                        isActive={(activeTab === index)}
                        isVisible={true}
                        isEnabled={true}
                        onClick={() => {
                        handleTabClick(index);
                        return index;
                    }}/>)
                })
}

            </div>
        </div>

        <div className='w-[70%]  h-full  flex flex-col  ml-2 p-6 '>
            <div
                className={`${activeTab === 0
                ? ''
                : 'hidden'}`}>
               <Status  click={() => {
                        handleTabClick(1);
                        return 1;
                    }} admin={staffData.isAdmin!=null ? staffData.isAdmin:false } doctor={staffData.isDoctor!=null? staffData.isDoctor:false} />
            </div>
            <div
                className={`${activeTab === 1
                ? ''
                : 'hidden'}`} disabled>
             <StaffPersonalDetails click={() => {
                        handleTabClick(2);
                        return 2;
                    }} staffId={autoId} firstName={staffData.firstName} lastName={staffData.lastName}
                    age={staffData.age} gender={staffData.gender} birthday={staffData.birthday} profilePic={staffData.profilePic}
                    specialization={staffData.specialization}
                    />
            </div>
            <div
                className={`${activeTab === 2
                ? ''
                : 'hidden'}`} disabled>
               <ContactDetails mobile={staffData.mobile} email={staffData.email} address={staffData.address} click={() => {
                        handleTabClick(3);
                        return 3;
                    }}/>
            </div>
            <div
                className={`${activeTab === 3
                ? ''
                : 'hidden'}`} disabled>
               <BankDetails bankName={staffData.bankName} ifsc={staffData.ifsc} account={staffData.account} accountName={staffData.accountName} click={() => {
                        handleTabClick(4);
                        return 4;
                    }}/>
            </div>
           
            <div
                className={`${activeTab === 4
                ? ''
                : 'hidden'}`} disabled>
                     <AvailableTimeSlot savedTimeSlot={staffData.availableTimeSlot} click={() => {
                        handleTabClick(5);
                        return 5;
                    }}/>
                </div>
                <div
                className={`${activeTab === 5
                ? ''
                : 'hidden'}`} disabled>
               <Documents documentType={staffData.documentType} documentNames={staffData.documents}
               documentNo={staffData.documentNumber} blob_url={blob_URL} click={()=>{}}
               />
            </div>
        </div>
        </Form>
    </div>)
}

export default EditStaff