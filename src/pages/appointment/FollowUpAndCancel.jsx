import { useEffect, useState } from "react";
import Sidebar from "components/detail-page/sidebar";
import { format,getDay } from "date-fns";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  Cancel,
  GetPatientAppointmentDetailsForFollowUpAndCancel,
  RescheduleAppointment,
  SetFollowUpAppointment,
} from "../../services/appointment/appointment";
import TimeLine from "./TimeLine";
import ScheduleFollowUp from "./ScheduleFollowUp";
import ReSchedule from "./ReSchedule";
import CancelAppointment from "./CancelAppointment";
import { ValidateRescheduleAppointment } from "../../validation/Appointment";
import { GetTimeSlotsApi } from "../../services/client/client";
import { GetDoctorAvailableTimeSlotApi, GetDoctorsWithAvailableTimeSlotApi } from "../../services/staff/staff";
import { generateTimeSlots, SortAndRemoveDuplicateTimeSlots } from "../../utils/CommonMethods";

export async function LoadAppointmentDetail({ params }) {
  var patientData = null;
  if (params?.id != undefined) {
    const patientId = params.id;
    patientData = await GetPatientAppointmentDetailsForFollowUpAndCancel(
      patientId
    );
    return { patientData };
  }
  return { patientData };
}

function FollowUpAndCancel() {
  const navigate = useNavigate();
  const { id, appointmentid } = useParams();
  const { patientData } = useLoaderData();
  let current = {};
  let loadingTimeSlots = false;
  const [timeSlots, setTimeSlots] = useState(() => []);
  const [selectedDate, setSelectedDate]=useState("");
let dayOfWeek=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let availableTimeSlots=[];
  useEffect(() => {
    setTimeSlots([])
    if (!loadingTimeSlots) {
      loadingTimeSlots = true;
        const fetchTimeSlots = async () => {
            let doctors = await GetDoctorAvailableTimeSlotApi(current.doctorId);
            let dayId= getDay(new Date(selectedDate));
            if(doctors!=null)
              {
                  let timeSlotsBasedOnDoctor=  doctors.availableTimeSlot.filter((item)=> (item.weekDay.indexOf(dayOfWeek[dayId])>-1));
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
        fetchTimeSlots();
        loadingTimeSlots = false;
    }
}, [selectedDate]);

  const settingsArray = [
    {
      name: "Timeline",
      isVisible: true,
      isEnabled: true,
    },
    {
      name: "Schedule Follow-up",
      isVisible: true,
      isEnabled: true,
    },
    {
      name: "Reschedule appointment",
      isVisible: true,
      isEnabled: true,
    },
    {
      name: "Cancel appointment",
      isVisible: true,
      isEnabled: true,
    },
    // {     name: "View Patient details",     isVisible: true,     isEnabled: true
    // },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [patientMenu, setPatientMenu] = useState(settingsArray);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    setSelectedDate("");
  };

  function GetCurrentAppointment() {
    if (appointmentid != null)
      for (var i = 0, len = patientData?.appointments.length; i < len; i++) {
        if (patientData?.appointments[i]._id === appointmentid) {
          current = patientData?.appointments[i];
          return;
        }
      }
  }

  async function Cancelled() {
    const result = await Cancel(appointmentid);
    if (result.status == "200") {
      navigate("/appointment");
    }
  }
  async function ReScheduled(scheduledDate, scheduledTimeSlot) {
    var isValid = ValidateRescheduleAppointment(
      scheduledDate,
      scheduledTimeSlot
    );
    if (isValid) {
      const result = await RescheduleAppointment(
        appointmentid,
        scheduledDate,
        scheduledTimeSlot
      );
      if (result.status == "200") {
        setActiveTab(0);
        navigate(
          "/patient/" + id + "/appointment/" + appointmentid + "/details"
        );
      }
    }
  }
  async function SetFollowUp(scheduledDate, scheduledTimeSlot) {
    var isValid = ValidateRescheduleAppointment(
      scheduledDate,
      scheduledTimeSlot
    );
    if (isValid) {
      const result = await SetFollowUpAppointment(
        appointmentid,
        scheduledDate,
        scheduledTimeSlot
      );
      if (result.status == "200") {
        setActiveTab(0);
        navigate(
          "/patient/" + id + "/appointment/" + appointmentid + "/details"
        );
      }
    }
  }
  GetCurrentAppointment();
  return (
    <div className="flex flex-row  h-full pt-3 pb-3 space-x-6 overflow">
      <div className="w-2/6 ml-2 space-y-2">
        <div className="flex flex-row  items-center  justify-between p-1  h-fit ">
          <div className="flex flex-col mt-3">
            <label className=" font-normal text-sm text-GreyText">
              Attending Doctor
            </label>
            <label className=" font-normal text-lg">
              Dr. {current.doctorName}
            </label>
          </div>
          <div className="flex flex-col mt-2 text-right">
            <label className=" font-medium text-sm text-Secondary">SLOT</label>
            <label className=" font-normal text-lg">{current.timeSlot}</label>
            <label className=" font-medium text-md text-GreyText">
              {format(new Date(current?.appointmentDate), "dd MMMM, yyyy")}
            </label>
          </div>
        </div>
        <hr className="h-[2px] block bg-[#E4E0F3]"></hr>
        <div className="flex flex-row  items-center  p-1  h-fit ">
          <div className="flex flex-col ml-3">
            <div className=" text-Secondary text-2xl font-medium mt-px">
              {patientData.firstName + " " + patientData.lastName}
            </div>
            <div className=" text-TextPrimary text-sm  font-normal ">
              +91-{patientData.mobile}
            </div>
            <div className=" text-TextPrimary text-sm  font-normal ">
              Patient ID:&nbsp;{patientData.patientId}
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pb-2">
          <Link
            to={"edit"}
            className="bg-TextBgPrimary border text-TextPrimary text-sm w-1/2 h-fit py-4 rounded-md text-center cursor-pointer"
          >
            Chat
          </Link>
          <Link
            to={"edit"}
            className="bg-TextBgPrimary border text-TextPrimary text-sm w-1/2 h-fit py-4 rounded-md text-center cursor-pointer"
          >
            View Bills
          </Link>
        </div>
        <hr className="h-px block bg-[#D9D9D9]"></hr>
        <div className="flex gap-[0.6rem] flex-col pt-3">
          {patientMenu.map((data, index) => {
            return (
              <Sidebar
                key={index}
                id={index}
                name={data.name}
                isActive={activeTab === index}
                isVisible={data.isVisible}
                isEnabled={data.isEnabled}
                onClick={() => {
                  if (data == "Consultation") {
                    handleTabClick(index);
                    return { visible: true };
                  } else {
                    handleTabClick(index);
                    return index;
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="w-4/6  flex flex-col">
        <div
          className={`${
            activeTab === 0 ? "" : "hidden"
          } h-[100%] overflow-auto bg-BgDetailPage rounded-3xl p-8 `}
        >
          <TimeLine appointments={patientData?.appointments} />
        </div>
        <div
          className={`${activeTab === 1 ? "" : "hidden"} h-[100%] space-y-4`}
        >
          <div className="h-[50%] overflow-auto bg-BgDetailPage rounded-3xl  p-8">
            <ScheduleFollowUp timeSlots={timeSlots} onSave={SetFollowUp} selectedDate={selectedDate}  setSelectedDate={setSelectedDate}/>
          </div>
          <div className="h-[50%] overflow-auto bg-BgDetailPage rounded-3xl p-8">
            <TimeLine appointments={patientData?.appointments} />
          </div>
        </div>
        <div
          className={`${activeTab === 2 ? "" : "hidden"} h-[100%] space-y-4`}
          disabled
        >
          <div className="h-[50%] overflow-auto bg-BgDetailPage rounded-3xl  p-8">
            <ReSchedule timeSlots={timeSlots} onSave={ReScheduled} selectedDate={selectedDate}  setSelectedDate={setSelectedDate}/>
          </div>
          <div className="h-[50%] overflow-auto bg-BgDetailPage rounded-3xl p-8">
            <TimeLine appointments={patientData?.appointments} />
          </div>
        </div>
        <div
          className={`${activeTab === 3 ? "" : "hidden"} h-[100%] space-y-4`}
          disabled
        >
          <div className="h-[50%] overflow-auto bg-BgDetailPage rounded-3xl  p-8">
            <CancelAppointment
              onSave={Cancelled}
              onCancel={() => {
                setActiveTab(0);
              }}
            />
          </div>
          <div className="h-[50%] overflow-auto bg-BgDetailPage rounded-3xl p-8">
            <TimeLine appointments={patientData?.appointments} />
          </div>
        </div>
        <div className={`${activeTab === 4 ? "" : "hidden"}`} disabled></div>
      </div>
    </div>
  );
}

export default FollowUpAndCancel;
