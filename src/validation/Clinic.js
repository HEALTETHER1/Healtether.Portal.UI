import {
    assert,
    object,
    optional,
    date,
    any,
    array,
} from 'superstruct'
import { isBoolean, isDate, isFile, isMobile, isNumber, nonEmptyString, optionalNonEmptyString, optionalNumber } from './utility';
import { alertBox } from 'components/dialog/prompt';
import { GenerateValidationText } from '../utils/CommonMethods';
export default function ValidateClient(data) {

const ClinicObject = object({
    ClinicName: nonEmptyString,
    AdminFirstName: nonEmptyString,
    AdminLastName: nonEmptyString,
    AdminMobile: isMobile,
    AdminEmail: nonEmptyString,
    Address: optionalNonEmptyString,
    LogoName:optionalNonEmptyString,
    PatientId_Prefix: optionalNonEmptyString,
    PatientId_Suffix: optionalNonEmptyString,
    StaffId_Prefix: optionalNonEmptyString,
    StaffId_Suffix: optionalNonEmptyString,
    Phonepe_MerchantId: optionalNonEmptyString,
    Phonepe_SaltKey: optionalNonEmptyString,
    Phonepe_SaltIndex: optionalNonEmptyString,
    TimeSlots:optionalNonEmptyString,
    StartTimeTick :optionalNonEmptyString,
    EndTimeTick : optionalNonEmptyString,
    Logo:isFile,
    ConsultationCharge:optionalNumber
   
})
try {
    assert(data,ClinicObject,"Staff is invalid..");
    return true;
}
catch(e)
{
  var error=e.failures();
  let message=GenerateValidationText(error);
  alertBox({
    show: true,
    title: 'Clinic Validation',
    proceed:undefined,
    confirmation: message
})
  return false;
}

}


export  function ValidateClientSetting(data) {

  const settingObject = object({
      PatientId_Prefix: optionalNonEmptyString,
      PatientId_Suffix: optionalNonEmptyString,
      StaffId_Prefix: optionalNonEmptyString,
      StaffId_Suffix: optionalNonEmptyString,
      Phonepe_MerchantId: optionalNonEmptyString,
      Phonepe_SaltKey: optionalNonEmptyString,
      Phonepe_SaltIndex: optionalNonEmptyString,
      TimeSlots:optionalNonEmptyString,
      StartTimeTick :optionalNonEmptyString,
      EndTimeTick : optionalNonEmptyString,
  })
  try {
      assert(data,settingObject,"Setting detail is invalid..");
      return true;
  }
  catch(e)
  {
    var error=e.failures();
    let message=GenerateValidationText(error);
    alertBox({
      show: true,
      title: 'Setting Validation',
      proceed:undefined,
      confirmation: message
  })
    return false;
  }
  
  }