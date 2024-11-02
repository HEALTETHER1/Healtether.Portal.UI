import ContainerHeading from "components/detail-page/ContainerHeading"
import RequiredLabel from 'components/detail-page/RequiredLabel';
import DefaultTextboxClass from 'utils/Classes';
import defaultUploadImg from "assets/images/upload_image.jpg"
import { useRef, useState } from "react";
import { format } from "date-fns";
import { DEFAULT_UPLOAD_IMAGE } from "utils/Classes";
import { CalculateAge } from "utils/CommonMethods";
import { NextButton } from "../NextButton";
function StaffPersonalDetails({staffId,firstName,lastName,birthday,age,gender,specialization,profilePic,click}) {
    let staff={};
    let profileName=undefined;
    let profileImg=defaultUploadImg;
    const [patientAge,
        setPatientAge] = useState(age);
    const blob_URL = import.meta.env.VITE_BLOB_URL + "client1/staff/";
    if(profilePic != null)
    {
        profileName= profilePic;
        profileImg=(blob_URL + profilePic)
    }
    if(birthday!=null)
    {
        birthday =format(new Date(birthday), 'yyyy-MM-dd');
    }
    const [imgSrc,setImgSrc]=useState(profileImg);
    const imageRef=useRef(null);
   
    function profilePhotoClicked(){
        imageRef.current.click()
    }
    function profilePhotoUpdate(e){
        setImgSrc(URL.createObjectURL(e.target.files[0]))
      //  setprofilePic(e.target.files[0]);
    }
    const Dob_Change = (e) => {
        var result = CalculateAge(e.target.value)
        setPatientAge(result);
    }
    return (
        <div className="flex flex-col space-y-2">
            <ContainerHeading heading={"Personal details"}/>
            <div className="flex align-center justify-between w-full">
                <div className="w-1/2 grid place-items-center">
                    <img className="h-[150px] w-[160px] rounded-[40%] object-cover" src={imgSrc} alt={DEFAULT_UPLOAD_IMAGE} onClick={profilePhotoClicked} />
                    <input className="hidden" name="profilepic" type="file" ref={imageRef} accept="image/*" onChange={profilePhotoUpdate}/>
                    <input type="hidden" className="hidden" name="profileName" value={profileName} />
                  
                </div>
            <div className="flex  flex-col w-1/2">
                <div className='w-full space-y-1'>
                    <label className="text-sm ">Staff ID
                        <RequiredLabel/></label>
                    <input
                        type="text"
                        name="staffId"
                        placeholder="Staff ID"
                        autoComplete="off"
                        defaultValue={staffId}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
                <div className='w-full space-y-1'>
                    <label className="text-sm ">First Name
                        <RequiredLabel/></label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        autoComplete="off"
                        defaultValue={firstName}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
                <div className='w-full space-y-1'>
                    <label className="text-sm ">Last Name
                        <RequiredLabel/></label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        autoComplete="off"
                        defaultValue={lastName}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
            </div>
            </div>
            
            <div className="flex space-x-2">
                <div className='w-1/2 space-y-1'>
                    <label className="text-sm ">Birthdate
                    </label>
                    <input
                        type="date"
                        name="birthday"
                        placeholder="Birthdate"
                        autoComplete="off"
                        defaultValue={birthday}
                        onChange={(e) => {
                            Dob_Change(e)
                        }}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
                <div className='w-1/2 space-y-1'>
                    <label className="text-sm ">Age
                    <RequiredLabel/>
                    </label>
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        autoComplete="off"
                        
                        defaultValue={patientAge}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
            </div>
            <div className="flex space-x-2">
            <div className='w-1/2 space-y-1'>
                    <label className="text-sm ">Specialization
                    </label>
                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        autoComplete="off"
                        defaultValue={specialization}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
            <div className='w-1/2 space-y-1'>
                    <label className="text-sm ">Gender
                    </label>
                    <select
                        name="gender"
                        placeholder="Gender"
                        className={DefaultTextboxClass + " w-full text-md"}
                        defaultValue={gender}
                        >
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
            </div>
            {/* <div className="flex space-x-2">

                    <div className='w-1/2 space-y-1'>
                        <label className="text-sm ">Height (cm)
                        </label>
                        <input
                            type="number"
                            name="height"
                            placeholder="Height"
                            autoComplete="off"
                            className={DefaultTextboxClass + " w-full text-md"}/>
                    </div>
                    <div className='w-1/2 space-y-1'>
                        <label className="text-sm ">Weight (kg)
                        </label>
                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight"
                            autoComplete="off"
                            className={DefaultTextboxClass + " w-full text-md"}/>
                    </div>

            </div> */}
              <NextButton click={()=>{click();}} />
        </div>
    )
}

export default StaffPersonalDetails