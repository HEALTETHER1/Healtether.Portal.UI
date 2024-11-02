import { format } from "date-fns";
import {useLoaderData, useNavigate} from "react-router-dom"
function ScheduleSuccessfully() {
    const nav = useNavigate();
    var {appointmentData} = useLoaderData();
    return ( <> 
    <div className="flex flex-col justify-start m-5 gap-[36px] items-start">
        
            <div className="flex   justify-center items-center">
                <div className="h-[50px] w-[50px]">
                    <span className="icon-[charm--circle-tick] text-[#52CFAC] text-6xl"></span>
                </div>
                <h7 className="text-base text-[#0C091F] mx-10 text-center font-medium ">The appointment has been scheduled successfully.</h7>
            </div>

            <div
                className="flex rounded-lg p-5 bg-[#F5F5F5] flex-col w-full justify-start items-start text-sm gap-5">
                <p className="text-[12px] font-semibold mb-2 border-b-[1px] w-fit border-[#0C091F] py-[2px]">APPOINTMENT DETAILS</p>
                <div className="flex flex-wrap justify-between w-full  space-y-3">
                
                    <div className="h-[23px] w-[496px] font-normal flex flex-row justify-start mt-[10px]">
                        <span className="text-[#198E79] font-medium text-[15px] ">Patient ID :&nbsp; </span>
                        <span className="text-[#110C2C] font-medium text-[15px] ">{appointmentData?.clinicPatientId}</span>
                    </div>
                    <div className="h-[23px] w-[496px] font-normal flex flex-row justify-start">
                        <span className="text-[#198E79] font-medium text-[15px] ">Patient name :&nbsp; </span>
                        <span className="text-[#110C2C] font-medium text-[15px] ">{appointmentData?.name}</span>
                    </div>
                    <div className="h-[23px] w-[496px] font-normal flex flex-row justify-start">                    
                            <span className=" text-[#198E79] font-medium text-[15px] ">Date : &nbsp; </span>
                            <span className="text-[#110C2C] font-medium text-[15px] ">{format(new Date(appointmentData?.appointmentDate), 'dd MMMM, yy')}</span>                
                    </div>
                    <div className="h-[23px] w-[496px] font-normal flex flex-row justify-start">                  
                            <span className="text-[#198E79] font-medium text-[15px] ">Time : &nbsp;</span>
                            <span className="text-[#110C2C] font-medium text-[15px] "> {appointmentData?.timeSlot}</span>
                    </div>
                    <div className="h-[23px] w-[496px] font-normal flex flex-row justify-start">
                            <span className=" text-[#198E79] font-medium text-[15px] ">Attending Doctor : &nbsp;</span>
                            <span className=" text-[#110C2C] font-medium text-[15px] ">{appointmentData?.doctorName}</span>
                    </div>
                    <div className="h-[23px] w-[496px] flex flex-row justify-start">                      
                            <span className=" text-[#198E79] font-medium text-[15px] ">Mode : &nbsp;</span>
                            <span className="text-[#110C2C] font-medium text-[15px] ">{appointmentData?.virtualConsultation? "Virtual":"Physical"}</span>
                    </div>
                    
                    <div className="h-[23px] w-full font-normal flex flex-row justify-start">         
                            <span className="text-[#198E79] font-medium text-[15px] ">Appointment Brief :&nbsp; </span>
                            <span className="text-[#110C2C] font-medium text-[15px] ">Routine checkup</span>
                    </div>
                    <p className="text-[13px] font-normal text-[#6D6D6D] mt-5 w-full  flex flex-row justify-start">Appointment Booked on {format(new Date(appointmentData?.created.on), 'dd MMMM, yy')}</p>
                </div>

            </div>
            <div className="flex justify-center my-5 gap-x-6 items-center">
                <button
                    type="submit"
                    className="bg-Primary  rounded-md px-6 py-3.5 text-[14px] font-normal leading-normal flex justify-center gap-1 text-white ">
                    Send on
                    <span className="icon-[mdi--whatsapp] text-xl "></span>
                </button>
                <button
                    type="reset"
                    className="bg-[#EEEEEE] text-[14px] font-medium leading-normal   text-black inline-block rounded-md px-12 py-3.5  "
                    onClick={() => {
                    nav("/scheduleappointment")
                }}>
                    Schedule Another Appointment 
                </button>
            </div>
     
    </div> 
    </>
  )
}

export default ScheduleSuccessfully