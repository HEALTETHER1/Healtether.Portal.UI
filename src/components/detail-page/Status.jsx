import ContainerHeading from "components/detail-page/ContainerHeading"
import { useState } from "react"
import { NextButton } from "./NextButton"

function Status({click,admin,doctor}){
const [isAdmin,setIsAdmin]=useState(admin)
const [isDoctor,setIsDoctor]=useState(doctor)
    return ( <div className='flex flex-col space-y-4'>
      <ContainerHeading heading={"Select Status"}/>
      <div>
      The status allows the members to enjoy certain privileges for the use of application.
      </div>
      <div className="flex flex-nowrap w-full space-x-2">
        <input type="hidden" name="isAdmin" value={isAdmin}/>
        <input type="hidden" name="isDoctor" value={isDoctor}/>
<button type="button" className={(isAdmin? "bg-Secondary text-white":"bg-TextBgPrimary text-TextPrimary")+ " w-1/2 py-4 rounded-md "+ (isDoctor?"cursor-not-allowed":"cursor-pointer")} disabled={isDoctor} onClick={()=>setIsAdmin(!isAdmin)}>Admin</button>
<button type="button" className={(isDoctor? "bg-Secondary text-white":"bg-TextBgPrimary text-TextPrimary")+" w-1/2 py-4 rounded-md "+ (isAdmin?"cursor-not-allowed":"cursor-pointer")} disabled={isAdmin} onClick={()=>setIsDoctor(true)}>Doctor</button>
<button type="button" className={(!isDoctor? "bg-Secondary text-white":"bg-TextBgPrimary text-TextPrimary")+" w-1/2 py-4 rounded-md cursor-pointer"} onClick={()=>setIsDoctor(false)}>Staff</button>
 
      </div>
      <NextButton click={()=>{click();}} />
    </div>)
}

export default Status