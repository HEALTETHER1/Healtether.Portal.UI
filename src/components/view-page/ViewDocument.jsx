import PropTypes from "prop-types";
import ContainerHeading from "components/detail-page/ContainerHeading";
import ViewFiles from "pages/patient/patient-detail/ViewFiles";

function ViewDocument({ obj, type = "staff" }) {
  var viewPageLabelClass = "font-medium text-BreadcrumbText";
  return (
    <div className="flex flex-col">
      <ContainerHeading heading={"Documents"} />
      <div className="flex flex-row mt-1">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>ID type</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-BreadcrumbText pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.documentType}
          </p>
        </div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-1/4 pt-2">
          <p className={viewPageLabelClass}>ID no.</p>
        </div>
        <div className="w-3/4 justify-start flex items-center">
          <div className="font-semibold text-base text-BreadcrumbText pt-2">
            :
          </div>
          <p className="ml-6 text-TextViewDetail text-md lg:w-3/4 xs:w-full pt-2">
            {obj.documentNumber}
          </p>
        </div>
      </div>

      {obj.documents != null && obj.documents.length > 0 ? (
        <ViewFiles heading={obj.documentType} files={obj.documents} />
      ) : (
        <></>
      )}
    </div>
  );
}

ViewDocument.propTypes = {
  obj: PropTypes.shape({
    documentType: PropTypes.string.isRequired,
    documentNumber: PropTypes.string.isRequired,
    documents: PropTypes.arrayOf(
      PropTypes.shape({
        fileName: PropTypes.string,
        blobName: PropTypes.string,
        fileId: PropTypes.string,
      })
    ),
  }).isRequired,
  type: PropTypes.string,
};

export default ViewDocument;
