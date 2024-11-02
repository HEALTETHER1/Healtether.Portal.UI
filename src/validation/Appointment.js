import {
    assert,
    object,

} from 'superstruct'
import {
    isBoolean,
    isDate,
    isDateSelected,
    isNumber,
    nonEmptyString,
    optionalNonEmptyString,
} from './utility';
import {alertBox} from 'components/dialog/prompt';
import {GenerateValidationText} from '../utils/CommonMethods';
export  function ValidateAppointment(data) {

    const AppointmentObject = object({
        clinicPatientId: optionalNonEmptyString,
        patientId: optionalNonEmptyString,
        name: nonEmptyString,
        age: isNumber,
        birthDate: isDate,
        mobile: isNumber,
        gender: nonEmptyString,
        virtualConsultation: isBoolean,
        doctorId: nonEmptyString,
        doctorName: nonEmptyString,
        appointmentDate:data.instantAppointment=="true"? optionalNonEmptyString :isDateSelected,
        timeSlot:data.instantAppointment=="true"? optionalNonEmptyString : nonEmptyString,
        reason: optionalNonEmptyString
    })

    try {
        assert(data, AppointmentObject, "Appointment is invalid..");
        return true;
    } catch (e) {
        var error = e.failures();
        let message = GenerateValidationText(error);
        alertBox({show: true, title: 'Appointment Validation', proceed: undefined, confirmation: message})
        return false;
    }
}

export  function ValidateRescheduleAppointment(scheduledDate,scheduledTimeSlot) {
var data={
    appointmentDate:scheduledDate,
    timeSlot:scheduledTimeSlot
}
    const AppointmentObject = object({appointmentDate: isDateSelected, timeSlot: nonEmptyString})

    try {
        assert(data, AppointmentObject, "Appointment is invalid..");
        return true;
    } catch (e) {
        var error = e.failures();
        let message = GenerateValidationText(error);
        alertBox({show: true, title: 'Appointment Validation', proceed: undefined, confirmation: message})
        return false;
    }
}
