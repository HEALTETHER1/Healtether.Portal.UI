import PropTypes from "prop-types";
import Loader from "../../components/Loader/Loader";

function NotificationCard({ notificationText, isloading }) {
  return isloading ? (
    <div className="mt-2 space-y-2">
      <div className="flex justify-center mt-[12%]">
        <Loader />
      </div>
    </div>
  ) : (
    <div className="mt-2 space-y-2">
      {notificationText.map((noti) => (
        <div
          key={noti._id}
          className={`flex flex-col h-[4.5rem] w-full rounded-md bg-[#FFFFFF] border drop-shadow-sm justify-center px-4 ${
            noti.noti_time === "a moment ago" ? "bg-[#F5F5F5]" : "bg-[#FFFFFF]"
          } `}
        >
          <div className="font-semibold font-['Montserrat'] text-[#bf1f03] tracking-[0.74px] uppercase">
            {noti.header === "Payments" ? (
              <div className="text-[#876C05]">{noti.header}</div>
            ) : (
              ""
            )}
            {noti.header === "Appointment" ? (
              <div className="text-[#5351C7]">{noti.header}</div>
            ) : (
              ""
            )}
            {noti.header === "Patient Detail" ? (
              <div className="text-[#C31E0B]">{noti.header}</div>
            ) : (
              ""
            )}
            {noti.header === "Staff Detail" ? (
              <div className="text-[#C31E0B]">{noti.header}</div>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-row mt-px justify-between font-['poppins']">
            <div>
              <p className="font-normal text-[#110C2C] tracking-[0.34px]">
                <span>{noti.notificationMessage}</span>
              </p>
            </div>
            <div>
              <span className="font-bold text-[#1b181887] text-xs tracking-[0.32px] leading-[19.2px]">
                {" "}
                {new Date(noti.showTime).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

NotificationCard.propTypes = {
  notificationText: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      notificationMessage: PropTypes.string.isRequired,
      noti_time: PropTypes.string.isRequired,
      showTime: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]).isRequired,
    })
  ).isRequired,
  isloading: PropTypes.bool.isRequired,
};

export default NotificationCard;
