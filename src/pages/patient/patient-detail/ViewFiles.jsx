import PropTypes from "prop-types";
import ContainerHeading from "components/detail-page/ContainerHeading";
import { useSelector } from "react-redux";

function ViewFiles({ files, heading, type = "patient" }) {
  const records = [];
  const { clinic } = useSelector((state) => state.currentClinic);
  const blob_URL = `${import.meta.env.VITE_BLOB_URL}clinic${
    clinic._id
  }/${type}/`;

  for (let index = 0; index < files?.length; index++) {
    const element = (
      <div
        className="flex justify-between pt-2 items-center border-b-2"
        key={index}
      >
        <p className="text-medium text-Primary capitalize">
          {index + 1 + ".  " + files[index].fileName}
        </p>
        <a
          href={blob_URL + files[index].blobName}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="icon-[mdi--file-find] text-md "></i>
        </a>
      </div>
    );
    records.push(element);
  }

  if (files == null || files == undefined || files?.length == 0) {
    const element = (
      <div className="flex justify-between pt-2 items-center" key={12}>
        <p className="text-medium text-Secondary capitalize">no files</p>
      </div>
    );
    records.push(element);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between align-center">
        <ContainerHeading heading={heading} />
      </div>
      {records}
    </div>
  );
}

ViewFiles.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      fileName: PropTypes.string.isRequired,
      blobName: PropTypes.string.isRequired,
    })
  ),
  heading: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default ViewFiles;
