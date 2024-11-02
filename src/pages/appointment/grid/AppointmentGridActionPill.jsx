import PropTypes from "prop-types";
import { useState } from "react";
import Spinner from "../../../components/loader/Spinner";

export function AppointmentGridActionPill({ value, column, row }) {
  const [loader,SetLoader]=useState(false);
  return (
    <div
      className={
        `h-[70px] w-[70px] items-center flex flex-col justify-center align-middle cursor-pointer z-10 ${column.iconBorderedAccessor
          ? "pr-6 border-r border-TextSecondary"
          : ""}`
      }
      onClick={(e) =>{  e.stopPropagation();
         column.callBackAccessor(e, row.original,SetLoader);}}
    >
      <div className="bg-[#F5F5F5] h-[40px] w-[40px] items-center flex justify-center align-middle rounded-[7px] mb-2">
        {!loader?<span
          className={
            `${column.iconClassAccessor} h-[24px] w-[24px] text-[#413D56]`
          }
        ></span>:<Spinner show={true}/>}
      </div>
      <p className="text-TextSecondary text-xs text-center font-normal text-wrap whitespace-pre-wrap">
        {column.iconNameAccessor}
      </p>
    </div>
  );
}

AppointmentGridActionPill.propTypes = {
  value: PropTypes.any,
  column: PropTypes.shape({
    iconBorderedAccessor: PropTypes.bool,
    callBackAccessor: PropTypes.func.isRequired,
    iconClassAccessor: PropTypes.string.isRequired,
    iconNameAccessor: PropTypes.string.isRequired,
  }).isRequired,
  row: PropTypes.shape({
    original: PropTypes.object.isRequired,
  }).isRequired,
};

export default AppointmentGridActionPill;
