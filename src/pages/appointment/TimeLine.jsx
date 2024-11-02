import PropTypes from "prop-types";
import ContainerHeading from "components/detail-page/ContainerHeading";
import { format } from "date-fns";

const TimeLine = ({ appointments }) => {
  function BuildText(appointment) {
    var comment =
      (appointment?.isFollowUp ? "FollowUp" : "") +
      " Appointment of " +
      format(new Date(appointment.appointmentDate), "dd MMMM, yyyy") +
      " at " +
      appointment.timeSlot +
      " (Dr." +
      appointment.doctorName +
      ")";
    if (appointment?.ended?.yes) {
      comment +=
        " has been ended at " +
        format(new Date(appointment?.ended?.on), "hh : mm aaaaa'm'");
    } else if (appointment?.isCanceled) {
      comment += " has been cancelled";
    } else if (
      appointment?.rescheduled?.previousTimeSlot != null &&
      appointment?.rescheduled?.previousTimeSlot != ""
    ) {
      comment +=
        " was reschedule from " +
        format(
          new Date(appointment?.rescheduled?.previousDate),
          "dd MMMM, yyyy"
        );
    } else if (appointment?.started?.yes) {
      comment += " has been started";
    } else if (appointment?.started == null) {
      comment += " is not attended";
    }
    return comment;
  }

  return (
    <div className="flex flex-col ">
      <ContainerHeading heading={"timeline"} />
      <ul className="list-disc list-inside text-Secondary text-lg space-y-4 mt-2">
        {appointments.map((item) => {
          return (
            <li key={item._id}>
              <label>
                {format(new Date(item.appointmentDate), "dd MMMM, yyyy")}
              </label>
              <div className="text-BreadcrumbText font-normal text-md pl-6">
                {BuildText(item)}.
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TimeLine.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      appointmentDate: PropTypes.string.isRequired,
      timeSlot: PropTypes.string.isRequired,
      doctorName: PropTypes.string.isRequired,
      isFollowUp: PropTypes.bool,
      ended: PropTypes.shape({
        yes: PropTypes.bool,
        on: PropTypes.string,
      }),
      isCanceled: PropTypes.bool,
      rescheduled: PropTypes.shape({
        previousTimeSlot: PropTypes.string,
        previousDate: PropTypes.string,
      }),
      started: PropTypes.shape({
        yes: PropTypes.bool,
      }),
    })
  ).isRequired,
};

export default TimeLine;
