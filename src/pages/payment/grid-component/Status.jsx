import PropTypes from "prop-types";
import { classNames } from "../../../components/grid/Utils";

function Status({ value, column, row }) {
  return (
    <span
      key={row.original[column.idAccessor] + "_status"}
      className={classNames(
        "py-1 text-xs font-light border rounded-lg",
        !row.original["paymentStatus"]
          ? "bg-red-50 text-red-700 border border-red-200 px-4"
          : "bg-green-50 text-green-500 border-green-200 px-2"
      )}
    >
      {row.original["paymentStatus"] ? "Completed" : "Pending"}
    </span>
  );
}

Status.propTypes = {
  value: PropTypes.any.isRequired,
  column: PropTypes.shape({
    idAccessor: PropTypes.string.isRequired,
  }).isRequired,
  row: PropTypes.shape({
    original: PropTypes.shape({
      paymentStatus: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Status;
