import {useState} from "react";
import DefaultTextboxClass from "../../utils/Classes";
import ContainerHeading from "components/detail-page/ContainerHeading";
import PropTypes from 'prop-types';

function ReSchedule({timeSlots,onSave ,selectedDate, setSelectedDate}) {
    const currentDate = new Date()
        .toISOString()
        .split('T')[0];
    const [selectedReScheduleTimeSlot,SetReScheduleTimeSlot]=useState(0);
    const [notify,setNotify]=useState(false);
    return (
        <div className="flex flex-col">

            <ContainerHeading heading={"Reschedule Appointment"}/>
            <div className="flex flex-row mt-px">
                <div className="w-1/2 pr-2">
                    <label className="text-sm ">Set date</label>
                    <input
                        type="date"
                        name="ReScheduleDate"
                        placeholder="Select Follow-up date"
                        autoComplete="off"
                        required
                        min={currentDate}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={DefaultTextboxClass + " border border-BgDisabled w-full leading-8"}/>
                </div>
                <div className="w-1/2 pr-2">
                    <label className="text-sm ">Set Time Slot</label>
                    <select
                        className={DefaultTextboxClass + " w-full leading-8"}
                        name="ReScheduletimeSlot"
                        value={selectedReScheduleTimeSlot}
                        onChange={(e) => SetReScheduleTimeSlot(e.target.value)}>
                        <option disabled="disabled" className=" font-normal" value="0">
                            Select Time Slot
                        </option>
                        {timeSlots?.map((item, i) => <option
                            id={i}
                            key={i}
                            value={item}>
                            {item}</option>)}
                    </select>
                </div>
            </div>
            <div className="mt-4 ml-1 ">
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input type="hidden" name="virtualConsultation" defaultValue={notify}/>
                <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    name="NotifyReSchedule"
                    id="NotifyReSchedule"
                    value={notify}
                    onChange={()=>{ var isOnline=notify;   setNotify(!isOnline);}}
                    />
                <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer font-normal "
                    htmlFor="NotifyReSchedule">
                    Notify patient on Whatsapp
                </label>
               
            </div>
            <label className="text-BreadcrumbText font-normal text-sm">This will automatically send a remainder to patient’s Whatsapp 20hrs ago to visit again.</label>
        </div>
        <div className="mt-3 ">
            <button type="button" className="bg-BgDisabled  border border-Primary inline-block rounded-md text-md font-normal leading-normal text-Primary  px-20 py-2" onClick={()=>onSave(selectedDate,selectedReScheduleTimeSlot)}>Done</button>
        </div>
       
        </div>
    );

}

ReSchedule.propTypes = {
    timeSlots: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSave: PropTypes.func.isRequired,
  };

export default ReSchedule