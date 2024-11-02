import PropTypes from "prop-types";

export function PatientDetailPill({ value, column, row }) {
  return (
    <div
      className="flex flex-col text-TextPrimary"
      key={row.original["_id"] + "_name"}
    >
      <div className="text-md font-medium">{row.original["name"]}</div>
      <div className="text-sm font-normal mb-px">
        {row.original["age"]} years, {row.original["gender"]}
      </div>
      <div className="flex flex-row justify-center text-sm font-base text-TextSecondary">
        <span className="icon-[ic--round-phone] bg-[#0C091F]"></span>&nbsp;+
        {row.original["mobile"]}
      </div>
    </div>
  );
}

PatientDetailPill.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object, // Assuming column can be any object, update if more details are available
  row: PropTypes.shape({
    original: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      gender: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PatientDetailPill;
