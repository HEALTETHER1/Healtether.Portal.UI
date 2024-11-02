import { assert, object, optional, date, any, array } from "superstruct";
import {
  isBoolean,
  isDate,
  isFile,
  isNumber,
  nonEmptyString,
  isDocumentNumber,
  isEmail,
  optionalNonEmptyString,
  optionalNumber, optionalTimeSlotString,
} from "./utility";
import { alertBox } from "components/dialog/prompt";
import { GenerateValidationText } from "../utils/CommonMethods";
export default function ValidateStaff(data) {
  const StaffObject = object({
    staffId: nonEmptyString,
    firstName: nonEmptyString,
    lastName: nonEmptyString,
    age: isNumber,
    birthday: isDate,
    mobile: isNumber,
    isAdmin: isBoolean,
    isDoctor: isBoolean,
    gender: optionalNonEmptyString,
    email: optional(isEmail),
    specialization: optionalNonEmptyString,
    address_house: optionalNonEmptyString,
    address_street: optionalNonEmptyString,
    address_landmarks: optionalNonEmptyString,
    address_city: optionalNonEmptyString,
    address_pincode: optionalNumber,
    documentType: optionalNonEmptyString,
    documentNumber:isDocumentNumber,
    bankName: optionalNonEmptyString,
    accountName: optionalNonEmptyString,
    account: optionalNonEmptyString,
    ifsc: optionalNonEmptyString,
    profilepic: isFile,
    documents: isFile,
    profileName: optionalNonEmptyString,
    documentNames: optionalNonEmptyString,
    availableTimeSlot:optionalTimeSlotString
  });

  try {
    assert(data, StaffObject, "Staff is invalid..");
    return true;
  } catch (e) {
    var error=e.failures();
    let message=GenerateValidationText(error);
    alertBox({
      show: true,
      title: 'Staff Validation',
      proceed:undefined,
      confirmation: message
  });
    return false;
  }
  //const [error,staff]=validate(data,StaffObject);
}
