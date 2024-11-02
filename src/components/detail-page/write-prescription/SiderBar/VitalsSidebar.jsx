import SPo2logo from "assets/svg/SpO2.svg";
import BPlogo from "assets/svg/BP.svg";
import HeartRate from "assets/svg/Heart_rate.svg";
import Height from "assets/svg/Height.svg";
import Weightlogo from "assets/svg/Weight.svg";
import BGlogo from "assets/svg/BG.svg";
import PropTypes from "prop-types";

export default function VitalsSidebar({vitalsObj})
{
    var loading=vitalsObj?.loading || false;
    return (
        <div className={(loading ? "animate-pulse" : "") + "  w-full rounded-lg gap-6  border bg-white drop-shadow-lg  p-2"}>
            <p className="text-md text-center">
                Vitals
            </p>
            <div className="flex flex-wrap flex-grow w-full  text-sm font-normal space-y-1 ">
                <div className="w-1/3 rounded-lg py-1 px-1.5">
                    <div className={(loading ? "animate-pulse" : "") + " flex flex-col rounded-lg h-full w-full bg-BgDisabled content-center gap-1 shadow-md"}>
                       {(!loading?<>
                        <p className=" text-center text-xs mt-1">
                            SpO2
                        </p>
                        <div
                            className=" w-full flex justify-center align-middle my-1 items-center">
                            <img src={SPo2logo} alt="bp_logo" height={20} width={20}/>
                        </div>

                        <p className="font-medium text-center text-md">
                            {vitalsObj?.spo2 || "N/A"}
                        </p>
                        </>:<div className="h-20 w-20"></div>)}
                    </div>
                </div>
                <div className="w-1/3 rounded-lg py-1 px-1.5">
                    <div className={(loading ? "animate-pulse" : "") + " flex flex-col rounded-lg h-full w-full bg-BgDisabled content-center gap-1 shadow-md"}>
                    {(!loading?<>
                        <p className=" text-center text-xs mt-1">
                            BP
                        </p>
                        <div
                            className=" w-full flex justify-center align-middle my-1 items-center">
                            <img src={BPlogo} alt="bp_logo" height={20} width={20}/>
                        </div>

                        <p className="font-medium text-center text-md">
                             {vitalsObj?.bloodPressure?.systolic || "N/A"}/{vitalsObj?.bloodPressure?.diastolic }
                        </p>
                        </>:<div className="h-20 w-20"></div>)}
                    </div>
                </div>
                <div className="w-1/3 rounded-lg py-1 px-1.5">
                    <div className={(loading ? "animate-pulse" : "") + " flex flex-col rounded-lg h-full w-full bg-BgDisabled content-center gap-1 shadow-md"}>
                    {(!loading?<>
                        <p className=" text-center text-xs mt-1 truncate">
                            Heart rate
                        </p>
                        <div
                            className=" w-full flex justify-center align-middle my-1 items-center">
                            <img src={HeartRate} alt="bp_logo" className="h-6" height={20} width={20}/>
                        </div>

                        <p className="font-medium text-center text-md">
                             {vitalsObj?.heartRate || "N/A"}
                        </p>
                        </>:<div className="h-20 w-20"></div>)}
                    </div>
                </div>
                <div className="w-1/3  rounded-lg py-1 px-1.5">
                    <div className={(loading ? "animate-pulse" : "") + " flex flex-col rounded-lg h-full w-full bg-BgDisabled content-center gap-1 shadow-md"}>
                    {(!loading?<>
                        <p className=" text-center text-xs mt-1">
                            Height
                        </p>
                        <div
                            className=" w-full flex justify-center align-middle my-1 items-center">
                            <img src={Height} alt="height_logo" className="h-6" height={20} width={20}/>
                        </div>

                        <p className="font-medium text-center text-md">
                             {vitalsObj?.height || "N/A"}
                        </p>
                        </>:<div className="h-20 w-20"></div>)}
                    </div>
                </div>
                <div className="w-1/3  rounded-lg py-1 px-1.5">
                    <div className={(loading ? "animate-pulse" : "") + " flex flex-col rounded-lg h-full w-full bg-BgDisabled content-center gap-1 shadow-md"}>
                    {(!loading?<>
                        <p className=" text-center text-xs mt-1">
                            Weight
                        </p>
                        <div
                            className=" w-full flex justify-center align-middle my-1 items-center">
                            <img src={Weightlogo} alt="height_logo" className="h-6" height={20} width={20}/>
                        </div>

                        <p className="font-medium text-center text-md">
                            {vitalsObj?.weight || "N/A"}
                        </p>
                        </>:<div className="h-20 w-20"></div>)}
                    </div>
                </div>
                <div className="w-1/3  rounded-lg py-1 px-1.5">
                    <div className={(loading ? "animate-pulse" : "") + " flex flex-col rounded-lg h-full w-full bg-BgDisabled content-center gap-1 shadow-md"}>
                    {(!loading?<>
                        <p className=" text-center text-xs mt-1">
                            BG
                        </p>
                        <div
                            className=" w-full flex justify-center align-middle my-1 items-center">
                            <img src={BGlogo} alt="height_logo" className="h-6" height={20} width={20}/>
                        </div>

                        <p className="font-medium text-center text-md">
                            {vitalsObj?.pulseRate || "N/A"}                        </p>
                        </>:<div className="h-20 w-20"></div>)}
                    </div>
                </div>
                <div className="w-1/3  rounded-lg py-1 px-1.5">
                    <div className={(loading ? "animate-pulse" : "") + " flex flex-col rounded-lg h-full w-full bg-BgDisabled content-center gap-1 shadow-md"}>
                    {(!loading?<>
                        <p className=" text-center text-xs mt-1">
                            T
                        </p>
                        <div
                            className=" w-full flex justify-center align-middle my-1 items-center">
                            <img src={BGlogo} alt="height_logo" className="h-6" height={20} width={20}/>
                        </div>

                        <p className="font-medium text-center text-md">
                            {vitalsObj?.temperature || "N/A"}
                        </p>
                        </>:<div className="h-20 w-20"></div>)}
                    </div>
                </div>
                <div className="w-1/3  rounded-lg py-1 px-1.5">
                    <div className={(loading ? "animate-pulse" : "") + " flex flex-col rounded-lg h-full w-full bg-BgDisabled content-center gap-1 shadow-md"}>
                    {(!loading?<>
                        <p className=" text-center text-xs mt-1">
                            RR
                        </p>
                        <div
                            className=" w-full flex justify-center align-middle my-1 items-center">
                            <img src={BPlogo} alt="height_logo" className="h-6" height={20} width={20}/>
                        </div>

                        <p className="font-medium text-center text-md">
                            {vitalsObj?.rbs  || "N/A"}
                        </p>
                        </>:<div className="h-20 w-20"></div>)}
                    </div>
                </div>
            </div>
        </div>
    )

}
VitalsSidebar.propTypes = {
        bloodPressure: PropTypes.object,
        rbs: PropTypes.number,
        spo2: PropTypes.number,
        heartRate: PropTypes.number,
        pulseRate: PropTypes.number,
        temperature: PropTypes.number,
        respiratoryRate: PropTypes.number,
        height: PropTypes.number,
        weight: PropTypes.number,
        loading:PropTypes.bool,
       // handleChange: PropTypes.func.isRequired
    
};