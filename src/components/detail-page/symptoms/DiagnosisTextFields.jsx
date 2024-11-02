import PropTypes from "prop-types";
import DefaultTextboxClass, {DefaultPrescriptionDetailDivClass} from "../../../utils/Classes";
import { useState } from "react";
import { notesHandleKeyDown } from "../../../utils/CommonMethods";

function DiagnosisTextFields({
  placeholderText,
  nameText,
  diagnosis,
  notes,
  index,
  handleAddChange,
  handleDeleteChange,
  setMedicalName
}) {
  const [diagnosisName, setdiagnosisName] = useState(diagnosis);
  const [diagnosisNotes, setdiagnosisNotes] = useState(notes);
  const handleTextareaInput = (event) => {
    adjustTextareaHeight(event.target);
  };
  const handleChange = (e) => {
    setdiagnosisNotes(e.target.value);
    handleTextareaInput(e)
};


  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height
  };

  return (
      <div className={DefaultPrescriptionDetailDivClass + " w-full items-center justify-evenly mt-2"}>
        <span className="w-1/16 text-xl text-BreadcrumbText icon-[streamline--equal-sign-solid]"></span>
        <input
            type="text"
            placeholder={placeholderText}
            className={
                " w-3/6 " + DefaultTextboxClass
            }
            name={nameText + "_" + index + "_name"}
            value={diagnosisName}
            onChange={(event) =>
            { setdiagnosisName(event.target.value)
                setMedicalName(event.target.value)}
            }
        />

        <textarea
            placeholder="Notes"
            className={
                "w-full overflow-auto max-h-16 " + DefaultTextboxClass
            }
            value={diagnosisNotes}
            name={nameText + "_" + index + "_notes"}
            onChange={handleChange}
            onKeyDown={(e)=>notesHandleKeyDown(e,diagnosisNotes,setdiagnosisNotes)}
            onInput={handleTextareaInput}
            rows="1"
            style={{resize: "none"}}
        ></textarea>
        <div className="gap-1 flex justify-center items-center cursor-pointer">
        <span
            className="icon-[gridicons--add-outline] cursor-pointer text-2xl"
            onClick={handleAddChange}
        ></span>
          <span
              className="icon-[mdi--bin] cursor-pointer text-2xl"
              onClick={handleDeleteChange}
          ></span>
        </div>
      </div>
  );
}

DiagnosisTextFields.propTypes = {
  placeholderText: PropTypes.string.isRequired,
  nameText: PropTypes.string.isRequired,
  diagnosis: PropTypes.string.isRequired,
  notes: PropTypes.string,
  handleAddChange: PropTypes.func.isRequired,
  handleDeleteChange: PropTypes.func.isRequired,
    setMedicalName:PropTypes.func
};

export default DiagnosisTextFields;
