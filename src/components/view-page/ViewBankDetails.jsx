import PropTypes from "prop-types";
import ContainerHeading from "components/detail-page/ContainerHeading";

function ViewBankDetails({ obj }) {
  var viewPageLabelClass = "font-medium text-BreadcrumbText";
  return (
    <div className="flex flex-col">
      <ContainerHeading heading={"BANK details"} />
      <div className="flex flex-row mt-1">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>UPI ID</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-TextSecondary pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.upiId}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>Bank</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-TextSecondary pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.bankName}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>Acc No.</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-TextSecondary pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.account}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>IFSC code</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-TextSecondary pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.ifsc}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>Account Holder</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-TextSecondary pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.accountName}
          </p>
        </div>
      </div>
      <hr className="h-px bg-gray-300 px-4 mb-4 mt-4" />
    </div>
  );
}

ViewBankDetails.propTypes = {
  obj: PropTypes.shape({
    upiId: PropTypes.string.isRequired,
    bankName: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired,
    ifsc: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewBankDetails;
