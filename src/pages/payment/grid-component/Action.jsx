import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Action({ value, column, row }) {
  const navigation = useNavigate();
  const viewreceipt = (e, item) => {
    navigation("/payments/" + item.invoicedetail[0]._id + "/manage");
    e.stopPropagation();
  };

  return (
    <div
      className="space-y-2 h-full"
      key={row.original[column.idAccessor] + "_patientinfo"}
    >
      <div className="flex items-center space-x-2">
        {!row.original["paymentStatus"] ? (
          <button
            type="button"
            className="px-3 bg-Primary text-white shadow-sm border border-Primary text-center inline-block rounded-lg text-xs font-normal py-1"
            onClick={(e) => viewreceipt(e, row.original)}
          >
            Proceed
          </button>
        ) : (
          <button
            type="button"
            className="px-3 bg-TextBgPrimary text-[#D9D9D9] border border-TextBgPrimary text-center inline-block rounded-lg text-xs font-normal py-1"
          >
            Proceed
          </button>
        )}
        <div className="flex items-center space-x-2">
          <span className="icon-[ic--twotone-whatsapp] text-xl"></span>
          <span className="icon-[mingcute--bill-line] text-xl"></span>
        </div>
      </div>
    </div>
  );
}

Action.propTypes = {
  value: PropTypes.any.isRequired,
  column: PropTypes.shape({
    idAccessor: PropTypes.string.isRequired,
  }).isRequired,
  row: PropTypes.shape({
    original: PropTypes.shape({
      paymentStatus: PropTypes.bool,
      invoicedetail: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Action;
