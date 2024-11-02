import { useEffect, useState } from "react";
import ContainerHeading from "components/detail-page/ContainerHeading.jsx";
import DefaultTextboxClass from "utils/Classes.js";
import moment from "moment";
import { DefaultSelectboxClass } from "../../../utils/Classes";
import { GetDoctorAvailableTimeSlotApi } from "../../../services/staff/staff";
import { generateTimeSlots, SortAndRemoveDuplicateTimeSlots } from "../../../utils/CommonMethods";
import { format, getDay } from "date-fns";

const FollowUp = ({ doctorId, followUpAppDate, followUpTimeSlot }) => {
    const [appointmentDate, setAppointmentDate] = useState(followUpAppDate != null ? format(new Date(followUpAppDate), 'yyyy-MM-dd') : null);
    const [active, setActive] = useState(followUpAppDate != null ? 6 : 1);
    const [minutes, setMinutes] = useState();
    const [hour, setHour] = useState();
    const [selectedTimeSlot, SetSelectedTimeSlot] = useState(followUpTimeSlot);
    const [timeSlots, setTimeSlots] = useState();
    const [doctorAllTimeSlots, setDoctorAllTimeSlots] = useState();

    let isLoading = true;

    const ChangeAppointmentDate = async (no) => {
        if (!no) {
            setAppointmentDate("");
        } else {
            const futureDate = moment().add(no, "days");
            setAppointmentDate(futureDate.format("YYYY-MM-DD"));
            var doctorDetails = await GetDoctorTime();
            GetDoctorTimeSlot(doctorDetails, futureDate.format("MM-DD-YYYY"));
            return futureDate.format("DD-MM-YYYY")
        }
    };
    const handleminutesChange = (e) => {
        const newValue = e.target.value;

        if (newValue === "" || (newValue >= 1 && newValue <= 59)) {
            setMinutes(newValue);
        }
    };
    const handleHourChange = (e) => {
        const newValue = e.target.value;

        if (newValue === "" || (newValue >= 0 && newValue <= 23)) {
            setHour(newValue);
        }
    };
    const handleOptionClick = (option, days) => {
        setActive(option);
        ChangeAppointmentDate(days);
    };

    async function GetDoctorTime() {
        if (doctorAllTimeSlots == null) {
            let doctorDetail = await GetDoctorAvailableTimeSlotApi(doctorId);
            if (doctorDetail != null) {
                setDoctorAllTimeSlots(doctorDetail.availableTimeSlot)
            }
            return doctorDetail;
        }
    }
    useEffect(() => {
        if (followUpTimeSlot != null && isLoading) {
            isLoading = false;
            GetDoctorTime()
                .then((d) =>
                    GetDoctorTimeSlot(d, followUpAppDate != null ? format(new Date(followUpAppDate), 'yyyy-MM-dd') : null)
                );
        }
    }, []);

    function GetDoctorTimeSlot(doctorDetails, selectedAppointmentDate) {
        let availableTimeSlots = [];
        let dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let dayId = getDay(new Date(selectedAppointmentDate));
        let filterDoctor = doctorDetails?.availableTimeSlot || doctorAllTimeSlots;
        let timeSlotsBasedOnDoctor = filterDoctor?.filter((item) => (item.weekDay.indexOf(dayOfWeek[dayId]) > -1));
        for (const doctorTimeSlots of timeSlotsBasedOnDoctor) {
            for (const doctorTimeSlot of doctorTimeSlots.timeSlot) {
                let generateSlots = generateTimeSlots(doctorTimeSlot.start, doctorTimeSlot.end, doctorTimeSlots.slotDuration);
                availableTimeSlots = availableTimeSlots.concat(generateSlots);
            }
        }
        if (availableTimeSlots.length > 0) {
            availableTimeSlots = availableTimeSlots.map((item) =>
                item.start + " - " + item.end
            );
        }
        availableTimeSlots = SortAndRemoveDuplicateTimeSlots(availableTimeSlots);
        setTimeSlots(availableTimeSlots);
    }
    return (
        <div className="flex flex-col gap-4 my-4 px-4">
            <ContainerHeading heading="Follow Up appointment"></ContainerHeading>

            <div className="items-center flex gap-2">
                <div
                    className={` cursor-pointer border  px-3.5 py-1.5 font-base text-sm rounded-full ${active === 1 ? "bg-[#32856E] text-white" : "bg-[#F5F5F5]"
                        }`}
                    onClick={() => handleOptionClick(1, 0)}
                >
                    None
                </div>
                <div
                    className={` cursor-pointer border  px-3.5 py-1.5 font-base text-sm rounded-full ${active === 2 ? "bg-[#32856E] text-white" : "bg-[#F5F5F5]"
                        }`}
                    onClick={() => handleOptionClick(2, 3)}
                >
                    After 3 days
                </div>
                <div
                    className={` cursor-pointer border  px-3.5 py-1.5 font-base text-sm rounded-full  ${active === 3 ? "bg-[#32856E] text-white" : "bg-[#F5F5F5]"
                        }`}
                    onClick={() => handleOptionClick(3, 7)}
                >
                    After a week
                </div>
                <div
                    className={`cursor-pointer border  px-3.5 py-1.5 font-base text-sm rounded-full  ${active === 4 ? "bg-[#32856E] text-white" : "bg-[#F5F5F5]"
                        }`}
                    onClick={() => handleOptionClick(4, 14)}
                >
                    After 2 weeks
                </div>
                <div
                    className={`cursor-pointer border  px-3.5 py-1.5 font-base text-sm rounded-full  ${active === 5 ? "bg-[#32856E] text-white" : "bg-[#F5F5F5]"
                        }`}
                    onClick={() => handleOptionClick(5, 30)}
                >
                    After a month
                </div>
                <div
                    className={` cursor-pointer border  px-3.5 py-1.5 font-base text-sm rounded-full  ${active === 6 ? "bg-[#32856E] text-white" : "bg-[#F5F5F5]"
                        }`}
                    onClick={() => {
                        setActive(6);
                        setAppointmentDate(""); // Clear the date for Custom case
                    }}
                >
                    Custom
                </div>
            </div>
            <div className={"flex flex-row w-5/6" +
                (active !== 1 ? "" : " hidden")}>
                <div className="w-1/3 pr-2 flex flex-col">
                    <label className="text-xs ">Appoinment Date</label>
                    <input
                        type="date"
                        readOnly={active !== 6}
                        placeholder="DD-MM-YYYY"
                        value={appointmentDate}
                        name="followUpDate"
                        onChange={(e) => {
                            setAppointmentDate(e.target.value)
                            if (active === 6) {
                                GetDoctorTimeSlot(undefined, e.target.value);
                            }

                        }}
                        className={DefaultTextboxClass +
                            (active !== 1 ? "" : " hidden")
                        }
                    />
                </div>
                <div className="w-1/3 pr-2 flex flex-col">
                    <label className="text-xs ">Appoinment Time Slot</label>
                    <select className={DefaultSelectboxClass} name="followUpTimeSlot" value={selectedTimeSlot} onChange={(e) =>
                        SetSelectedTimeSlot(e.target.value)
                    }>
                        <option disabled="disabled" className=" font-normal" value="0"> Select Time Slot </option>
                        {timeSlots?.map((item, i) => <option id={i} key={"timeKey_" + i} value={item}> {item}</option>)}
                        {/* {timeSlots.map((item, i) => <option id={i} key={"timeKey_"+ i} value={(item.start) + " - " + (item.end)}> {(item.start) + " - " + (item.end)}</option>)}*/}
                    </select>
                </div>
            </div>


            {/* <div className="  flex items-center gap-3 ">
                <p className="text-base font-medium py-2 me-10">Time</p>
                <div className="bg-[#F5F5F5] py-2 pe-10 text-gray-600 p-2 rounded  text-sm">
                    <input
                        type="text"
                        placeholder="00"
                        className="bg-[#F5F5F5] text-black placeholder:text-black border-none focus:outline-0 w-11   rounded  text-sm"
                        value={hour}
                        onChange={(e) => handleHourChange(e)}
                    />
                    hrs
                </div>
                <div className="bg-[#F5F5F5] py-2  pe-10 text-gray-600 p-2 rounded text-sm">
                    <input
                        type="number"
                        placeholder="00"
                        min="1"
                        max="59"
                        value={minutes}
                        onChange={(e) => handleminutesChange(e)}
                        className="bg-[#F5F5F5] placeholder:text-black border-none focus:outline-0 w-13 text-black rounded text-sm"
                    />
                    {"   "} min
                </div>
            </div> */}
            <p className="mb-3 font-italic ">
                No follow-up appointment is needed. Hope you have a speedy recovery
            </p>
        </div>
    );
};

export default FollowUp;
