import React, { useEffect, useRef, useState } from "react";
import { Form, redirect, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import { AppointmentSubmitApi } from "services/appointment/appointment";
import Autocomplete from "components/autoComplete/Autocomplete.jsx";
import { SearchPatientMobileApi } from "services/patient/patient";
import AutocompleteModel from "utils/AutocompleteModel";
import DefaultTextboxClass, { DefaultSelectOptionClass, DefaultSelectboxClass } from "../../utils/Classes";
import { GetDoctorsWithAvailableTimeSlotApi} from "services/staff/staff";
import {CalculateAge, FindIndexInArrayById, generateTimeSlots, SortAndRemoveDuplicateTimeSlots} from "utils/CommonMethods";
import { GetAppointmentById } from "services/appointment/appointment";
import {format, getDay} from "date-fns";
import { ValidateAppointment } from "../../validation/Appointment";
import Spinner from "../../components/loader/Spinner";

export async function AppointmentAction({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(Array.from(formData.keys()).map(key => [
        key,
        formData
            .getAll(key)
            .length > 1
            ? formData.getAll(key)
            : formData.get(key)
    ]));

    const validation = ValidateAppointment(updates);
    if (!validation)
        return false;

    var result = await AppointmentSubmitApi(updates, params.id);
    if (result.status == 200 && result.data.isSuccess) {
        var id = result.data.data.id;
        return redirect('/appointment/' + id + '/success');
    }
    return false;
}
export async function EditAppointmentLoader({ params }) {
    var appointmentData = null;
    if (params
        ?.id != undefined) {
        appointmentData = await GetAppointmentById(params.id);
        return { appointmentData };
    }
    return { appointmentData };
}
export const searchPatientMobileMapper = (data) => {
    var options = [new AutocompleteModel("Add New Patient",undefined,undefined,false)];
    for (let index = 0; index < data.data.length; index++) {
        var option = new AutocompleteModel(data.data[index].firstName + " " + data.data[index].lastName, '(' + data.data[index].patientId + ') ' + data.data[index].mobile, data.data[index],true);
        options.push(option);
    }

    return options;
}

export default function ScheduleAppointment() {
    //-- New
    let loadingDoctor = false;
    const navigation = useNavigation();
    const busy = navigation.state === "submitting";
    var { appointmentData } = useLoaderData();
    const [doctors, setDoctors] = useState(() => []);
    const [timeSlots, setTimeSlots] = useState(() => []);
    const [selectedDoctor, SetSelectedDoctor] = useState(() => appointmentData?.doctorId != null ? appointmentData.doctorId : "0");
    const [selectedDoctorName, SetSelectedDoctorNam] = useState(() => appointmentData?.doctorName != null ? appointmentData.doctorName : "");
    const [selectedTimeSlot, SetSelectedTimeSlot] = useState(() => appointmentData?.timeSlot != null ? appointmentData.timeSlot : "0");
    const [virtual, setVirtual] = useState(() => appointmentData?.virtualConsultation != null ? appointmentData.virtualConsultation : false);
    const [isEdit, setIsEdit] = useState(() => appointmentData != null);
    const [disableProperty, setDisableProperty] = useState(false);
    let submit = useSubmit();
    let FormRef = useRef();
    useEffect(() => {
        setTimeSlots([])
        setIsEdit(appointmentData != null);
        if (!loadingDoctor) {
            loadingDoctor = true;
            const fetchDoctor = async () => {
                var doctors = await GetDoctorsWithAvailableTimeSlotApi();
                setDoctors(doctors);
            }
            fetchDoctor();
        }

    }, []);
   
    const searchPatientMobile = (text, size) => {
        return SearchPatientMobileApi(text, size);
    }


    const [selectedPatient,
        setselectedPatient] = React.useState(() => appointmentData?.patientId != null ? { _id: appointmentData.patientId, firstName: appointmentData.name.split(" ")[0], lastName: appointmentData.name.split(" ")[1] } : {});
    const [patientMobile,
        setpatientMobile] = useState(() => appointmentData?.mobile != null ? appointmentData.mobile : "");
    const [patientName,
        setpatientName] = useState(() => appointmentData?.name != null ? appointmentData.name : "");
    const [patientGender,
        setpatientGender] = useState(() => appointmentData?.gender != null ? appointmentData.gender : "");
    const [patientBirthday,
        setPatientBirthday] = useState(() => appointmentData?.birthDate != null ? format(new Date(appointmentData.birthDate), 'yyyy-MM-dd') : "");
    const [patientAge,
        setpatientAge] = useState(() => appointmentData?.age != null ? appointmentData.age : "");
    const [appointmentDate,
        setAppointmentDate] = useState(() => appointmentData?.appointmentDate != null ? format(new Date(appointmentData.appointmentDate), 'yyyy-MM-dd') : "");
    const [reason,
        setReason] = useState(() => appointmentData?.reason != null ? appointmentData.reason : "");
    const[clinicPatientId, setClinicPatientId] = useState(null);
    const [selectedText, setSelectedText] = useState();

    const ResetPatientDetail=(onNewPatientClick=false)=>{
        if(!onNewPatientClick)
        {
            setpatientMobile("");
        }
        setPatientBirthday("");
        setpatientAge("");
        setpatientGender("");
        setpatientName("");
        setSelectedText(undefined);
    }
    const ResetAppointmentDetail=()=>{
        setAppointmentDate("");
        SetSelectedDoctor("0");
        setReason("");
        SetSelectedTimeSlot("0");
    }
    const OnSelectPatient = (data) => {
        if (data != undefined)
        {
            setselectedPatient(data);
        if (data.mobile != undefined) {
            setpatientMobile(data.mobile);
            setClinicPatientId(data.patientId);
        }
        if (data.firstName != undefined)
            setpatientName((data.firstName + " " + data.lastName));
        if (data.gender != undefined)
            setpatientGender(data.gender);
        if (data.birthday != undefined) {
            var birthday = data.birthday.split('T')[0]
            setPatientBirthday(birthday);
        }
        if (data.age != undefined)
            setpatientAge(data.age);

        var selected = patientMobile + patientName;
        setSelectedText(selected);
        setDisableProperty(true);
        }
        else{
            setDisableProperty(false);
            ResetPatientDetail(true);
        }
    }
    const ChangeSelectedDoctor = (value) => {
        var doctor = [...doctors];
        SetSelectedDoctor(value);
        var i = FindIndexInArrayById(doctor, value)
        SetSelectedDoctorNam((doctor[i].firstName + " " + doctor[i].lastName))
        AssignTimeSlots(value,undefined);
    }
let dayOfWeek=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const AssignTimeSlots = (id,appDate) => {
       let availableTimeSlots=[];
       let doctorId= id?id:selectedDoctor;
       let dateSelected=appDate?appDate:appointmentDate;

       if(doctorId && dateSelected){

           let filteredDoctor= doctors.filter((item)=> item._id==doctorId);
          let dayId= getDay(new Date(dateSelected));

          if(filteredDoctor.length>0)
          {
              let timeSlotsBasedOnDoctor=  filteredDoctor[0].availableTimeSlot.filter((item)=> (item.weekDay.indexOf(dayOfWeek[dayId])>-1));
              for (const doctorTimeSlots of timeSlotsBasedOnDoctor) {
                  for (const doctorTimeSlot of doctorTimeSlots.timeSlot) {
                      let generateSlots= generateTimeSlots(doctorTimeSlot.start,doctorTimeSlot.end,doctorTimeSlots.slotDuration);
                      availableTimeSlots= availableTimeSlots.concat(generateSlots);
                  }
              }
              if (availableTimeSlots.length>0){
                  availableTimeSlots=availableTimeSlots.map((item)=>
                      item.start+" - "+item.end
                  );
              }
              availableTimeSlots= SortAndRemoveDuplicateTimeSlots(availableTimeSlots);
              setTimeSlots(availableTimeSlots);
          }

       }


    }
    
    const currentDate = new Date().toISOString().split('T')[0];

    function Schedule() {
        submit(FormRef.current);
    }

    return (
        <Form className="py-6" method="post" autoComplete="off" noValidate ref={FormRef}>
            <span className="text-italic text-md">Personal Details of the patient</span>
            <div className="flex flex-wrap py-4 ml-1 " id="patientdetail">

                <div className="w-1/3 pr-2 ">
                    <input value={selectedPatient._id} name="patientId" type="hidden" />
                    <label className="text-xs ">Mobile (Search with PatientID)</label>
                    <Autocomplete options={[]}
                        customClass={DefaultTextboxClass + " w-full leading-8"}
                        value={patientMobile}
                        placeHolder="Mobile no." name="mobile" setDisable={isEdit}
                        onChange={setpatientMobile} search={searchPatientMobile} searchMapper={searchPatientMobileMapper} onSelect={(data) => { OnSelectPatient(data); }}
                    />
                </div>
                <div className="w-1/3 pr-2">
                    <input type="hidden" value={clinicPatientId} name="clinicPatientId"/>
                    <label className="text-xs ">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name" autoComplete="off"
                        value={patientName} readOnly={isEdit || disableProperty}
                        className={DefaultTextboxClass + " w-full leading-8 "} onChange={(e) => { setpatientName(e.target.value) }} />
                </div>
                <div className="w-1/3 pr-2">
                    <label className="text-xs ">Gender</label>
                    {(isEdit || disableProperty) ?
                        <input name="gender"
                            placeholder="Select Gender" value={patientGender} className={DefaultTextboxClass + " w-full leading-8"}
                            readOnly={isEdit || disableProperty} onChange={(e) => { setpatientGender(e.target.value) }} />
                        :
                        <select
                            name="gender"
                            placeholder="Select Gender"
                            value={patientGender}
                            readOnly={isEdit || disableProperty}
                            onChange={(e) => { setpatientGender(e.target.value) }}
                            className={DefaultSelectboxClass + " w-full leading-8"}>
                            <option value=""></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    }

                </div>

                <div className="w-1/3 mt-4 pr-2">
                    <label className="text-xs ">Birth Date</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={patientBirthday}
                        readOnly={isEdit || disableProperty}
                        onChange={(e) => { setPatientBirthday(e.target.value); setpatientAge(CalculateAge(e.target.value)); }} min="1900-01-01" max={currentDate}
                        placeholder="Select a BirthDate" autoComplete="off"
                        className={DefaultTextboxClass + " w-full leading-8"}
                    />

                </div>
                <div className="w-24 mt-4 pr-2">
                    <label className="text-xs ">Age</label>
                    <input
                        type="text"
                        name="age"
                        value={patientAge}
                        readOnly={isEdit || disableProperty}
                        onChange={(e) => { setpatientAge(e.target.value); }}
                        placeholder="Age" autoComplete="off" required
                        className={DefaultTextboxClass + " w-full leading-8 disabled:opacity-75 disabled:cursor-not-allowed"}
                    />

                </div>
                <div className="w-1/3 mt-4 pr-2 "></div>

            </div>
            <div className="mb-4  ml-1 ">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                    <input type="hidden" name="virtualConsultation" defaultValue={virtual} />
                    <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="checkbox"
                        id="virutalBox"
                        value={virtual}
                        onChange={() => { let isOnline = virtual; setVirtual(!isOnline); }}
                    />
                    <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="virutalBox">
                        Virtual Consultation
                    </label>
                </div>
            </div>

            <hr className="h-px block bg-gray-300"></hr>

            <div className="my-4  ml-1 ">
                <span className="text-italic text-md">Appoinment Details</span>
                <div className="flex flex-wrap py-4" id="appointmentdate">
                    <div className="w-1/3 pr-2">
                        <input type="hidden" value={selectedDoctor} name="doctorId" />
                        <input type="hidden" value={selectedDoctorName} name="doctorName" />
                        <label className="text-xs ">Attending Doctor</label>
                        <select className={DefaultSelectboxClass + " w-full leading-8"} value={selectedDoctor} onChange={(e) =>
                            ChangeSelectedDoctor(e.target.value)
                        }>
                            <option disabled="disabled" className=" font-normal" value="0"> Select Doctor </option>
                            {doctors.map((item, i) => <option id={i} className={DefaultSelectOptionClass} key={item._id} value={item._id} >Dr. {item.firstName + " " + item.lastName} ( {item.specialization} )</option>)}
                        </select>


                    </div>
                    <div className="w-1/3 pr-2">
                        <label className="text-xs ">Appoinment Date</label>
                        <input
                            type="date"
                            name="appointmentDate"
                            placeholder="Select Appoinment Date" autoComplete="off" required min={currentDate}
                            onChange={(e) =>{
                                setAppointmentDate(e.target.value);
                                AssignTimeSlots(undefined,e.target.value);
                            }
                            }
                            value={appointmentDate}
                            className={DefaultTextboxClass + " w-full leading-8"} />
                    </div>
                    <div className="w-1/3 pr-2">
                        <label className="text-xs ">Appoinment Time Slot</label>
                        <select className={DefaultSelectboxClass + " w-full leading-8"} name="timeSlot" defaultValue={selectedTimeSlot} onChange={(e) =>
                            SetSelectedTimeSlot(e.target.value)
                        }>
                            <option disabled="disabled" className=" font-normal" value="0"> Select Time Slot </option>
                            {timeSlots.map((item, i) => <option id={i} key={"timeKey_"+ i} value={item}> {item}</option>)}
                           {/* {timeSlots.map((item, i) => <option id={i} key={"timeKey_"+ i} value={(item.start) + " - " + (item.end)}> {(item.start) + " - " + (item.end)}</option>)}*/}
                        </select>
                    </div>

                    <div className="w-2/3 pr-2 pt-2">
                        <label className="text-xs ">Appoinment Reason</label>
                        <input
                            type="text"
                            name="reason"
                            placeholder="Appoinment Reason" value={reason}
                            onChange={(e)=>setReason(e.target.value)}
                            className={DefaultTextboxClass + " w-full leading-8"} />
                    </div>
                </div>


                <div className='w-2/3  pt-2 space-x-2'>

                    <button
                        type="button"
                        onClick={Schedule}
                        disabled={busy}
                        className="bg-Primary inline-block border border-Primary rounded-md px-4 py-2.5 text-sm font-normal leading-normal text-white ">
                        Schedule Appointment&nbsp;&nbsp;
                        {busy ? <Spinner show={true} /> : <></>}
                    </button>
                    <button
                        type="button" onClick={()=>{ResetPatientDetail();ResetAppointmentDetail();}}
                        className="bg-TextBgPrimary border border-TextPrimary text-TextPrimary inline-block rounded-md px-6 py-2.5 text-sm font-normal " >
                        Clear
                    </button>
                </div>
            </div>
        </Form>
    )
}