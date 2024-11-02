import { useState } from "react";
import AccordionItem from "../../dialog/accordion";
import { TimeDropdown } from "./TimeDropdown";
import { NextButton } from "../NextButton";
import PropTypes from "prop-types";

export default function AvailableTimeSlot({savedTimeSlot,click}) {
  //const [slot, setSlot] = useState([{ start_time: "", end_time: "" }]);
 let previousWeekDayJson=[];
  let defaultWeekDayJson={
    key: Date.now().toString(),
    timeSlot: [{
      _id:Date.now().toString(),
      start: "",
      end: ""
    }],
    slotDuration: "0",
    weekDay: [""]
  };

  if(savedTimeSlot)
  {

    for (const savedSlot of savedTimeSlot) {
      previousWeekDayJson.push({
        key: savedSlot._id,
        timeSlot: savedSlot.timeSlot,
        slotDuration: savedSlot.slotDuration,
        weekDay: savedSlot.weekDay,
      });
    }
  }

  const [weekDaysSlot, SetWeekDaysSlot] = useState(previousWeekDayJson.length>0?[...previousWeekDayJson]:[defaultWeekDayJson]);

  const SetSlotDuration = (key, duration) => {
    var weekSlot = [...weekDaysSlot];
    var index = FindWeekDaySlotIndex(weekSlot, key);
    if (index > -1) {
      weekSlot[index].slotDuration = duration;
      SetWeekDaysSlot(weekSlot);
    }

  }
  const SetWeekDays = (key, weekDaySelected) => {
    var weekSlot = [...weekDaysSlot];
    var index = FindWeekDaySlotIndex(weekSlot, key);
    if (index > -1) {
      weekSlot[index].weekDay = weekDaySelected;
      SetWeekDaysSlot(weekSlot);
    }

  }

  const SetTiming=(key, timingSelected)=>{
    var weekSlot = [...weekDaysSlot];
    var index = FindWeekDaySlotIndex(weekSlot, key);
    if (index > -1) {
      weekSlot[index].timeSlot = timingSelected;
      SetWeekDaysSlot(weekSlot);
    }
  }

  const OnDelete = (key) => {
    var weekSlot = [...weekDaysSlot];
    var index = FindWeekDaySlotIndex(weekSlot, key);
    if (index > -1) {
      weekSlot.splice(index, 1);

      if (weekSlot.length == 0) {
        var weekDayJson=defaultWeekDayJson;
        weekDayJson.key=Date.now().toString();
        weekSlot.push(weekDayJson);
      }
      SetWeekDaysSlot(weekSlot);
    }

  }

  const FindWeekDaySlotIndex = (array, key) => {
    var index = -1
    array.filter((value, i) => {
      if (value.key == key) {
        index = i;
        return true;
      }
    });
    return index;
  }
  const AddAnotherDays=()=>{
    var weekSlot = [...weekDaysSlot]; 
    var newWeekDay=defaultWeekDayJson; 
    newWeekDay.key= Date.now().toString();
     weekSlot.push(newWeekDay);
      SetWeekDaysSlot(weekSlot); 
  }

  return (
    <>
      <div className=" flex flex-col  justify-center space-y-3">
        {weekDaysSlot.map((item,weekIndex) =>
          <WeekDayWithTimeSlot key={"WeekDayTimeSlot_"+item.key+"_"+weekIndex} indexer={item.key}
                               selectedWeekDay={item.weekDay}
                               slotDuration={item.slotDuration}
                               timeSlot={item.timeSlot}
                               onDelete={() => OnDelete(item.key)}
                               setWeekDaysSelected={(weekDay)=>SetWeekDays(item.key,weekDay)}
                               setSlotDuration={(duration) => SetSlotDuration(item.key, duration)}
                               setTiming={(selectedTiming)=>SetTiming(item.key,selectedTiming)} />
        )}

        <div onClick={() => {AddAnotherDays()}} className="w-full text-start px-3 mt-2 text-[#5351C7] text-[13px] cursor-pointer" >Add other slots</div>

        <NextButton click={()=>{click();}} />
      </div>
   
      <input type="hidden" name="availableTimeSlot" value={JSON.stringify(weekDaysSlot)}/>
    </>
  )
}

AvailableTimeSlot.propTypes={
  savedTimeSlot:PropTypes.array,
  click:PropTypes.func
}


function WeekDayWithTimeSlot({indexer, selectedWeekDay, timeSlot, slotDuration, onDelete, setSlotDuration, setWeekDaysSelected,setTiming}) {
  const [weekDays, SetWeekDays] = useState([{
    "id": "Sun",
    "title": "Sunday",
    "isSelected": selectedWeekDay?.indexOf("Sun")>-1
  }, {
    "id": "Mon",
    "title": "Monday",
    "isSelected":  selectedWeekDay?.indexOf("Mon")>-1
  },
  {
    "id": "Tue",
    "title": "Tuesday",
    "isSelected": selectedWeekDay?.indexOf("Tue")>-1
  }, {
    "id": "Wed",
    "title": "Wednesday",
    "isSelected": selectedWeekDay?.indexOf("Wed")>-1
  }, {
    "id": "Thu",
    "title": "Thursday",
    "isSelected": selectedWeekDay?.indexOf("Thu")>-1
  }, {
    "id": "Fri",
    "title": "Friday",
    "isSelected": selectedWeekDay?.indexOf("Fri")>-1
  }, {
    "id": "Sat",
    "title": "Saturday",
    "isSelected": selectedWeekDay?.indexOf("Sat")>-1
  },
  ]);
  const [title, SetTitle] = useState("For");
  const [timeSlotFields, SetTimeSlotFields] = useState(timeSlot);
  //const [timeSlotInterval, SetTimeSlotInterval] = useState(slotDuration);
  
  const AddAnotherTimeSlot=()=>{
    var timeSlotField = [...timeSlotFields]; 
    var newTimeSlot={
      _id:Date.now().toString(),
      start:"",
      end:""
    }; 
    timeSlotField.push(newTimeSlot);
      SetTimeSlotFields(timeSlotField); 
  }

  const WeekDaysClick = (day, index) => {
    SetTitle(x => {
      if (!(x?.indexOf(day.title) > 0)) {
        return x + " " + day.title;
      }
      else {
        var title = x;
        return title.replace(" " + day.title, "")
      }
    }
    );

    var week = [...weekDays];
    week[index].isSelected = !week[index].isSelected;
    SetWeekDays(week)
    selectedWeekDay = [];
    for (let index = 0; index < week.length; index++) {
      const value = week[index];
      value.isSelected && selectedWeekDay.push(value.id);
    }
    setWeekDaysSelected(selectedWeekDay);
  }
  const SelectStartTime=(key,startTime)=>{
    var timeSlotField = [...timeSlotFields];
    var index = FindTimeSlotIndex(timeSlotField, key);
    if (index > -1) {
      timeSlotField[index].start = startTime;
      SetTimeSlotFields(timeSlotField);
      setTiming(timeSlotField);
    }
  }
  const SelectEndTime=(key,endTime)=>{
    var timeSlotField = [...timeSlotFields];
    var index = FindTimeSlotIndex(timeSlotField, key);
    if (index > -1) {
      timeSlotField[index].end = endTime;
      SetTimeSlotFields(timeSlotField);
      setTiming(timeSlotField);
    }
  }
  const RemoveTimeSlot=(key)=>{
    var timeSlotField = [...timeSlotFields];
    var index = FindTimeSlotIndex(timeSlotField, key);
    if (index > -1) {
      timeSlotField.splice(index, 1);

      if (timeSlotField.length == 0) {
        timeSlotField.push({ key: timeSlotField.length })
      }
      SetTimeSlotFields(timeSlotField);
      setTiming(timeSlotField);
    }
}
  const FindTimeSlotIndex = (array, key) => {
    var index = -1
    array.filter((value, i) => {
      if (value._id == key) {
        index = i;
        return true;
      }
    });
    return index;
  }

  return (
    <div className="font-normal">
      
      <AccordionItem title={title}>
        <div className="flex flex-row justify-center ">
          <div className="flex flex-row item-center bg-[#FBFAFC] border py-3 rounded-full shadow-inner justify-between px-6 mt-3 w-5/6 ">
            {weekDays.map((day, index) => {
              return (
                <div key={"weekdays"+index} onClick={() => WeekDaysClick(day, index)} className={"h-[40px] w-[45px] rounded-full items-center flex justify-center text-sm cursor-pointer font-normal shadow-inner " + (day.isSelected ? "bg-[#198E79] text-[#EEFAF7]" : " bg-white border")}>
                  {day.id}
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col mx-12">
          {timeSlotFields.map((value,timeSlotFieldIndex)=> (<TimeDropdown key={"TimeDropdown_"+indexer+"_"+timeSlotFieldIndex} indexer={timeSlotFieldIndex} start={value.start} end={value.end} onStartSelect={(time)=>SelectStartTime(value._id,time)} onEndSelect={(time)=>SelectEndTime(value._id,time)} handleDeleteChange={()=>RemoveTimeSlot(value._id)} />))}
          <div onClick={() => {AddAnotherTimeSlot()}} className="w-full text-end  text-[#5351C7] text-[13px] cursor-pointer" >Add slots</div>

          <div className="p-2" >
            <div className="font-normal text-sm"> Appointment Duration</div>
            <div className=" w-5/6  flex mt-2 gap-7 items-center">

              <input
                type="number"
                placeholder="Time" min={1} max={60}
                className="bg-[#FAFAFA] w-full p-4 appearance-none gap-4 text-sm font-normal focus:ring-0 placeholder:font-normal border-none"
                value={slotDuration}
                onChange={(e) =>{ setSlotDuration(e.target.value);
                  //SetTimeSlotInterval(e.target.value);
                } }
              />
              <span className="cursor-pointer text-sm me-2 " >minutes</span>
            </div>
          </div>
          <div className="flex flex-row item-center justify-between mt-4 text-sm font-normal">
            <div className=" border rounded-lg shadow  px-6 py-2.5 cursor-pointer" onClick={() => onDelete()}>Delete</div>
            <div className="">
              <TimeSlotPreview key={indexer} timeSlotSelected={timeSlotFields} duration={slotDuration}>
                <div className=" border rounded-lg shadow px-6 py-2.5 cursor-pointer">Preview</div>
              </TimeSlotPreview>
            </div>


          </div>

        </div>
      </AccordionItem>

    </div>


  );
}

WeekDayWithTimeSlot.propTypes={
  indexer:PropTypes.string,
  selectedWeekDay:PropTypes.array,
  timeSlot:PropTypes.array,
  slotDuration:PropTypes.string,
  onDelete:PropTypes.func,
  setSlotDuration:PropTypes.func,
  setWeekDaysSelected:PropTypes.func,
  setTiming:PropTypes.func,
}

const TimeSlotPreview = ({ children,timeSlotSelected,duration }) => {

  var timeSlotPreviewDetails=[];

  for (let timeSelected of timeSlotSelected) {
    if(timeSelected.start && timeSelected.end && duration)
    {
      var timing=generateTimeSlots(timeSelected.start,timeSelected.end,duration);
      timeSlotPreviewDetails.push(timing);
    }
  }

  function generateTimeSlots(startTime, endTime, duration) {
    let slots = [];
    let current = new Date("2024/04/01 "+startTime);
    let end = new Date("2024/04/01 "+endTime);
    let minutesToAdd=parseInt(duration)<0? 0:parseInt(duration);
    while (current < end) {
      let slotStart = new Date(current);

      current.setMinutes((current.getMinutes() + minutesToAdd));
      let slotEnd =minutesToAdd!==0? new Date(current) :end;

      if (slotEnd <= end) {
        slots.push({
          start: slotStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
          end: slotEnd.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        });
      }

      if(minutesToAdd===0)
        break;
    }
    return slots;
  }

  return (
      <div className="relative flex items-center">
        <div className="relative peer">
          {children}
        </div>
        { (
            <div className="absolute hidden peer-hover:flex focus:flex hover:flex bg-white  right-0 bottom-full mb-2 w-max  px-3 py-3 text-xs border border-gray-300  rounded-lg shadow-lg">
              <div className="max-w-[390px] max-h-[200px] overflow-auto ">
                {timeSlotPreviewDetails.map((item,i)=>
                    ( <div key={"preview"+i} >Slot {i+1}
                        <div className=" flex flex-wrap mb-2 gap-2 " key={"previewSlot_"+i}>
                      {item.map((slot,index)=>( <div key={"slot_"+index}
                        className="rounded-md border border-gray-400 text-xs h-fit w-fit px-[3px] pt-[2px]">
                        {slot.start} - {slot.end}
                    </div>))}
                        </div></div>)
                )}
              </div>
            </div>
        )}
      </div>
  );
};
