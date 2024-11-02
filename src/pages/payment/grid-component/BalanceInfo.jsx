import { ParseNumberDecimal } from "../../../utils/CommonMethods";
import PropTypes from "prop-types";

function BalanceInfo({ value, column, row }) {
  return (
    <div className=" " key={row.original[column.idAccessor] + "_patientinfo"}>
      {ParseNumberDecimal(row.original["invoicedetail"][0]?.totalCost) -
        ParseNumberDecimal(row.original["invoicedetail"][0]?.paidAmount)}
    </div>
  );
}

BalanceInfo.propTypes = {
  value: PropTypes.any.isRequired,
  column: PropTypes.shape({
    idAccessor: PropTypes.string.isRequired,
  }).isRequired,
  row: PropTypes.shape({
    original: PropTypes.shape({
      invoicedetail: PropTypes.arrayOf(
        PropTypes.shape({
          totalCost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          paidAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BalanceInfo;
