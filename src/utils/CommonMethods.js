import store from "../store/store";
import {format} from "date-fns";

export function ParseNumberDecimal(value) {
    if (value != null && value != undefined) 
        return parseFloat(value.$numberDecimal).toFixed(2);
    
    return 0;
}
export function ParseDecimal(value) {
    if (value != null && value != undefined) 
        return parseFloat(value).toFixed(2);
    
    return 0;
}
export function CalculateAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
    }
    return age_now;
}


export function FindIndexInArrayById(myArray, searchTerm) {
    let index = -1;
    for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i]._id === searchTerm) {
            index = i;
            return index;
        }
    }
}

export function GetJSONHederWithToken() {
    const {auth, notificationKey} = store.getState();
    var header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token,
            'X-NotificationKey': notificationKey.notificationKey
        }
    };

    return header;
}
export function GetMultipartHederWithToken() {
    const {auth, notificationKey} = store.getState();
    var header = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + auth.token,
            'X-NotificationKey': notificationKey.notificationKey
        }
    };

    return header;
}

export function CalculateDiscount(amount, disc) {
    return Math.round((parseFloat(disc) * 1 / 100) * parseFloat(amount));
}

export function CalculateAmountAfterDisc(quantity, amount, discRate) {
    var qty = quantity != null
        ? parseFloat(quantity)
        : 0;
    var amt = amount != null
        ? parseFloat(amount)
        : 0;
    var disc = discRate != null
        ? parseFloat(discRate)
        : 0;

    var amtWithQuantity = Math.round(qty * amt);
    var discount = CalculateDiscount(amtWithQuantity, disc);
    return Math.round(parseFloat(amtWithQuantity) - parseFloat(discount));
}

export function AddSpaceBetweenCaps(inputString) {
    const modifiedString = inputString
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .trim();
    return modifiedString;
}
function ReplaceErrorWithText(errorText) {
    var msg = "";
    if (errorText.indexOf("NonEmptyString") > 0 || errorText.indexOf("IsNumber") > 0) {
        msg = " is not filled or invalid ";
    } else if (errorText.indexOf("IsBoolean") > 0) {
        msg = " is not selected";
    } else if (errorText.indexOf("IsDateSelected") > 0) {
        msg = " is not selected";
    }
    else if (errorText.indexOf("TimeSlotString") > 0) {
        msg = " - invalid time slot ";
    }else if(errorText.indexOf("IsDocumentNumber")>0){
        msg = " is invalid";
    }else if(errorText.indexOf("IsEmail")>0){
        msg = " is invalid"
    }
    else {
        msg = " (message) ";
    }
    return msg;
}

export function GenerateValidationText(error) {
    let message = [];
    for (let index = 0; index < error.length; index++) {
        const errorResult = error[index];
        if(AddSpaceBetweenCaps(errorResult.path[0])=="document Number"){
            message.push(errorResult.branch[0].
                documentType + ReplaceErrorWithText(errorResult.message)
                )
        }else{
            message.push(AddSpaceBetweenCaps(errorResult.path[0]) + ReplaceErrorWithText(errorResult.message));
        
            console.log(AddSpaceBetweenCaps(errorResult.path[0]) + ReplaceErrorWithText(errorResult.message))
        }
      
    }
    return message;
}
export function GetErrorMessageForStaff(desc) {
    switch (desc) {
        case "mobile-duplicate":
            return "Mobile number already with other profile in same clinic";
        case "staffId-duplicate":
            return "Staff ID already with other profile in same clinic";
        case "name-duplicate":
            return "Same name already other with other profile in same clinic";
    }
}

export const calculateTime = (inputDateStr) => {
    // Assuming the input date string is in UTC format
    const inputDate = new Date(inputDateStr);
  
    // Get current date
    const currentDate = new Date();
  
    // Set up date formats
    const timeFormat = { hour: "numeric", minute: "numeric" };
    const dateFormat = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
  
    // Check if it's today, tomorrow, or more than one day ago
    if (
      inputDate.getUTCDate() === currentDate.getUTCDate() &&
      inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
      inputDate.getUTCFullYear() === currentDate.getUTCFullYear()
    ) {
      // Today: Convert to AM/PM format
      const ampmTime = inputDate.toLocaleTimeString("en-US", timeFormat);
      return ampmTime;
    } else if (
      inputDate.getUTCDate() === currentDate.getUTCDate() - 1 &&
      inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
      inputDate.getUTCFullYear() === currentDate.getUTCFullYear()
    ) {
      // Tomorrow: Show "Yesterday"
  
      return "Yesterday";
    } else if (
      Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24)) > 1 &&
      Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24)) <= 7
    ) {
      const timeDifference = Math.floor(
        (currentDate - inputDate) / (1000 * 60 * 60 * 24)
      );
  
      const targetDate = new Date();
      targetDate.setDate(currentDate.getDate() - timeDifference);
  
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const targetDay = daysOfWeek[targetDate.getDay()];
  
      return targetDay;
    } else {
      // More than 7 days ago: Show date in DD/MM/YYYY format
      const formattedDate = inputDate.toLocaleDateString("en-GB", dateFormat);
      return formattedDate;
    }
  };

// For Appointment TimeSlots
export function generateTimeSlots(startTime, endTime, duration) {
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
                start: format(slotStart,'hh:mm a'),
                end: format(slotEnd,'hh:mm a')
            });
        }

        if(minutesToAdd===0)
            break;
    }
    return slots;
}

export function SortAndRemoveDuplicateTimeSlots(timeSlots) {
    // Step 1: Remove duplicates using a Set
    const uniqueTimeSlots = [...new Set(timeSlots)];

    // Step 2: Sort the time slots
   let result=uniqueTimeSlots.sort((a, b) => {
       // Extract the start times
       const startTimeA = parseTimeSlotsStart(a.split(" - ")[0]);
       const startTimeB = parseTimeSlotsStart(b.split(" - ")[0]);

       return startTimeA - startTimeB;
   });


    return result;
}

function parseTimeSlotsStart(timeStr) {
    let [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    // Convert 12 AM/PM to 24-hour format
    if (modifier?.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
    } else if (modifier?.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
    }

    // Return the time as the number of minutes from midnight
    return hours * 60 + minutes;
}
export const notesHandleKeyDown = (e,fieldProp, func) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default behavior (newline)
        let { selectionStart, selectionEnd } = e.target;


        if(fieldProp.trim()!=="" && fieldProp.substring(0,1)!='•')
        {
            fieldProp='• '+fieldProp;
            selectionStart=selectionStart+2;
            selectionEnd=selectionEnd+2;
        }
        // Insert a new line with a bullet point
        const newText =
        fieldProp.slice(0, selectionStart) + '\n• ' + fieldProp.slice(selectionEnd);

            func(newText);

        // Move the cursor after the new bullet point
        setTimeout(() => {
            e.target.selectionStart = selectionStart + 3;
            e.target.selectionEnd = selectionStart + 3;
        }, 0);
    }
};

export const GetRedirectUrlFromFormRequest=(request,afterText)=>{
    let urlAppointmentIndex= request.url.indexOf(afterText);
    let redirectUrl= request.url.substring(urlAppointmentIndex,request.url.length);
    return redirectUrl;
}

const documentTypeValidationRules = {
  'Aadhaar Card': {
    type: 'number',
    pattern: '[0-9]{8}',
    maxLength: 8,
  },
  'VoterID Card': {
    type: 'text',
    pattern: '[A-Z]{3}[0-9]{7}',
    maxLength: 10,
  },
  'PAN Card': {
    type: 'text',
    pattern: '[A-Z]{5}[0-9]{4}[A-Z]',
    maxLength: 10,
  },
  'Others': {
    type: 'text',
  },
};
