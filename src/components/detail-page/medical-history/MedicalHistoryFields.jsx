import PropTypes from "prop-types";
import DefaultTextboxClass, { DefaultPrescriptionDetailDivClass, DefaultSelectboxClass } from "../../../utils/Classes";
import { useState } from "react";
import { notesHandleKeyDown } from "../../../utils/CommonMethods";

function MedicalHistoryFields({
    historyName,
    duration,
    notes,
    handleAddChange,
    handleDeleteChange,
    index,
    placeholderText,
    nameText,
    setMedicalName
}) {

    const [diseaseName, setdiseaseName] = useState(historyName);
    const [diseaseNotes, setdiseaseNotes] = useState(notes);
    const [durationValue, setdurationValue] = useState(duration?.value);
    const [durationUnit, setdurationUnit] = useState(duration?.unit);

    const handleChange = (e) => {
        setdiseaseNotes(e.target.value);
        handleTextareaInput(e)
    };

    const handleTextareaInput = (event) => {
        adjustTextareaHeight(event.target);
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
                name={nameText + "_" + index + "_name"}
                placeholder={placeholderText}
                className={
                    " w-3/6 " + DefaultTextboxClass
                }
                value={diseaseName}
                onChange={(e) =>{
                    setdiseaseName(e.target.value);
                    setMedicalName(e.target.value)
                }}
            />
            <div className="border flex justify-evenly  items-center px-2 py-1.5 w-2/6 gap-2">
                <input
                    type="number"
                    name={nameText + "_" + index + "_duration_value"}
                    className={
                        " w-1/2 " + DefaultTextboxClass
                    }
                    placeholder="Duration"
                    value={durationValue}
                    onChange={(e) =>
                        setdurationValue(e.target.value)
                    }
                />
                <select
                    className={
                        " w-1/2 " + DefaultSelectboxClass
                    }
                    name={nameText + "_" + index + "_duration_unit"}
                    value={durationUnit}
                    onChange={(e) =>
                        setdurationUnit(e.target.value)
                    }
                >
                    <option value="Hours">Hours</option>
                    <option value="Days">Days</option>
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                    <option value="Years">Years</option>

                </select>
            </div>
            <textarea
                placeholder="Notes"
                name={nameText + "_" + index + "_notes"}
                className={
                    "w-full overflow-auto max-h-16 " + DefaultTextboxClass
                }
                value={diseaseNotes}
                onKeyDown={(e)=>notesHandleKeyDown(e,diseaseNotes,setdiseaseNotes)}
                onChange={handleChange}
                rows="1"
                style={{ resize: "none" }}
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

MedicalHistoryFields.propTypes = {
    historyName: PropTypes.string,
    duration: PropTypes.object,
    placeholderText: PropTypes.string,
    nameText: PropTypes.string,
    notes: PropTypes.string,
    handleAddChange: PropTypes.func,
    handleDeleteChange: PropTypes.func,
    setMedicalName:PropTypes.func
};

export default MedicalHistoryFields;
