import { useState, useEffect } from "react";
import AutocompleteModel from "utils/AutocompleteModel";
import MedicalHistoryFields from "components/detail-page/medical-history/MedicalHistoryFields.jsx";
import MedicalHistoryAutocomplete from "components/detail-page/medical-history/MedicalHistoryAutocomplete.jsx";
import ContainerHeading from "components/detail-page/ContainerHeading.jsx";
import { SearchAllergies, SearchMedication } from "../../services/appointment/writePrescription.js"
import { SearchMedicationMapper } from "../../utils/Prescription.js";

function MedicalHistory({ medicalHistoryObj }) {

    const createDefaultEntry = () => ({
        _id: Date.now().toString(),
        name: "",
        duration: {
            value: "",
            unit: ""
        },
        notes: "",
    });

    const [pastHistory, setPastHistory] = useState([createDefaultEntry()]);
    const [familyHistory, setFamilyHistory] = useState([createDefaultEntry()]);
    const [allergies, setAllergies] = useState([createDefaultEntry()]);
    const [procedure, setProcedure] = useState([createDefaultEntry()]);

    const createDefaultMedicationEntry = () => ({
        _id: Date.now().toString(),
        prescription: {
            id: "",
            name: "",
            duration: {
                value: "",
                unit: ""
            },
            unit: "Days",
            notes: "",
        },
    });
    const [medication, setMedication] = useState([createDefaultMedicationEntry()]);

    useEffect(() => {
        if (medicalHistoryObj?.pastHistory?.length > 0) {
            setPastHistory(medicalHistoryObj?.pastHistory);
        }
        else {
            setPastHistory([createDefaultEntry()])
        }
        if (medicalHistoryObj?.familyHistory?.length > 0) {
            setFamilyHistory(medicalHistoryObj?.familyHistory)
        }
        else {
            setFamilyHistory([createDefaultEntry()])
        }
        if (medicalHistoryObj?.allergies?.length > 0) {
            setAllergies(medicalHistoryObj?.allergies)
        }
        else {
            setAllergies([createDefaultEntry()])
        }
        if (medicalHistoryObj?.pastProcedureHistory?.length > 0) {
            setProcedure(medicalHistoryObj?.pastProcedureHistory)
        }
        else {
            setProcedure([createDefaultEntry()])
        }
        if (medicalHistoryObj?.medication?.length > 0) {
            setMedication(medicalHistoryObj?.medication)
        }
        else {
            setMedication([createDefaultMedicationEntry()])
        }
    }, [medicalHistoryObj]);

    const modifyHistory = (key, action, setter, type) => {
        setter((prevHistory) => {
            const newHistory = [...prevHistory];
            const index = newHistory.findIndex((item) => item._id === key);

            if (action === "remove" && index > -1) {
                newHistory.splice(index, 1);
                if (newHistory.length === 0) {
                    newHistory.push(createDefaultEntry(type));
                }
            } else if (action === "add") {
                if (type === "medication") {
                    newHistory.push(createDefaultMedicationEntry());
                } else {
                    newHistory.push(createDefaultEntry(type));
                }
            }

            return newHistory;
        });
    };
   
    return (
        <div className="my-5 flex flex-col gap-4 w-full">
            {/* Past History */}
            <div>
                <ContainerHeading heading={"Past History"} />
                {pastHistory.map((past, i) => (
                    <MedicalHistoryFields
                        key={past._id}
                        placeholderText="Past history"
                        nameText="pastHistory"
                        historyName={past.name}
                        duration={past.duration}
                        index={i}
                        notes={past.notes}
                        handleAddChange={() => modifyHistory(null, "add", setPastHistory, "disease")}
                        handleDeleteChange={() =>
                            modifyHistory(past._id, "remove", setPastHistory, "disease")
                        }
                    />
                ))}
            </div>

            {/* Family History */}
            <div>
                <ContainerHeading heading={"Family History"} />
                {familyHistory.map((family, i) => (
                    <MedicalHistoryFields
                        key={family._id}
                        placeholderText="Family history"
                        nameText="familyHistory"
                        historyName={family.name}
                        duration={family.duration}
                        index={i}
                        notes={family.notes}
                        handleAddChange={() => modifyHistory(null, "add", setFamilyHistory, "disease")}
                        handleDeleteChange={() =>
                            modifyHistory(family._id, "remove", setFamilyHistory, "disease")
                        }

                    />
                ))}
            </div>

            {/* Past Procedure History */}
            <div>
                <ContainerHeading heading={"Past Procedure History"} />
                {procedure.map((proc, i) => (
                    <MedicalHistoryFields
                        key={proc._id}
                        placeholderText="Past Procedure history"
                        nameText="pastProcedureHistory"
                        historyName={proc.name}
                        duration={proc.duration}
                        index={i}
                        notes={proc.notes}
                        handleAddChange={() => modifyHistory(null, "add", setProcedure, "disease")}
                        handleDeleteChange={() =>
                            modifyHistory(proc._id, "remove", setProcedure, "disease")
                        }

                    />
                ))}
            </div>

            {/* Allergies */}
            <div>
                <ContainerHeading heading={"Allergies"} />

                {allergies.map((value, i) => (
                    <MedicalHistoryAutocomplete
                        key={value._id}
                        placeholderText="Allergies"
                        nameText="allergies"
                        index={i}
                        {...value}
                        handleAddChange={() =>
                            modifyHistory(null, "add", setAllergies, "allergies")
                        }
                        handleDeleteChange={() =>
                            modifyHistory(value._id, "remove", setAllergies, "allergies")
                        }
                        search={(searchtext) => SearchAllergies(searchtext, 10)}
                        searchMapper={SearchMedicationMapper}
                    />
                ))}
            </div>

            {/* Medication */}
            <div>
                <ContainerHeading heading={"Medication"} />

                {medication.map((value, i) => (
                    <MedicalHistoryAutocomplete
                        key={value._id}
                        placeholderText="Medication"
                        nameText="medication"
                        index={i}
                        {...value}
                        handleAddChange={() =>
                            modifyHistory(null, "add", setMedication, "medication")
                        }
                        handleDeleteChange={() =>
                            modifyHistory(value._id, "remove", setMedication, "medication")
                        }
                        search={(searchtext) =>
                            SearchMedication(searchtext, 10)
                        }
                        searchMapper={SearchMedicationMapper}
                    />
                ))}
            </div>

        </div>
    );
}

export default MedicalHistory;
