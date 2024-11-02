import PropTypes from "prop-types";
import DefaultTextboxClass, { DefaultPrescriptionDetailDivClass, DefaultSelectboxClass } from "../../../utils/Classes";
import Autocomplete from "components/autoComplete/Autocomplete.jsx";
import { useState } from "react";
import { notesHandleKeyDown } from "../../../utils/CommonMethods";

function DrugPrescription({
    isBefore,
    name,
    content,
    dosage,
    frequency,
    duration,
    notes,
    handleAddChange,
    handleDeleteChange,
    search,
    searchMapper,
    index,
}) {
    const [isBeforeMeal, setIsBeforeMeal] = useState(isBefore || false);
    const [drugName, setdrugName] = useState(name);
    const [drugNotes, setdrugNotes] = useState(notes);
    const [drugcontent, setdrugContent] = useState(content);
    const [drugDosage, setdrugDosage] = useState(dosage);
    const [drugFrequency, setdrugFrequency] = useState(frequency);
    const [durationValue, setdurationValue] = useState(duration?.value);
    const [durationUnit, setdurationUnit] = useState(duration?.unit);

    const handleTextareaInput = (event) => {
        adjustTextareaHeight(event.target);
    };
    const handleChange = (e) => {
        setdrugNotes(e.target.value);
        handleTextareaInput(e)
    };
    

    const adjustTextareaHeight = (textarea) => {
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height
    };
    return (
        <>
            <div className={DefaultPrescriptionDetailDivClass + " w-full items-center justify-evenly mt-2"}>
                {/*  <span className="w-1/16 text-xl text-BreadcrumbText icon-[streamline--equal-sign-solid]"></span>*/}
                <div className="flex flex-col w-full gap-2 ">
                    <div className="flex flex-row gap-2 w-full items-center justify-start">
                        <div
                            className={`${!isBeforeMeal 
                                    ? "bg-Primary text-white"
                                    : "bg-TableRowBorder"
                                } cursor-pointer px-3  py-1  rounded-full text-sm`}
                            name="time"
                            onClick={() => {
                                setIsBeforeMeal(false);
                            }}
                        >
                            After meal
                        </div>
                        <div
                            className={`${isBeforeMeal
                                    ? "bg-Primary text-white"
                                    : "bg-TableRowBorder"
                                } cursor-pointer px-3  py-1 rounded-full text-sm`}
                            name="time"
                            onClick={() => {
                                setIsBeforeMeal(true);
                            }}
                        >
                            Before meal
                        </div>
                        <input type="hidden" name={"drugs_"+index+"_isBeforeMeal"} value={isBeforeMeal} />
                    </div>

                    <div className="flex flex-row gap-3 w-full items-center justify-evenly flex-wrap md:flex-nowrap">
                        <Autocomplete
                            options={[]}
                            customClass={
                                "w-full " + DefaultTextboxClass+" leading-8"
                            }
                            value={drugName}
                            placeHolder="Drug"
                            name={"drugs_"+index+"_drugName"}
                            avoidImg={true}
                            onChange={setdrugName}
                            search={search}
                            searchMapper={searchMapper}
                            onSelect={(data) => {
                                setdrugName(data.name);
                            }}
                        />

                        <input
                            value={drugDosage}
                            type="number"
                            name={"drugs_"+index+"_dosage"}
                            onChange={(event) =>
                                setdrugDosage(event.target.value)
                            }
                            placeholder="Dosage"
                            className={" w-full md:w-2/6 " + DefaultTextboxClass}
                        />
                        <select
                            value={drugFrequency}
                            name={"drugs_"+index+"_frequency"}
                            className={"w-full md:w-3/6 " + DefaultSelectboxClass}
                            onChange={(event) =>
                                setdrugFrequency(event.target.value)
                            }
                        >

                            {[
                                "",
                                "SOS",
                                "Stat",
                                "1-1-1",
                                "1-0-1",
                                "1-0-0",
                                "0-1-1",
                                "0-0-1",
                                "0-1-0",
                            ].map((option, index) => (
                                <option
                                    key={index}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>

                        <div className="w-full md:w-3/6 border flex flex-row gap-2 p-2  ">
                            <input
                                value={durationValue}
                                type="number"
                                name={"drugs_"+index+"_duration_value"}
                                className={"w-1/2 " + DefaultTextboxClass}
                                placeholder="x"
                                onChange={(event) =>
                                    setdurationValue(event.target.value)
                                }
                            />
                            <select
                                className={"w-1/2 " + DefaultSelectboxClass}
                                name={"drugs_"+index+"_duration_unit"}
                                value={durationUnit}
                                onChange={(event) =>
                                    setdurationUnit(event.target.value)
                                }
                            >

                                {["Hours", "Days", "Weeks", "Months", "Years"].map(
                                    (option, index) => (
                                        <option
                                            key={index}
                                            value={option}
                                        >
                                            {option}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-row gap-6 w-full items-center justify-evenly">
                        <input
                            value={drugcontent}
                            type="text"
                            name={"drugs_"+index+"_content"}
                            onChange={(event) =>
                                setdrugContent(event.target.value)
                            }
                            placeholder="Content"
                            className={"w-1/2 " + DefaultTextboxClass}
                        />

                        <textarea
                            placeholder="Notes"
                            className={
                                "w-1/2 overflow-auto max-h-16 " + DefaultTextboxClass
                            }
                            name={"drugs_"+index+"_notes"}
                            value={drugNotes}
                            onChange={handleChange}
                            onKeyDown={(e)=>notesHandleKeyDown(e,drugNotes,setdrugNotes)}
                            onInput={handleTextareaInput}
                            rows="1"
                            style={{ resize: "none" }}
                        ></textarea>

                    </div>

                </div>


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
        </>
    );
}

DrugPrescription.propTypes = {
    isBefore: PropTypes.bool,
    search:PropTypes.func,
    searchMapper:PropTypes.func,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    dosage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    frequency: PropTypes.string.isRequired,
    duration: PropTypes.object,
    notes: PropTypes.string,
    handleAddChange: PropTypes.func.isRequired,
    handleDeleteChange: PropTypes.func.isRequired,
    index: PropTypes.number
};

export default DrugPrescription;
