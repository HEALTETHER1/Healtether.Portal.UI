import PropTypes from "prop-types";
import ContainerHeading from "components/detail-page/ContainerHeading";
import { format } from "date-fns";

function ViewPersonalDetails({ obj, type = "staff" }) {
  var address = `${obj?.address?.house} ${obj?.address?.street} ${obj?.address?.landmarks} ${obj?.address?.city} ${obj?.address?.pincode}`;
  var viewPageLabelClass = "font-medium text-BreadcrumbText";
  return (
    <div className="flex flex-col">
      <ContainerHeading heading={"Personal details"} />
      <div className="flex flex-row mt-1">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>Birthday</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-BreadcrumbText pt-2">:</div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj?.birthday != null
              ? format(new Date(obj.birthday), "yyyy-MM-dd")
              : ""}
          </p>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>Age</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-BreadcrumbText pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.age}
          </p>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>Gender</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-BreadcrumbText pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.gender}
          </p>
        </div>
      </div>
      {type === "patient" && (
        <>
          <div className="flex flex-row ">
            <div className="w-1/4 pt-2">
              <p className={viewPageLabelClass}>Height</p>
            </div>
            <div className="w-3/4 justify-start flex items-center">
              <div className="font-semibold text-base text-BreadcrumbText pt-2">
                :
              </div>
              <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
                {obj.height} cm
              </p>
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="w-1/4 pt-2">
              <p className={viewPageLabelClass}>Weight</p>
            </div>
            <div className="w-3/4 justify-start flex items-center">
              <div className="font-semibold text-base text-BreadcrumbText pt-2">
                :
              </div>
              <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
                {obj.weight} kg
              </p>
            </div>
          </div>
        </>
      )}
      <hr className="h-px bg-gray-300 px-4 mb-4 mt-4"></hr>
      <ContainerHeading heading={"Contact details"} />
      <div className="flex flex-row mt-1">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>Mobile</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-BreadcrumbText pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.mobile}
          </p>
        </div>
      </div>
      {/* Uncomment if needed
            <div className="flex flex-row ">
                <div className="w-1/4 pt-2">
                    <p className="font-normal text-base text-TextSecondary">Whatsapp</p>
                </div>
                <div className="w-3/4 justify-start flex items-center">
                    <div className="font-semibold text-base text-TextSecondary pt-2">:</div>
                    <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">{obj.whatsapp}</p>
                </div>
            </div>
            */}
      <div className="flex flex-row ">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>Email</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-BreadcrumbText pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.email}
          </p>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>Address</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-BreadcrumbText pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {address}
          </p>
        </div>
      </div>
      <hr className="h-px bg-gray-300 px-4 mb-4 mt-4"></hr>
    </div>
  );
}

ViewPersonalDetails.propTypes = {
  obj: PropTypes.shape({
    birthday: PropTypes.string,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    height: PropTypes.number, // Optional, only for type "patient"
    weight: PropTypes.number, // Optional, only for type "patient"
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      house: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      landmarks: PropTypes.string,
      city: PropTypes.string.isRequired,
      pincode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  type: PropTypes.string,
};

export default ViewPersonalDetails;
