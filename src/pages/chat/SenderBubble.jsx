import PropTypes from "prop-types";
import { calculateTime } from "../../utils/CommonMethods";
export default function SenderBubble({
  message,
  timestamp,
  indexer,
  delivered,
}) {
  return (
    <div
      className='flex flex-row-reverse w-full font-["poppins"]  text-base font-normal float-right'
      key={indexer}
    >
      <div className="flex ">
        <div className="rounded-s-xl rounded-br-xl shadow-inner  shadow-lg z-0  shadow-lg bg-[#E5F4D2] mt-2 pl-4 pr-4 pt-2">
          <p className="">{message}</p>
          <div className=" float-right text-xs pb-1 pt-2 text-gray-400">
            <span className="">{calculateTime(timestamp)}</span>&nbsp;{" "}
            {!delivered ? (
              <span className=" icon-[ion--time-outline] float-right "></span>
            ) : (
              <span className=" icon-[charm--tick] float-right mr-2"></span>
            )}
          </div>
        </div>
        <div
          style={{
            borderTop: "0px solid transparent",
            height: "2px",
            borderLeft: "18px solid rgba(229, 244, 210, 1)",
            borderBottom: "16px solid transparent",
          }}
          className="mt-2 shadow-xs z-10"
        ></div>
      </div>
    </div>
  );
}

SenderBubble.propTypes = {
  message: PropTypes.string, // from confirmable. indicates if the dialog is shown or not.
  timestamp: PropTypes.string,
  indexer: PropTypes.number,
  delivered: PropTypes.bool, // from confirmable. call to close the dialog with promise resolved.
};
