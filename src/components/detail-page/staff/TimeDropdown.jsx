import PropTypes from "prop-types";

export const TimeDropdown = ({start,end, indexer,onStartSelect,onEndSelect,handleDeleteChange}) => {
    const times = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 30) {
            const hour = i
                .toString()
                .padStart(2, '0');
            const minute = j
                .toString()
                .padStart(2, '0');
            times.push(`${ (hour > 12
                ? (hour - 12)
                : hour)}:${minute + (hour != 0 && hour > 11
                ? " PM"
                : " AM")}`);
        }
    }

    return (

        <div className="flex flex-col w-full my-4">
            <div className='flex w-full font-normal text-sm'>
                Slot {indexer+1}
            </div>
            <div className='flex flex-row w-full gap-4 items-center justify-start'>
                <select value={start} onChange={(e)=>{onStartSelect(e.target.value)}}
                    className="p-2.5 bg-[#FAFAFA] border-none text-sm font-normal placeholder:font-normal w-1/3 shadow-sm ring-none outline-none appearance-none focus:border-none focus:outline-none focus:ring-0">

                    {times.map((time) => (
                        <option key={time}>
                            {time}
                        </option>
                    ))}

                </select>
                <select value={end}  onChange={(e)=>{onEndSelect(e.target.value) }}
                    className="p-2.5  bg-[#FAFAFA] border-none text-sm font-normal placeholder:font-normal w-1/3  shadow-sm ring-none outline-none appearance-none focus:border-none focus:outline-none focus:ring-0">

                    {times.map((time) => (
                        <option key={time}>
                            {time}
                        </option>
                    ))}

                </select>
                <span className="cursor-pointer text-2xl icon-[mdi--bin]" onClick={()=> handleDeleteChange()}></span>
            </div>
        </div>
    );
}

 TimeDropdown.propTypes = {
    start: PropTypes.string,
     end: PropTypes.string,
     indexer: PropTypes.number,
     onStartSelect:   PropTypes.func,
     onEndSelect:   PropTypes.func,
    handleDeleteChange: PropTypes.func
   }