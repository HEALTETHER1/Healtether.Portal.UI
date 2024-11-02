import PropTypes from "prop-types";
import DefaultTextboxClass, { DefaultPrescriptionDetailDivClass } from "../../../utils/Classes";
import { useState } from "react";
import { notesHandleKeyDown } from "../../../utils/CommonMethods";

function PersonalHistoryTextField(prop) {

  const [activity, setActivity] = useState(prop?.activity);
  const [activityNature, setActivityNature] = useState(prop?.activityNature);
  const [notes, setNotes] = useState(prop?.notes);
  const handleChange = (e) => {
    setNotes(e.target.value);
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
      {/* <div className="rounded-lg w-full  border-solid border-[1px] flex  h-full py-3 mt-3 px-2 gap-3 items-center">*/}
      <div className="w-[4%] text-lg text-BreadcrumbText icon-[streamline--equal-sign-solid]"></div>
      <input
        type="text"
        placeholder="Activity"
        name={"personalHistory_" + prop.index + "_activity"}
        className={
          "w-full " + DefaultTextboxClass + " leading-8"

        }
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <input
        type="text"
        name={"personalHistory_" + prop.index + "_nature"}
        className={
          "w-full " + DefaultTextboxClass + " leading-8"
        }
        placeholder="Nature of Activity"
        value={activityNature}
        onChange={(e) => setActivityNature(e.target.value)}
      />
      <textarea
        placeholder="Notes"
        className={
          "w-full overflow-auto max-h-16 " + DefaultTextboxClass + " leading-8"
        }
        name={"personalHistory_" + prop.index + "_notes"}
        value={notes}
        onChange={handleChange}
        onKeyDown={(e) => notesHandleKeyDown(e, notes, setNotes)}
        rows="1"
        style={{ resize: "none" }}
      ></textarea>
      <div className="w-1/6 gap-1 flex justify-center items-center">
        <div
          className={`icon-[gridicons--add-outline] cursor-pointer text-2xl `}
          onClick={() => prop.handleAddChange()}
        ></div>
        <div
          className="cursor-pointer text-2xl icon-[mdi--bin]"
          onClick={() => prop.handleDeleteChange()}
        ></div>
      </div>
    </div>
  );
}

PersonalHistoryTextField.propTypes = {
  index: PropTypes.number,
  activity: PropTypes.string.isRequired, // activity should be a string and is required
  activityNature: PropTypes.string, // activityNature is an optional string
  notes: PropTypes.string, // notes should be an array of strings
  handleAddChange: PropTypes.func.isRequired, // handleAddChange is a required function
  handleDeleteChange: PropTypes.func.isRequired, // handleDeleteChange is a required function
};

export default PersonalHistoryTextField;
