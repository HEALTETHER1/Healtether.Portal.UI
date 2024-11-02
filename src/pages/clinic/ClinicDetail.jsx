import { useRef, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import ContainerHeading from "components/detail-page/ContainerHeading";
import DefaultTextboxClass from "utils/Classes";
import RequiredLabel from "components/detail-page/RequiredLabel";
import defaultUploadImg from "assets/images/camera.jpg";

function ClinicDetail({ clinicName, adminDetail, address, logo }) {
  const imageRef = useRef(null);
  adminDetail = adminDetail != null ? adminDetail : {};
  const blob_URL = import.meta.env.VITE_BLOB_URL + "common/client/";
  //const [dropdown, setDropdown] = useState([]);
  //let groupLoading = false;
  const [imgSrc, setImgSrc] = useState(
    logo != null && logo !== "" ? blob_URL + logo : defaultUploadImg
  );

  function profilePhotoClicked() {
    imageRef.current.click();
  }

  function profilePhotoUpdate(e) {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
    //  setprofilePic(e.target.files[0]);
  }

  return (
    <div className="">
      <ContainerHeading heading={"Clinic Details"} />

      <div className="grid grid-cols-1 space-y-3">
        <div className="border-b pb-4 flex space-x-12">
          <div>
            <label className="text-sm">Clinic Logo</label>
            <div className="flex ">
              <div className="mt-3 ">
                <img
                  className="h-[100px] w-[100px] rounded-[50%] object-cover"
                  src={imgSrc}
                  alt="Set Image"
                  onClick={profilePhotoClicked}
                />
                <input
                  className="hidden"
                  name="Logo"
                  type="file"
                  ref={imageRef}
                  accept="image/*"
                  onChange={profilePhotoUpdate}
                />
                <input type="hidden" name="LogoName" defaultValue={logo} />
              </div>
              <div className="flex text-BreadcrumbText text-sm items-center font-light pl-4">
                Click on the camera to add
                <br />
                Clinic logo.
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="space-y-1">
          <label className="text-sm">
            Clinic Name <RequiredLabel />
          </label>
          <input
            type="text"
            name="ClinicName"
            defaultValue={clinicName}
            placeholder="Clinic Name"
            autoComplete="off"
            required
            onInvalid={(e) => e.target.setCustomValidity("Please enter name")}
            className={DefaultTextboxClass + " w-full text-md"}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm">
            Admin Name <RequiredLabel />
          </label>
          <div className="flex space-x-5">
            <input
              type="text"
              name="AdminFirstName"
              placeholder="First Name"
              defaultValue={adminDetail?.firstName}
              className={DefaultTextboxClass + " w-1/2 text-md"}
            />
            <input
              type="text"
              name="AdminLastName"
              placeholder="Last Name"
              defaultValue={adminDetail?.lastName}
              className={DefaultTextboxClass + " w-1/2 text-md"}
            />
          </div>
        </div>
        <div>
          <label className="text-sm">
            Admin Mobile No. <RequiredLabel />
          </label>
          <input
            type="text"
            name="AdminMobile"
            defaultValue={adminDetail?.mobile}
            placeholder="Admin Mobile no."
            className={DefaultTextboxClass + " w-full text-md"}
          />
        </div>
        <div>
          <label className="text-sm">
            Admin E-mail <RequiredLabel />
          </label>
          <input
            type="text"
            name="AdminEmail"
            placeholder="Admin E-mail"
            defaultValue={adminDetail?.email}
            className={DefaultTextboxClass + " w-full text-md"}
          />
        </div>
        <div>
          <label className="text-sm">Address</label>
          <input
            type="text"
            name="Address"
            placeholder="Address"
            defaultValue={address}
            className={DefaultTextboxClass + " w-full text-md"}
          />
        </div>
      </div>
    </div>
  );
}

ClinicDetail.propTypes = {
  clinicName: PropTypes.string.isRequired,
  adminDetail: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mobile: PropTypes.string,
    email: PropTypes.string,
  }),
  address: PropTypes.string,
  logo: PropTypes.string,
};

export default ClinicDetail;
