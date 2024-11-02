import ContainerHeading from "components/detail-page/ContainerHeading"
import RequiredLabel from 'components/detail-page/RequiredLabel';
import DefaultTextboxClass from 'utils/Classes';
import { NextButton } from "./NextButton";
function BankDetails({bankName,account,ifsc,accountName, click}) {
    return (
        <div className="flex flex-col space-y-2 ">
            <ContainerHeading heading={"Bank details"}/>
            <div className="flex flex-col space-y-2">
                <div className='w-full space-y-1'>
                    <label className="text-sm ">Bank name
                    </label>
                    <input
                        type="text"
                        name="bankName"
                        placeholder="Bank name"
                        autoComplete="off"
                        defaultValue={bankName}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
                <div className='w-full space-y-1'>
                    <label className="text-sm ">Account no.
                    </label>
                    <input
                        type="text"
                        name="account"
                        defaultValue={account}
                        placeholder="Account no."
                        autoComplete="off"
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
                <div className='w-full space-y-1'>
                    <label className="text-sm ">IFSC.
                    </label>
                    <input
                        type="text"
                        name="ifsc"
                        placeholder="IFSC"
                        autoComplete="off"
                        defaultValue={ifsc}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
                <div className='w-full space-y-1'>
                    <label className="text-sm ">Account holder's name
                    </label>
                    <input
                        type="text"
                        name="accountName"
                        placeholder="Account holder's name"
                        autoComplete="off"
                        defaultValue={accountName}
                        className={DefaultTextboxClass + " w-full text-md"}/>
                </div>
            </div>
            <NextButton click={()=>{click();}} />
        </div>
    )
}

export default BankDetails