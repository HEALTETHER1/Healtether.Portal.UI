import ContainerHeading from 'components/detail-page/ContainerHeading'
import {useState} from 'react';
import DefaultTextboxClass from 'utils/Classes';
import PropTypes from 'prop-types';

function ClinicSetting({patientId, staffId, times}) {
    patientId = patientId != null
        ? patientId
        : {};
    staffId = staffId != null
        ? staffId
        : {};
    const [timeSlots,
        SetTimeSlots] = useState((times != null
        ? times
        : []));
        const [stringifyTimeSlot,SetStringifyTimeSlot]=useState((times != null
            ? JSON.stringify( times)
            : ""))
    const [startHour,
        SetStartHour] = useState("");
    const [startMin,
        SetStartMin] = useState("");
    const [startTT,
        SetStartTT] = useState("AM");
    const [endHour,
        SetEndHour] = useState("");
    const [endMin,
        SetEndMin] = useState("");
    const [endTT,
        SetEndTT] = useState("AM");
    const AddTimeSlots = () => {
        let oldTimeSlot = [...timeSlots]
        oldTimeSlot.push({
            startTime: {
                hours: startHour,
                min: startMin,
                tt: startTT
            },
            endTime: {
                hours: endHour,
                min: endMin,
                tt: endTT
            }
        });
        SetTimeSlots(oldTimeSlot);
        SetStartHour("");
        SetStartMin("");
        SetStartTT("AM");
        SetEndHour("");
        SetEndMin("");
        SetEndTT("AM");
        SetStringifyTimeSlot(JSON.stringify(oldTimeSlot));

    }

    return (
        <div className=' space-y-3'>
            <ContainerHeading heading={"Patient ID"}/>
            <div className='text-TextSecondary text-sm font-normal'>Set default text to patient id prefix or suffix</div>
            <div>
                <div className='w-full flex flex-nowrap space-x-4 items-center'>
                    <input
                        type="text"
                        name="PatientId_Prefix"
                        placeholder="Prefix"
                        maxLength={10}
                        defaultValue={patientId.prefix}
                        className={DefaultTextboxClass + " w-1/2 text-md"}/>
                    <span className='fond-bold text-[20px]'>-</span>
                    <input
                        type="text"
                        name="PatientId_Suffix"
                        placeholder="Suffix"
                        defaultValue={patientId.suffix}
                        maxLength={10}
                        className={DefaultTextboxClass + " w-1/2 text-md"}/>

                </div>
            </div>

            <ContainerHeading heading={"Staff ID"}/>
            <div className='text-TextSecondary text-sm font-normal'>Set default text to staff id prefix or suffix</div>
            <div>
                <div className='w-full flex flex-nowrap space-x-4 items-center'>
                    <input
                        type="text"
                        name="StaffId_Prefix"
                        placeholder="Prefix"
                        defaultValue={staffId.prefix}
                        maxLength={10}
                        className={DefaultTextboxClass + " w-1/2 text-md"}/>
                    <span className='fond-bold text-[20px]'>-</span>
                    <input
                        type="text"
                        name="StaffId_Suffix"
                        defaultValue={staffId.suffix}
                        placeholder="Suffix"
                        maxLength={10}
                        className={DefaultTextboxClass + " w-1/2 text-md"}/>

                </div>
            </div>

            <ContainerHeading heading={"Appointment Slots"}/>
            <div className='text-TextSecondary text-sm font-normal'>Add appointment slots</div>
            <div className='uppercase text-sm text-Secondary'>Slot</div>
            <div className='space-y-1'>
                <label className="text-sm ">Start time</label>
                <div className='flex flex-nowrap space-x-4 items-center justify-between'>
                    <div className='w-3/4 flex flex-nowrap space-x-4 items-center'>
                        <input
                            type="number"
                            placeholder="hrs"
                            min={1}
                            max={12}
                            value={startHour}
                            onChange={(e) => {
                            SetStartHour(e.target.value);
                        }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Please enter name")}
                            className={DefaultTextboxClass + " w-1/2 text-md"}/>
                        <span className='fond-bold text-[20px]'>:</span>
                        <input
                            type="number"
                            placeholder="min"
                            min={0}
                            max={59}
                            value={startMin}
                         
                            onChange={(e) => {
                            SetStartMin(e.target.value);
                        }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Please enter name")}
                            className={DefaultTextboxClass + " w-1/2 text-md"}/>

                    </div>
                    <div className='w-1/4 flex flex-nowrap space-x-3'>
                        <input
                            type="radio"
                            id="StartTimeTickAM"
                            name="StartTimeTick"
                            onChange={() => {
                            SetStartTT("AM");
                        }}
                            className="hidden"/>
                        <label
                            htmlFor="StartTimeTickAM"
                            className={(startTT == "AM"
                            ? "bg-Primary text-white "
                            : "bg-TextBgPrimary text-TextPrimary ") + " lowercase p-3 rounded-md cursor-pointer"}>
                            AM
                        </label>
                        <input
                            type="radio"
                            id="StartTimeTickPM"
                            name="StartTimeTick"
                            onChange={() => {
                            SetStartTT("PM");
                        }}
                            className="hidden"/>
                        <label
                            htmlFor="StartTimeTickPM"
                            className={(startTT == "PM"
                            ? "bg-Primary text-white "
                            : "bg-TextBgPrimary text-TextPrimary ") + " lowercase p-3 rounded-md cursor-pointer"}>
                            PM
                        </label>
                    </div>
                </div>
            </div>
            <div className='space-y-1'>
                <label className="text-sm ">End time</label>
                <div className='flex flex-nowrap space-x-4 items-center justify-between'>
                    <div className='w-3/4 flex flex-nowrap space-x-4 items-center'>
                        <input
                            type="number"
                            placeholder="hrs"
                            min={1}
                            max={12}
                           
                            value={endHour}
                            onChange={(e) => {
                            SetEndHour(e.target.value);
                        }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Please enter name")}
                            className={DefaultTextboxClass + " w-1/2 text-md"}/>
                        <span className='fond-bold text-[20px]'>:</span>
                        <input
                            type="number"
                            placeholder="min"
                            min={0}
                            max={59}
                           
                            value={endMin}
                            onChange={(e) => {
                            SetEndMin(e.target.value);
                        }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Please enter name")}
                            className={DefaultTextboxClass + " w-1/2 text-md"}/>

                    </div>
                    <div className='w-1/4 flex flex-nowrap space-x-3'>
                        <input
                            type="radio"
                            id="EndTimeAM"
                            name='EndTimeTick'
                            onChange={() => {
                            SetEndTT("AM");
                        }}
                            className="hidden"/>
                        <label
                            htmlFor="EndTimeAM"
                            className={(endTT == "AM"
                            ? "bg-Primary text-white "
                            : "bg-TextBgPrimary text-TextPrimary ") + " lowercase p-3 rounded-md cursor-pointer"}>
                            AM
                        </label>
                        <input
                            type="radio"
                            id="EndTimePM"
                            name="EndTimeTick"
                            onChange={() => {
                            SetEndTT("PM");
                        }}
                            className="hidden"/>
                        <label
                            htmlFor="EndTimePM"
                            className={(endTT == "PM"
                            ? "bg-Primary text-white "
                            : "bg-TextBgPrimary text-TextPrimary ") + " lowercase p-3 rounded-md cursor-pointer"}>
                            PM
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <button
                    type="button"
                    className="text-white bg-Primary px-6 py-2 rounded-md"
                    onClick={AddTimeSlots}>Add</button>
            </div>
            <div className='flex flex-col'>
                <ContainerHeading heading={"Listed Slots"}/> {timeSlots.length > 0
                    ? <div className='grid'>
                            {timeSlots.map((slot, i) => <div
                                key={slot._id}
                                className='flex flex-nowrap items-center  bg-white p-4  text-TextBgSecondary justify-between'>
                                <div className="flex flex-nowrap items-center space-x-4">
                                    <span className="text-BreadcrumbText">SLOT -</span>
                                    <span>{slot.startTime.hours}
                                        : {slot.startTime.min}
                                        {slot.startTime.tt}</span>
                                    <span className="text-BreadcrumbText">to</span>
                                    <span>{slot.endTime.hours}
                                        : {slot.endTime.min}
                                        {slot.endTime.tt}</span>
                                </div>
                                <span
                                    className="icon-[ic--round-delete] text-xl justify-self-end cursor-pointer"
                                    onClick={() => {
                                    let time = [...timeSlots];
                                    time.splice(i, 1);
                                    SetTimeSlots(time);
                                }}></span>
                            </div>)}

                        </div>
                    : <div className='text-TextSecondary text-sm font-normal'>Slots not added</div>}
            </div>
            <input
                name="TimeSlots"
                hidden
                value={stringifyTimeSlot}
                onChange={() => {}}/>
        </div>
    )
}

ClinicSetting.propTypes = {
    patientId: PropTypes.object,
    staffId: PropTypes.object,
    times: PropTypes.arrayOf(PropTypes.object),
  };

export default ClinicSetting