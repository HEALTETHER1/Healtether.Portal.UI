import { useState } from "react";
import Sidebar from "components/detail-page/sidebar";
import profile from "assets/images/upload_image.jpg"
import ViewBankDetails from "components/view-page/ViewBankDetails";
import ViewPersonalDetails from "components/view-page/ViewPersonalDetails";
import ViewDocument from "components/view-page/ViewDocument";
import defaultUploadImg from "assets/images/upload_image.jpg"
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { DEFAULT_UPLOAD_IMAGE } from "utils/Classes";


function ViewStaff(){
    const {staffData} = useLoaderData();
    const settingsArray = [ "Personal details","Bank details","Documents"];
    const blob_URL = import.meta.env.VITE_BLOB_URL + "client1/staff/";
    const [activeTab,
        setActiveTab] = useState(0);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    const navigation = useNavigate();
    return(  <div className="flex flex-row h-full pt-2 space-x-4">
        <div className='w-[30%] ml-2 space-y-3'>
            <div
                className='flex flex-row  items-center  p-2  h-[10rem] '>

                <img
                    src={(staffData?.profilePic != null && staffData?.profilePic!=""
                        ? blob_URL + staffData.profilePic
                        : defaultUploadImg)}
                     alt="setimage"
                        onError={"this.src='"+DEFAULT_UPLOAD_IMAGE+"';"}
                    className="h-[110px] w-[110px] rounded-[50%] object-cover"/>
                <div className='flex flex-col ml-3'>
                    <div
                        className=" px-2.5 py-1 w-fit text-TextPrimary bg-yellow-400 justify-center  rounded-lg  text-center text-sm font-light  hover:shadow-md">
                      {(staffData.isAdmin?"Admin":(staffData.isDoctor?"Doctor":"Staff"))} 
                    </div>

                    <div className=" text-Secondary text-[1.5rem] font-medium mt-3">
                       {staffData.firstName+" "+staffData.lastName}
                        
                    </div>
                    <div className=" text-TextPrimary text-md font-normal ">
                   {staffData.specialization}
                    </div>
                  
                </div>
               
            </div>
            <hr className="h-px block bg-[#D9D9D9]"></hr>
            <div className="flex space-x-2">
                <Link to={"edit"}  className="bg-Primary text-white text-sm w-1/2 border h-fit text-center py-4 rounded-md cursor-pointer">
                Edit Profile
                    </Link>
                   
                        <button
                            type="button"
                            className="bg-TextBgPrimary text-TextPrimary text-sm w-1/2 h-fit py-4 rounded-md cursor-pointer" onClick={()=>{navigation(-1);}}>Cancel</button>
             </div>
            <div className='flex gap-[0.6rem] flex-col mt-[0.6rem]'>
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

        <div className='w-[70%]  bg-BgDetailPage  flex flex-col rounded-3xl ml-2 p-8 mb-6'>
            <div
                className={`${activeTab === 0
                ? ''
                : 'hidden'}`}>
                    <ViewPersonalDetails obj={staffData}/>
            </div>
            <div
                className={`${activeTab === 1
                ? ''
                : 'hidden'}`} disabled>
                    <ViewBankDetails obj={staffData}/>
            </div>
            <div
                className={`${activeTab === 2
                ? ''
                : 'hidden'}`} disabled>
                    <ViewDocument obj={staffData} />
            </div>

        </div>
    </div>)
}

export default ViewStaff