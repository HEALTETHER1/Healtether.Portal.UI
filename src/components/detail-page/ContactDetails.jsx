import ContainerHeading from "components/detail-page/ContainerHeading"
import RequiredLabel from 'components/detail-page/RequiredLabel';
import DefaultTextboxClass from 'utils/Classes';
import { NextButton } from "./NextButton";
function ContactDetails({mobile,email,address, click}) {
    address=(address!=null?address:{});
    return (
        <div className="flex flex-col space-y-3">
            <ContainerHeading heading={"Contact details"}/>

            <div className="flex space-x-2">
                <div className='w-1/2 space-y-1'>
                    <label className="text-sm ">Mobile no.
                        <RequiredLabel/></label>
                    <input
                        type="number"
                        pattern="[7-9]{1}[0-9]{9}"
                        name="mobile"
                        placeholder="Mobile no."
                        autoComplete="off"
                        maxLength={10}
                        onKeyDown={(e) => {
                            if (e.key === 'e' || e.key === '-' || e.key === '+') {
                                e.preventDefault();
                            }
                        }}
                        defaultValue={mobile}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
                <div className='w-1/2 space-y-1'>
                    <label className="text-sm ">Email
                       </label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        defaultValue={email}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
            </div>
            <ContainerHeading heading={"Address"}/>
            <div className="flex flex-col">
                <div className='w-full space-y-1'>
                    <label className="text-sm ">House/Building/Room no.
                    </label>
                    <input
                        type="text"
                        name="address_house"
                        placeholder="House/Building/Room no."
                        autoComplete="off"
                        defaultValue={address.house}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>

                <div className='w-full space-y-1'>
                    <label className="text-sm ">Street/Area
                    </label>
                    <input
                        type="text"
                        name="address_street"
                        placeholder="Street/Area"
                        autoComplete="off"
                        defaultValue={address.street}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>

                <div className='w-full space-y-1'>
                    <label className="text-sm ">Landmarks
                    </label>
                    <input
                        type="text"
                        name="address_landmarks"
                        placeholder="Landmarks"
                        autoComplete="off"
                        defaultValue={address.landmarks}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
                <div className='w-full space-y-1'>
                    <label className="text-sm ">City
                    </label>
                    <input
                        type="text"
                        name="address_city"
                        placeholder="City"
                        autoComplete="off"
                        defaultValue={address.city}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
                <div className='w-full space-y-1'>
                    <label className="text-sm ">Pincode
                    </label>
                    <input
                        type="text"
                        name="address_pincode"
                        placeholder="Pincode"
                        autoComplete="off"
                        defaultValue={address.pincode}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
            </div>
            <NextButton click={()=>{click();}} />
        </div>
    )
}

export default ContactDetails