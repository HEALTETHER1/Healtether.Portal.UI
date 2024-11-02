import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function ListFiles({
  files,
  heading,
  addFiles,
  removeFiles,
  type = "patient",
}) {
  const records = [];
  const { clinic } = useSelector((state) => state.currentClinic);
  const blob_URL = `${import.meta.env.VITE_BLOB_URL}clinic${
    clinic._id
  }/${type}/`;
  let fileIndexer = 0;
  for (let index = 0; index < files.length; index++) {
    if (files[index] instanceof File) {
      const file = files[index];
      fileIndexer = fileIndexer + 1;
      const element = (
        <div className="flex justify-between pt-2 items-center" key={index}>
          <p className="text-medium">{fileIndexer + ".  " + file?.name}</p>
          <div
            title="Remove File"
            onClick={(e) => removeFiles(e, index, file?.name, false)}
          >
            <i className="icon-[mdi--delete] text-lg text-danger"></i>
          </div>
        </div>
      );
      records.push(element);
    } else {
      const element = (
        <div
          className="flex justify-between pt-2 items-center border-b"
          key={index}
        >
          <p className="text-medium text-Primary" title={files[index].fileName}>
            {index + 1 + ".  " + files[index].fileName}
          </p>
          {files[index].blobName != null ? (
            <div className="flex justify-between space-x-px items-center">
              <a
                href={blob_URL + files[index].blobName}
                target="_blank"
                rel="noopener noreferrer"
                title="View File"
              >
                <i className="icon-[mdi--file-find] text-lg text-Primary"></i>
              </a>
              <div
                title="Remove File"
                onClick={(e) =>
                  removeFiles(e, index, files[index].blobName, true)
                }
              >
                <i className="icon-[mdi--delete] text-lg text-danger"></i>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
      records.push(element);
    }
  }
  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-col align-center">
        <div className="text-Primary text-xs">List of Records</div>
        <div className="flex flex-col space-y-px text-textPrimary">
          {records}
        </div>
        <div
          className="text-Secondary py-0 h-fit border-b-2 border-b-Secondary text-md cursor-pointer w-fit mt-2"
          onClick={(e) => addFiles(e)}
        >
          + Add another record
        </div>
      </div>
    </div>
  );
}

ListFiles.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(File),
      PropTypes.shape({
        fileName: PropTypes.string.isRequired,
        blobName: PropTypes.string,
      }),
    ])
  ).isRequired,
  heading: PropTypes.string, // This prop is defined but not used in the current component
  addFiles: PropTypes.func.isRequired,
  removeFiles: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default ListFiles;
