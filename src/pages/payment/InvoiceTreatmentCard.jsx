import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ParseDecimal } from "../../utils/CommonMethods";
import DefaultTextboxClass from "../../utils/Classes";

function InvoiceTreatmentCard({
  itemId,
  itemNo,
  treatment,
  quantity,
  amount,
  discountRate,
}) {
  const [treatmentname, settreatmentname] = useState(treatment);
  const [treatmentquantity, settreatmentquantity] = useState(quantity);
  const [treatmentamount, settreatmentamount] = useState(
    amount?.$numberDecimal != undefined
      ? ParseDecimal(amount.$numberDecimal)
      : amount
  );
  const [discRate, setdiscRate] = useState(
    discountRate?.$numberDecimal != undefined
      ? ParseDecimal(discountRate.$numberDecimal)
      : discountRate
  );

  const treatmentRef = useRef(null);
  const quantityRef = useRef(null);
  const amountRef = useRef(null);
  const discRateRef = useRef(null);

  // function CheckTreatmentIsValid() {
  //     if (!mobileRef.current.checkValidity())
  //         mobileRef.current.reportValidity();
  // }

  var no = itemNo - 1;
  return (
    <div className="flex flex-col space-y-2 text-sm" key={"itemscart" + itemId}>
      <div className="flex items-center">
        <div className="w-1/4 ">Treatment {itemNo}</div>
        <input
          type="text"
          placeholder="Treatment"
          defaultValue={treatmentname}
          value={treatmentname}
          name={"treatment_" + no + "_treatment"}
          required
          onChange={(e) => {
            e.target.setCustomValidity("");
            settreatmentname(e.target.value);
          }}
          onInvalid={(e) =>
            e.target.setCustomValidity("Please enter a valid treatment.")
          }
          minLength="3"
          maxLength="255"
          ref={treatmentRef}
          className={DefaultTextboxClass + " w-3/4"}
        />
      </div>
      <div className="flex items-center">
        <div className="w-1/4">Quantity</div>
        <input
          type="number"
          name={"treatment_" + no + "_quantity"}
          defaultValue={treatmentquantity}
          value={treatmentquantity}
          min="1"
          className={DefaultTextboxClass + " w-3/4 text-right"}
          onChange={(e) => {
            e.target.setCustomValidity("");
            settreatmentquantity(e.target.value);
          }}
          onInvalid={(e) =>
            e.target.setCustomValidity("Please enter a valid quantity.")
          }
          required
          ref={quantityRef}
        />
      </div>
      <div className="flex items-center">
        <div className="w-1/4">Amount</div>
        <input
          type="number"
          placeholder="00.00"
          name={"treatment_" + no + "_amount"}
          defaultValue={treatmentamount}
          value={treatmentamount}
          min="1"
          onChange={(e) => {
            e.target.setCustomValidity("");
            settreatmentamount(e.target.value);
          }}
          onInvalid={(e) =>
            e.target.setCustomValidity("Please enter a valid amount.")
          }
          className={DefaultTextboxClass + " w-3/4 text-right"}
          required
          ref={amountRef}
        />
      </div>
      <div className="flex mb-2 items-center">
        <div className="w-1/4">Discount (%)</div>
        <input
          type="number"
          placeholder="00.00"
          name={"treatment_" + no + "_discRate"}
          defaultValue={discRate}
          value={discRate}
          onChange={(e) => {
            setdiscRate(e.target.value);
          }}
          className={DefaultTextboxClass + " w-3/4 text-right"}
          ref={discRateRef}
        />
      </div>
      <div className="border-b"></div>
    </div>
  );
}

InvoiceTreatmentCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemNo: PropTypes.number.isRequired,
  treatment: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  amount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      $numberDecimal: PropTypes.string,
    }),
  ]).isRequired,
  discountRate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      $numberDecimal: PropTypes.string,
    }),
  ]).isRequired,
};

InvoiceTreatmentCard.defaultProps = {
  itemId: "1",
  itemNo: 1,
  treatment: "",
  quantity: 1,
  amount: 0,
  discountRate: 0,
};

export default InvoiceTreatmentCard;
