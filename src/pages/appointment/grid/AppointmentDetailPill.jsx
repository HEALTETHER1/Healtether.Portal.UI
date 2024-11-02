import PropTypes from "prop-types";

export function AppointmentDetailPill({ value, column, row }) {
  return (
    <div className="flex flex-col text-TextPrimary">
      <div className="text-sm font-normal mb-px">
        <span className="icon-[lets-icons--clock-light] text-sm bg-[#0C091F]"></span>
        &nbsp;{row.original["timeSlot"]}
      </div>
      <div className="text-md font-base mb-px">
        <span className="icon-[ph--stethoscope] text-sm bg-[#0C091F]"></span>
        &nbsp;Dr.{row.original["doctorName"]}
      </div>
      {row.original["virtualConsultation"] ? (
        <div className="flex flex-row justify-center text-xs font-base text-TextSecondary">
          <span className="icon-[mdi--circle] text-xs bg-red-400"></span>
          &nbsp;Virtual Consultation
        </div>
      ) : null}
    </div>
  );
}

AppointmentDetailPill.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object.isRequired,
  row: PropTypes.shape({
    original: PropTypes.shape({
      timeSlot: PropTypes.string.isRequired,
      doctorName: PropTypes.string.isRequired,
      virtualConsultation: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export default AppointmentDetailPill;
