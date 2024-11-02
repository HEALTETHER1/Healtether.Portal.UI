import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ContainerHeading from "components/detail-page/ContainerHeading";
import CongLogo from "assets/svg/Cong_1.svg";
import Cong2Logo from "assets/svg/Cong_2.svg";

const Paid = ({ invoice, onClickGoBack }) => {
  const navigation = useNavigate();

  return (
    <div className="mt-px text-sm flex flex-col">
      <ContainerHeading heading={"Make Payments"} />
      {/* Congratulation text */}
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="flex flex-col">
          <div className="flex flex-row text-lg items-center space-x-4">
            <img
              src={CongLogo}
              alt="Congratulation Logo"
              className="w-[40px]"
            />
            <div>Congratulations!</div>
          </div>
          <div className="flex text-TextSecondary text-xs mt-2">
            The payment has been successfully done.
          </div>
        </div>
        <div className="flex">
          <img src={Cong2Logo} alt="Congratulation Logo" className="w-[75%]" />
        </div>
      </div>

      {/* Receipt */}
      <div className="flex text-xs mt-8">
        You can send the payment receipt on the Patient’s WhatsApp in an
        instant.
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          type="button"
          onClick={() => {
            // PayByCash();
          }}
          className="bg-Primary font-normal text-white w-1/2 h-12 rounded-md shadow-md"
        >
          <span className="flex items-center justify-center">
            {" "}
            Send Receipt &nbsp;
            <span className="icon-[ic--twotone-whatsapp] text-lg"></span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            navigation("/payments");
          }}
          className="bg-white font-normal text-Primary w-1/2 h-12 rounded-md border border-Primary shadow-md"
        >
          Back To Overview
        </button>
      </div>
    </div>
  );
};

Paid.propTypes = {
  invoice: PropTypes.object.isRequired,
  onClickGoBack: PropTypes.func.isRequired,
};

export default Paid;
