import PropTypes from "prop-types";

function PatientInfo({ value, column, row }) {
  return (
    <div className="p-0" key={row.original[column.idAccessor] + "_patientinfo"}>
      <div className="text-TextPrimary font-medium text-center capitalize w-full">
        {row.original["name"]}
      </div>
      <div className="text-BreadcrumbText text-xs w-full">
        {row.original["mobile"]}
      </div>
      {/* <div className="text-start mt-4"><span className="text-[#AAAAAA]">Last Visited : </span>{row.original['lastVisited']}</div> */}
    </div>
  );
}

PatientInfo.propTypes = {
  value: PropTypes.any.isRequired,
  column: PropTypes.shape({
    idAccessor: PropTypes.string.isRequired,
  }).isRequired,
  row: PropTypes.shape({
    original: PropTypes.shape({
      name: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
      lastVisited: PropTypes.string, // Uncomment this if you want to include lastVisited
    }).isRequired,
  }).isRequired,
};

export default PatientInfo;
