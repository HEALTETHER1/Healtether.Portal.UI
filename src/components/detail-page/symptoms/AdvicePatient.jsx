import PropTypes from 'prop-types';
import ContainerHeading from "components/detail-page/ContainerHeading.jsx";
import DefaultTextboxClass from "utils/Classes.js";
import { useEffect, useState } from 'react';
import { notesHandleKeyDown } from '../../../utils/CommonMethods';




const AdvicePatient = ({ patientAdvice, patientNotes }) => {

const [advice, setadvice] = useState();
const [notes, setnotes] = useState();

    const handleChange = (e, func) => {
        func(e.target.value);
        handleTextareaInput(e)
    };

    const adjustTextareaHeight = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleTextareaInput = (event) => {
        adjustTextareaHeight(event.target);
    };

    useEffect(()=>{
        setadvice(patientAdvice ||"");
        setnotes(patientNotes|| "");
    },[patientAdvice, patientNotes])

    return (
        <div className="flex gap-8 p-2 flex-wrap md:flex-nowrap">
            <div className="flex flex-col justify-center w-full md:w-1/2 ">
                <ContainerHeading heading={"Advice for patients"}/>
                <textarea
                    type="text"
                    rows="4"
                    name='patientAdvice'
                    style={{ resize: "none" }}
                    value={advice}
                    placeholder="These notes are for the patient"
                    className={  "w-full overflow-auto max-h-28 "+  DefaultTextboxClass}
                    onChange={(event) => handleChange(event,setadvice)}
                    onKeyDown={(event) => notesHandleKeyDown(event, advice,setadvice)}
                    onInput={(event) => handleTextareaInput(event)}
                ></textarea>
            </div>
            <div className="flex flex-col justify-center w-full md:w-1/2">
                <ContainerHeading heading={"Private notes"}/>
                <textarea
                    type="text"
                    rows="4"
                    name='privateNotes'
                    style={{ resize: "none" }}
                    value={notes}
                    onChange={(event) => handleChange(event,setnotes)}
                    onKeyDown={(event) => notesHandleKeyDown(event, notes,setnotes)}
                    onInput={(event) => handleTextareaInput(event)}
                    placeholder="These notes are for the patient"
                    className={  "w-full overflow-auto max-h-28 "+  DefaultTextboxClass}
                />
            </div>
        </div>
    );
};


AdvicePatient.propTypes = {
    patientAdvice: PropTypes.string,
    patientNotes: PropTypes.string,
};

export default AdvicePatient;