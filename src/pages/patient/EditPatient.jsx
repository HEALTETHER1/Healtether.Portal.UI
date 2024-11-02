import {useEffect, useState} from "react";
import {Form, redirect, useLoaderData} from "react-router-dom";
import Sidebar from "components/detail-page/sidebar";
import Documents from "components/detail-page/Documents";
import ContactDetails from "components/detail-page/ContactDetails";
import PatientPersonalDetails from "components/detail-page/patient/PatientPersonalDetails";
import ValidatePatient from "validation/Patient";
import { AddUpdatePatientApi } from "services/patient/patient";
import { useSelector } from "react-redux";
import { GetPatient } from "../../services/patient/patient";
import {  GetCurrentPatientId } from "../../services/client/client";
export async function PatientAction({request, params}) {
    const formData = await request.formData();
   
    const updates = Object.fromEntries(Array.from(formData.keys()).map(key => [
        key,
        formData
            .getAll(key)
            .length > 1
            ? formData.getAll(key)
            : formData.get(key)
    ]));

    const validation = ValidatePatient(updates);
    if (!validation) 
        return false;
    
    var response = await AddUpdatePatientApi(updates,params.id);
    if(!!response && response.success)
    return redirect(`/patient/managepatient`);
    else
    return false;
}
export async function PatientLoader({params}) {
    var patientData = undefined;
    if (params
        ?.id != undefined) {
        patientData = await GetPatient(params.id);
        return {patientData};
    }
    return {patientData};
}
function EditPatient() {
    var {clinic}=  useSelector(store=> store.currentClinic)
    const blob_URL = import.meta.env.VITE_BLOB_URL + `clinic${clinic._id}/patient/`;
    var {patientData} = useLoaderData();
    const [autoId,SetAutoId]=useState(patientData?.patientId);
    if (patientData == undefined) {
        patientData = {};
    }
    var isLoadingAutoid=false;
   
  useEffect(() => {
    if(patientData?.patientId==null && !isLoadingAutoid)
    {
        isLoadingAutoid=true;
        const fetchAutoId=async()=>{
            let data=await GetCurrentPatientId();
            let generatedId="";
            if(data?.patientId?.prefix!=null && data?.patientId?.prefix!="")
            {
                generatedId=data.patientId.prefix+"_"
            }
            generatedId=generatedId+(data.patientId.currentPatientId);
            if(data?.patientId?.suffix!=null && data.patientId.suffix!="")
            {
                generatedId=generatedId+"_"+data.patientId.suffix;
            }
            SetAutoId(generatedId);
        }
        fetchAutoId();
    }
},[isLoadingAutoid]);
    const settingsArray = ["Personal details", "Contact details", "Documents"];
    const [activeTab,
        setActiveTab] = useState(0);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    return (
        <div className="h-full ">
            <Form
                className="flex flex-row h-full pt-2 "
                method="post"
                encType="multipart/form-data"
                noValidate>
                <div className='w-2/6'>
                    <div className='flex gap-[0.8rem] flex-col mt-[0.6rem] bg-[#FBFAFC] h-full p-6'>
                        {settingsArray.map((data, index) => {
                            return (<Sidebar
                                key={index}
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

                <div className='w-4/6  h-full  flex flex-col  p-6 '>

                    <div
                        className={`${activeTab === 0
                        ? ''
                        : 'hidden'}`}
                        disabled>
                        <PatientPersonalDetails
                            patientId={autoId}
                            firstName={patientData.firstName}
                            lastName={patientData.lastName}
                            age={patientData.age}
                            gender={patientData.gender}
                            birthday={patientData.birthday}
                            height={patientData.height}
                            weight={patientData.weight}
                            click={() => {
                            handleTabClick(1);
                            return 1;
                        }}/>
                    </div>
                    <div
                        className={`${activeTab === 1
                        ? ''
                        : 'hidden'}`}
                        disabled>
                        <ContactDetails
                            mobile={patientData.mobile}
                            email={patientData.email}
                            address={patientData.address}
                            click={() => {
                            handleTabClick(2);
                            return 2;
                        }}/>
                    </div>
                    <div
                        className={`${activeTab === 2
                        ? ''
                        : 'hidden'}`}
                        disabled>
                        <Documents
                            documentType={patientData.documentType}
                            documentNames={patientData.documents}
                            documentNo={patientData.documentNumber}
                            blob_url={blob_URL}
                            click={() => {}}/>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default EditPatient