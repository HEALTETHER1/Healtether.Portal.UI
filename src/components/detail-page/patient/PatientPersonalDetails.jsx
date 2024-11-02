import ContainerHeading from "components/detail-page/ContainerHeading"
import RequiredLabel from 'components/detail-page/RequiredLabel';
import {format} from "date-fns";
import DefaultTextboxClass from 'utils/Classes';
import {CalculateAge} from "../../../utils/CommonMethods";
import {useState} from "react";
import { NextButton } from "../NextButton";
function PatientPersonalDetails({
    patientId,
    firstName,
    lastName,
    birthday,
    age,
    gender,
    height,
    weight,
    click
}) {
    const blob_URL = import.meta.env.VITE_BLOB_URL + "client1/patient/";
    const [patientAge,
        setPatientAge] = useState(age)
    if (birthday != null) {
        birthday = format(new Date(birthday), 'yyyy-MM-dd');
    }
    const Dob_Change = (e) => {
        var result = CalculateAge(e.target.value)
        setPatientAge(result);
    }
    return (
        <div className="flex flex-col space-y-3">
            <ContainerHeading heading={"Personal details"}/>
            <div className='flex w-full space-x-3 align-center justify-between'>
                <label className="text-md ">Patient ID:&nbsp;&nbsp;{patientId}
                </label>
                <input type="hidden" name="patientId" value={patientId}/>
            </div>
            <div className="flex space-x-2">
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

                <div className='w-full space-y-1'>
                    <label className="text-sm ">Gender
                    </label>
                    <select
                        name="gender"
                        placeholder="Gender"
                        className={DefaultTextboxClass + " w-full text-md"}
                        defaultValue={gender}>
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
            </div>
            <div className="flex space-x-2">

                <div className='w-1/2 space-y-1'>
                    <label className="text-sm ">Height (cm)
                    </label>
                    <input
                        type="number"
                        name="height"
                        placeholder="Height"
                        autoComplete="off"
                        defaultValue={height}
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
                        defaultValue={weight}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>

            </div>
            <NextButton click={()=>{click();}} />
        </div>
    )
}

export default PatientPersonalDetails