import PropTypes from "prop-types";
import DefaultTextboxClass, {DefaultPrescriptionDetailDivClass, DefaultSelectboxClass} from "../../../utils/Classes";
import Autocomplete from "components/autoComplete/Autocomplete.jsx";
import { useState } from "react";
import { notesHandleKeyDown } from "../../../utils/CommonMethods";

function MedicalHistoryAutocomplete(props) {
    const {
        placeholderText,
        nameText,
        index,
        name,
        duration,
        notes,
        handleAddChange,
        handleDeleteChange,
        search,
        searchMapper
    } = props;

    const [diseaseName, setdiseaseName] = useState(name);
    const [diseaseNotes, setdiseaseNotes] = useState(notes);
    const [durationValue, setdurationValue] = useState(duration?.value);
    const [durationUnit, setdurationUnit] = useState(duration?.unit);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior (newline)
            const { selectionStart, selectionEnd } = e.target;

            // Insert a new line with a bullet point
            const newText =
                diseaseNotes.slice(0, selectionStart) + '\n• ' + diseaseNotes.slice(selectionEnd);

                setdiseaseNotes(newText);

            // Move the cursor after the new bullet point
            setTimeout(() => {
                e.target.selectionStart = selectionStart + 3;
                e.target.selectionEnd = selectionStart + 3;
            }, 0);
        }
    };
    const handleNotesChange = (e) => {
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
        <div className={DefaultPrescriptionDetailDivClass + " w-full gap-3 mb-3 items-center justify-evenly"}>
            <span className="w-1/16 text-2xl icon-[heroicons-outline--menu-alt-4]"></span>
            <div className="w-3/6 ">
                <Autocomplete
                    options={[]}
                    customClass={
                        "w-full " + DefaultTextboxClass+" leading-8"
                    }
                    value={diseaseName}
                    placeHolder={placeholderText}
                    name={nameText+"_"+index+"_name"}
                    onChange={setdiseaseName}
                    search={search}
                    searchMapper={searchMapper}
                    avoidImg={true}
                    onSelect={(data) => {
                        setdiseaseName(data.name);
                    }}
                />
            </div>
            <div className="border flex justify-evenly gap-2 items-center px-2 py-1.5 w-2/6">
                <input
                    type="number"
                    name={nameText+"_"+index+"_duration_value"}
                    className={
                        " w-full " + DefaultTextboxClass

                    }
                    placeholder="Duration"
                    value={durationValue}
                    onChange={(event) =>
                        setdurationValue(event.target.value)
                    }
                />
                <select
                   name={nameText+"_"+index+"_duration_unit"}
                    className={
                        " w-full " + DefaultSelectboxClass
                    }
                    value={durationUnit}
                    onChange={(event) =>
                        setdurationUnit(event.target.value)
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
                className={
                    "w-full overflow-auto max-h-16 " + DefaultTextboxClass
                }
                name={nameText+"_"+index+"_notes"}
                value={diseaseNotes}
                onChange={handleNotesChange}
                onKeyDown={(e)=>notesHandleKeyDown(e,diseaseNotes,setdiseaseNotes)}
                rows="1"
                style={{resize: "none"}}
            ></textarea>
            <div className="gap-1 flex justify-center items-center ">
                <div
                    className="icon-[gridicons--add-outline] cursor-pointer text-2xl"
                    onClick={handleAddChange}
                ></div>
                <div
                    className="icon-[mdi--bin] cursor-pointer text-2xl"
                    onClick={handleDeleteChange}
                ></div>
            </div>
        </div>
    );
}

MedicalHistoryAutocomplete.propTypes = {
    placeholderText: PropTypes.string.isRequired,
    nameText: PropTypes.string.isRequired,
    index: PropTypes.number,
    name: PropTypes.string,
    duration: PropTypes.object,
    notes: PropTypes.string,
    handleAddChange: PropTypes.func.isRequired,
    handleDeleteChange: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    searchMapper: PropTypes.func.isRequired,
};

export default MedicalHistoryAutocomplete;

