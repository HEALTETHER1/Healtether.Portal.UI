import PropTypes from "prop-types";
import { calculateTime } from "../../utils/CommonMethods";
export default function ReceiverBubble({
  message,
  timestamp,
  indexer,
  delivered,
}) {
  return (
    <div
      className='flex flex-row w-full font-["poppins"] text-base font-normal float-left'
      key={indexer}
    >
      <div className="flex ">
        <div
          className="mt-2 shadow-xs z-10 "
          style={{
            borderTop: "0px solid transparent",
            height: "2px",
            borderRight: "18px solid rgba(246, 246, 246, 1)",
            borderBottom: "16px solid transparent",
          }}
        ></div>
        <div className="rounded-e-xl z-0 rounded-bl-xl shadow-inner  shadow-lg  bg-[#f6f6f6] mt-2 pl-4 pr-4 pt-2">
          <p className="">{message}</p>
          <div className=" float-right text-xs pb-1 pt-1 text-gray-400 ">
            <span className="">{calculateTime(timestamp)}</span>&nbsp;
            {!delivered ? (
              <span className=" icon-[ion--time-outline] float-right "></span>
            ) : (
              <span className=" icon-[charm--tick] float-right mr-2"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
ReceiverBubble.propTypes = {
  message: PropTypes.string, // from confirmable. indicates if the dialog is shown or not.
  timestamp: PropTypes.string,
  indexer: PropTypes.number,
  delivered: PropTypes.bool, // from confirmable. call to close the dialog with promise resolved.
};
