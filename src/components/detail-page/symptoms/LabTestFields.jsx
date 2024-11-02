import PropTypes from "prop-types";
import DefaultTextboxClass, { DefaultPrescriptionDetailDivClass } from "../../../utils/Classes";
import { useState } from "react";
import { notesHandleKeyDown } from "../../../utils/CommonMethods";

const LabTestFields = ({
    placeholderText,
    nameText,
    index,
    test,
    repeat,
    notes,
    handleAddChange,
    handleDeleteChange,
}) => {
    const [check, setCheck] = useState(repeat);
    const [labTestName, setlabTestName] = useState(test);
    const [labTestNotes, setlabTestNotes] = useState(notes);
   
    const handleChange = (e) => {
        setlabTestNotes(e.target.value);
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
            <span className="w-1/16  text-BreadcrumbText icon-[streamline--equal-sign-solid]"></span>
            <input
                type="text"
                placeholder={placeholderText}
                name={nameText+"_"+index+"_name"}
                className={
                    " w-3/6 " + DefaultTextboxClass
                }
                value={labTestName}
                onChange={(event) =>
                    setlabTestName(event.target.value)
                }
            />
            <div className="flex justify-around items-center p-1 gap-2.5 ">
                <input
                    type="checkbox"
                    id={nameText+"_"+index+"_repeat"}
                    checked={check}
                    onChange={(e) => {
                        setCheck(!check);
                    }}
                    className={"rounded-full  disabled:cursor-pointer read-only:cursor-pointer " + DefaultTextboxClass}
                />
                <input type="hidden" name={nameText+"_"+index+"_repeat"} value={check}/>
                <label htmlFor={nameText+"_"+index+"_repeat"} className="font-normal text-sm cursor-pointer">Repeat</label>
            </div>
            <textarea
                placeholder="Notes"
                className={
                    "w-3/6 overflow-auto max-h-16 " + DefaultTextboxClass
                }
                name={nameText+"_"+index+"_notes"}
                value={labTestNotes}
                onChange={handleChange}
                onKeyDown={(e)=>notesHandleKeyDown(e,labTestNotes,setlabTestNotes)}
                onInput={handleTextareaInput}
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
};

LabTestFields.propTypes = {
    placeholderText: PropTypes.string,
    nameText: PropTypes.string,
    test: PropTypes.string.isRequired,
    repeat: PropTypes.bool.isRequired,
    notes: PropTypes.string,
    index: PropTypes.number,
    handleAddChange: PropTypes.func.isRequired,
    handleDeleteChange: PropTypes.func.isRequired,
};

export default LabTestFields;
