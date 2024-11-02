import { parse } from "date-fns";
import { define } from "superstruct";

export const nonEmptyString = define('NonEmptyString',(value)=> !!value && value.trim().length>0 && value.length<500);
export const isBoolean=define("IsBoolean",(value)=> value==="true"|| value==="false" );
export const isNumber=define("IsNumber",(value)=> value!="" && value!=undefined && parseInt(value)>0 );
export const isMobile=define("IsNumber",(value)=> value!="" && value!=undefined && parseInt(value)>0 && value.length==10 );
export const optionalNonEmptyString=define('OptionalNonEmptyString',(value)=>{ 
    if(value=="" || value==undefined)
    return true;
    else
    return !!value && value.trim().length>0 && value.length<500
});
export const optionalNumber=define('OptionalNumber',(value)=>{ 
    if(value=="" || value==undefined)
    return true;
    else
    return value!="" && value!=undefined && parseInt(value)>0
});
export const isDate=define('IsDate',(value)=>{ 
    if(value=="" || value==undefined)
    return true;
    else
    return value!="" && value!=undefined //&& parse(value)!=null
})

export const isDateSelected=define('IsDateSelected',(value)=>{ 
    return value!="" && value!=undefined //&& parse(value)!=null
})

export const isFile=define('IsFile',(value)=>{
   
    return Array.isArray(value)|| value instanceof File ;
})

export const optionalTimeSlotString=define('OptionalTimeSlotString',(value)=> {
    if (value == "" || value == undefined)
        return true;
    else
    {
        let timeSlotJson=JSON.parse(value);
        for (const timeSlot of timeSlotJson) {
            if(timeSlot.weekDay.length>0 && timeSlot.weekDay[0] !="") {

                if (!timeSlot.slotDuration || !(timeSlot.slotDuration >= 0 && timeSlot.slotDuration <= 60))
                    return false;

                for (const time of timeSlot.timeSlot) {
                    if(time.start!="" && time.end!="")
                    {
                       let startTime= new Date(`2024/04/01 ${time.start}`);
                       let endTime= new Date(`2024/04/01 ${time.end}`);
                       if(!(startTime<endTime))
                       {
                           return false;
                       }
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        return true;
    }
       // return !!value && value.trim().length>0 && value.length<500
});

export const isDocumentNumber = define('IsDocumentNumber', (value, data) => {
    console.log("document value",value,data?.branch[0].documentType);
    if (data?.branch[0].documentType === 'Aadhaar Card') {
      return value.match(/^[0-9]{12}$/) !== null;
    } else if (data?.branch[0].documentType === 'VoterID Card') {
      return value.match(/^[A-Z]{3}[0-9]{7}$/) !== null;
    } else if (data?.branch[0].documentType === 'PAN Card') {
      return value.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/) !== null;
    } else {
      return true; // default validation for unknown document types
    }
  });
  export const isEmail=define('IsEmail',(value)=>{
    if (value === "" || value === undefined) return true;
    else{
        return value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)!=null;
    }
})



