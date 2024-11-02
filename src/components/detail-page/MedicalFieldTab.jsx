import {PropTypes} from "prop-types";
import {DefaultMedicalPillClass} from "utils/Classes.js";

function MedicalFieldTab({handleOnClick, tabs, name, subHeading, isLoading,isShown,isRefresh=false,onRefresh=null}) {

    if(!isShown)
    {
        return null;
    }

    let dummyTab=[1,2,3,4,5,6];

    isLoading=true;

        return (
            <div>
                {subHeading ?
                    <p className="text-[#198E79] text-xs font-medium uppercase transition ease-in-out delay-150">
                        {subHeading}</p> :
                    <></>}

                <div
                    className={ " items-center flex gap-2 transition-all ease-in-out delay-300  duration-700"}>
                    {isRefresh?  <span
                        className={"icon-[gridicons--refresh] cursor-pointer text-2xl text-[#198E79] hover:text-gray-700"} onClick={onRefresh}> </span>:<></>}
                    {(tabs == null || tabs.length == 0) ?
                        (
                            dummyTab.map((value, i) => {
                                return (
                                    <div className="flex flex-wrap md:flex-nowrap" key={name + "_" + i}>
                                        <div
                                            key={value._id}
                                            className={(isLoading ? "animate-pulse" : "") +" cursor-progress bg-gray-200 px-2.5  py-0.5  rounded-full border"}>
                                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                                        </div>
                                    </div>)
                            })
                        )
                        : tabs?.map((value, i) => {
                            const displayValue = value[name];
                            return (
                                <div className="flex flex-wrap md:flex-nowrap capitalize" key={name + "_" + i}>
                                    <div
                                        key={value._id}
                                        onClick={() => handleOnClick(displayValue)}
                                        className={DefaultMedicalPillClass}>
                                        {displayValue}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
}

MedicalFieldTab.propTypes = {
    tabs: PropTypes.array,
    name: PropTypes.string, // Corrected: name should be a string
    handleOnClick: PropTypes.func,
    subHeading: PropTypes.string,
    isLoading: PropTypes.bool,
    isShown:PropTypes.bool,
    isRefresh:PropTypes.bool,
    onRefresh:PropTypes.func
};

export default MedicalFieldTab;
