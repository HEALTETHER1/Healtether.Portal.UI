import {
    assert,
    object,
    optional,
    date,
    any,
    array,
} from 'superstruct'
import { isBoolean, isDate, isFile, isMobile, isNumber, nonEmptyString, optionalNonEmptyString,isDocumentNumber,isEmail, optionalNumber } from './utility';
import { alertBox } from 'components/dialog/prompt';
import { GenerateValidationText } from '../utils/CommonMethods';
export default function ValidatePatient(data) {
    //const Email = pattern(string(), /\d+(\.\d+/)?/ );
    //
   
    const PatientObject = object({
        patientId: nonEmptyString,
        firstName: nonEmptyString,
        lastName: nonEmptyString,
        age: isNumber,
        birthday: isDate,
        mobile: isMobile,
        height:optionalNumber,
        weight:optionalNumber,
        gender: optionalNonEmptyString,
        email: optional(isEmail),
        address_house: optionalNonEmptyString,
        address_street: optionalNonEmptyString,
        address_landmarks: optionalNonEmptyString,
        address_city: optionalNonEmptyString,
        address_pincode: optionalNumber,
        documentType:optionalNonEmptyString,
        documentNumber:optional(isDocumentNumber),
        documents:isFile,
        documentNames:optionalNonEmptyString
    })

    try {
        assert(data,PatientObject,"Patient is invalid..");
        return true;
    }
    catch(e)
    {
      var error=e.failures();
      let message=GenerateValidationText(error);
      alertBox({
        show: true,
        title: 'Patient Validation',
        proceed:undefined,
        confirmation: message
    });
      return false;
    }
   //const [error,staff]=validate(data,StaffObject);
   
}