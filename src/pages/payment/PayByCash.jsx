import ContainerHeading from "components/detail-page/ContainerHeading";
import { useNavigate } from "react-router-dom";
import DefaultTextboxClass from "utils/Classes";
import store from "../../store/store";
import { SetCashPayment } from "../../services/payment/payment";
import { useState } from "react";
import PropTypes from "prop-types";

const PayByCash = ({ invoice, onClickGoBack, afterMakePayment }) => {
  const [amountReceived, SetAmountReceived] = useState(0);
  const navigation = useNavigate();

  async function MakeCashPayment() {
    var id = invoice._id;
    const { currentClinic } = store.getState();
    var result = await SetCashPayment({
      invoiceId: id,
      clientId: currentClinic?.clinic?._id,
      amount: amountReceived,
    });
    if (result.status === 200) {
      afterMakePayment();
      return navigation(`/payments/` + result.data._id + `/manage`);
    }
    return true;
  }

  return (
    <div className="mt-px text-sm flex flex-col">
      <ContainerHeading heading={"Make Payments"} />
      <div className="flex ">Pay by cash</div>
      <div className="flex  text-TextSecondary text-xs mt-2">
        Enter the Amount to be received by cash.
      </div>
      <div className="flex items-center mt-4">
        <div className="w-2/4 ">Amount Received</div>
        <input
          type="number"
          name="amount"
          placeholder="0.0 INR"
          required
          value={amountReceived}
          onChange={(e) => {
            e.target.setCustomValidity("");
            SetAmountReceived(e.target.value);
          }}
          onInvalid={(e) =>
            e.target.setCustomValidity("Please enter a valid amount.")
          }
          minLength="3"
          maxLength="255"
          className={DefaultTextboxClass + " w-3/4 text-right"}
        />
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          type="button"
          onClick={() => {
            MakeCashPayment();
          }}
          className="bg-Primary text-white font-medium w-1/2 h-12 rounded-md shadow-md"
        >
          Pay
        </button>
        <button
          type="button"
          className="bg-text text-Primary border-Primary border font-medium w-1/2 h-12 rounded-md shadow-md"
          onClick={() => {
            onClickGoBack();
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

PayByCash.propTypes = {
  invoice: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    // Define other properties of the invoice object as needed
  }).isRequired,
  onClickGoBack: PropTypes.func.isRequired,
  afterMakePayment: PropTypes.func.isRequired,
};

export default PayByCash;
