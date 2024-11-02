import PropTypes from "prop-types"; // Import PropTypes
import ContainerHeading from "components/detail-page/ContainerHeading";
import DefaultTextboxClass from "utils/Classes";
import RequiredLabel from "components/detail-page/RequiredLabel";

function ClinicPaymentSetting({ phonePe, charge }) {
  phonePe = phonePe != null ? phonePe : {};

  return (
    <div className="flex flex-col space-y-4">
      <ContainerHeading heading={"Payment Settings"} />

      <div className="flex flex-nowrap space-x-4">
        <div className="flex bg-Primary px-3.5 py-2 h-fit w-fit text-white text-sm rounded-md items-center cursor-pointer">
          PhonePe
        </div>
        <div className="text-TextPrimary px-3.5 py-2 h-fit w-fit text-sm bg-white rounded-md cursor-pointer">
          Others
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm ">
          Merchant ID
          <RequiredLabel />
        </label>
        <input
          type="text"
          name="Phonepe_MerchantId"
          defaultValue={phonePe.merchantId}
          placeholder="Merchant Id"
          className={DefaultTextboxClass + " w-full text-md"}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm ">
          Salt Key
          <RequiredLabel />
        </label>
        <input
          type="text"
          name="Phonepe_SaltKey"
          placeholder="Salt key"
          defaultValue={phonePe.saltKey}
          className={DefaultTextboxClass + " w-full text-md"}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm ">
          Salt Index
          <RequiredLabel />
        </label>
        <input
          type="text"
          name="Phonepe_SaltIndex"
          placeholder="Salt Index"
          defaultValue={phonePe.saltIndex}
          className={DefaultTextboxClass + " w-full text-md"}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm ">
          Consultation Charge
          <RequiredLabel />
        </label>
        <input
          type="text"
          name="ConsultationCharge"
          placeholder="Charges"
          defaultValue={charge}
          className={DefaultTextboxClass + " w-full text-md"}
        />
      </div>
    </div>
  );
}

ClinicPaymentSetting.propTypes = {
  phonePe: PropTypes.shape({
    merchantId: PropTypes.string,
    saltKey: PropTypes.string,
    saltIndex: PropTypes.string,
  }),
  charge: PropTypes.string.isRequired,
};

export default ClinicPaymentSetting;
