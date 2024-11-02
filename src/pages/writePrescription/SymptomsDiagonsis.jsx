import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import FollowUp from "../../components/detail-page/symptoms/FollowUp";
import AdvicePatient from "../../components/detail-page/symptoms/AdvicePatient";
import store from "../../store/store";
import MedicalHistoryFields from "components/detail-page/medical-history/MedicalHistoryFields.jsx";
import MedicalFieldTab from "components/detail-page/MedicalFieldTab.jsx";
import ContainerHeading from "components/detail-page/ContainerHeading.jsx";
import DiagnosisTextFields from "components/detail-page/symptoms/DiagnosisTextFields.jsx";
import LabTestFields from "components/detail-page/symptoms/LabTestFields.jsx";
import AutocompleteModel from "utils/AutocompleteModel";
import DrugPrescription from "../../components/detail-page/symptoms/DrugPrescription";
import { GetAssociatedSymptomsDiagnosis } from "services/appointment/aiPrescriptionText.js";
import { SearchMedication } from "../../services/appointment/writePrescription";
import { SearchMedicationMapper } from "../../utils/Prescription";

function Symptoms({ frequentSearches, prescriptionData }) {
    // const { prescriptionData } = useLoaderData();
    const [loadingAssociatedSymptoms, setLoadingAssociatedSymptoms] = useState(false);
    const [showAssociatedSymptoms, setShowAssociatedSymptoms] = useState(false);
    /*    related to AI prescription text*/
    const [differentialDiagnoses, setDifferentialDiagnoses] = useState([
    ]);
    const [associatedSymptom, setAssociatedSymptom] = useState([
    ]);
    const DefaultSymptomsObj = (key) => ({
        _id: Date.now().toString(),
        name: key || "",
        duration: {
            unit: "Days",
            value: ""
        },
        notes: "",
    });
    const DefaultDiagnosisObj = (key) => ({
        _id: Date.now().toString(),
        name: key || "",
        notes: "",
    });
    const DefaultLabTestObj = (key) => ({
        _id: Date.now().toString(),
        name: key || "",
        repeat: false,
        notes: "",
    });
    const DefaultDrugObj = (key) => ({
        _id: Date.now().toString(),
        id: "",
        drugName: key || "",
        content: "",
        dosage: "",
        frequency: "",
        duration: {
            value: "",
            unit: ""
        },
        time: "After meal",
        notes: "",

    });
    const [symptoms, setSymptoms] = useState([DefaultSymptomsObj()]);
    const [diagnosis, setDiagnosis] = useState([DefaultDiagnosisObj()]);
    const [labtest, setLabTest] = useState([DefaultLabTestObj()]);
    const [drug, setDrug] = useState([DefaultDrugObj()]);
    useEffect(() => {
        if (prescriptionData?.prescriptions?.symptoms?.length > 0) {
            setSymptoms(prescriptionData?.prescriptions?.symptoms);
        }
        else {
            setSymptoms([DefaultSymptomsObj()])
        }
        if (prescriptionData?.prescriptions?.diagnosis?.length > 0) {
            setDiagnosis(prescriptionData?.prescriptions?.diagnosis);
        }
        else {
            setDiagnosis([DefaultDiagnosisObj()]);
        }
        if (prescriptionData?.prescriptions?.labTests?.length > 0) {
            setLabTest(prescriptionData?.prescriptions?.labTests)
        }
        else {
            setLabTest([DefaultLabTestObj()])
        }
        if (prescriptionData?.prescriptions?.drugPrescriptions?.length > 0) {
            setDrug(prescriptionData?.prescriptions?.drugPrescriptions)
        }
        else {
            setDrug([DefaultDrugObj()]);
        }
    }, [prescriptionData])

    const modifyHistory = (key, action, setter, type, value) => {
        setter((prevHistory) => {
            let newHistory = [...prevHistory];
            let index = newHistory.findIndex((item) => item._id === key);

            if (action === "remove" && index > -1) {
                newHistory.splice(index, 1);
                if (newHistory.length === 0) {
                    if (type === "symptoms") {
                        newHistory.push(DefaultSymptomsObj());
                    } else if (type === "diagnosis") {
                        newHistory.push(DefaultDiagnosisObj());
                    } else if (type === "labTest") {
                        newHistory.push(DefaultLabTestObj());
                    } else if (type === "drug") {
                        newHistory.push(DefaultDrugObj());
                    }
                }
            } else if (action === "add") {
                if (type === "symptoms") {
                    newHistory.push(DefaultSymptomsObj(value));
                } else if (type === "diagnosis") {
                    newHistory.push(DefaultDiagnosisObj(value));
                } else if (type === "labTest") {
                    newHistory.push(DefaultLabTestObj(value));
                } else if (type === "drug") {
                    newHistory.push(DefaultDrugObj(value));
                    if (value != null)
                        newHistory = newHistory.filter((val) => val?.drugName?.trim() !== "");
                    return newHistory;
                }

                if (value != null)
                    newHistory = newHistory.filter((val) => val?.name?.trim() !== "");

            }

            return newHistory;
        });
    };

    const addSymptomsTab = (key) => {
        if (!symptoms.some((entry) => entry.name === key)) {
            modifyHistory(null, "add", setSymptoms, "symptoms", key);
        }
    };

    const addDiagnosisTab = (key) => {
        if (!diagnosis.some((entry) => entry.name === key)) {
            modifyHistory(null, "add", setDiagnosis, "diagnosis", key);
        }
    };

    const addLabTestTab = (key) => {
        if (!labtest.some((entry) => entry.name === key)) {
            modifyHistory(null, "add", setLabTest, "labTest", key);
        }
    };

    const addDrugTab = (key) => {
        if (!drug.some((entry) => entry.drugName === key)) {
            modifyHistory(null, "add", setDrug, "drug", key);
        }
    };

    // Calling AI API
    const getAIAPIData = async () => {
        let searchSymptoms = symptoms.filter((entry) => entry.name !== "");
        let searchDiagnosis = diagnosis.filter((entry) => entry.name !== "");
        if (searchSymptoms.length >= 2) {
            setShowAssociatedSymptoms(true);
            setLoadingAssociatedSymptoms(true);
            setAssociatedSymptom([])
            setDifferentialDiagnoses([])

            var data = await GetAssociatedSymptomsDiagnosis(searchSymptoms, []);

            setAssociatedSymptom(() =>
                data["Associated Symptoms"].map((symptom, index) => ({
                    _id: index,
                    associatedsymptom: symptom,
                }))
            );
            setDifferentialDiagnoses(() =>
                data["Differential Diagnoses"].map((diagnosis, index) => ({
                    _id: index,
                    differentialdiagnoses: diagnosis,
                }))
            );
            setLoadingAssociatedSymptoms(false);
        }
    };

    
    const SetSymptomName = (key, name) => {
        var symptomsObj = [...symptoms];
        var index = FindSymptomIndex(symptomsObj, key);
        if (index > -1) {
            symptomsObj[index].name = name;
            setSymptoms(symptomsObj);
        }

    }
    const SetDiagnosisName = (key, name) => {
        var diagnosisObj = [...diagnosis];
        var index = FindSymptomIndex(diagnosisObj, key);
        if (index > -1) {
            diagnosisObj[index].name = name;
            setDiagnosis(diagnosisObj);
        }

    }
    const FindSymptomIndex = (array, key) => {
        var index = -1
        array.filter((value, i) => {
            if (value._id == key) {
                index = i;
                return true;
            }
        });
        return index;
    }
    return (
        <>
            <div className="flex flex-col gap-4 mt-3">
                <div className="flex flex-col gap-1.5">
                    <ContainerHeading heading={"Symptoms"} />
                    {/*For Associated SYMPTOMS not show when empty*/}

                    <MedicalFieldTab
                        handleOnClick={(value) => addSymptomsTab(value)}
                        tabs={associatedSymptom}
                        name="associatedsymptom"
                        subHeading="Associated Symptoms"
                        isLoading={loadingAssociatedSymptoms}
                        isShown={showAssociatedSymptoms}
                        isRefresh={true}
                        onRefresh={getAIAPIData}
                    />
                    <p className="text-BreadcrumbText text-sm font-base">
                        Frequently searched symptoms
                    </p>
                    <MedicalFieldTab
                        handleOnClick={(value) => addSymptomsTab(value)}
                        tabs={frequentSearches?.symptoms}
                        name="name"
                        isLoading={false}
                        isShown={true}
                    />

                    {/* symptoms */}
                    <div>
                        {symptoms.map((entry, i) => (
                            <MedicalHistoryFields
                                key={entry._id}
                                index={i}
                                placeholderText="Symptoms"
                                nameText="symptoms"
                                historyName={entry.name}
                                duration={entry.duration}
                                notes={entry.notes}
                                handleAddChange={async () => {
                                    modifyHistory(null, "add", setSymptoms, "symptoms")
                                    if (symptoms?.filter(s => s.name !== "")?.length === 2) {
                                        await getAIAPIData();
                                    }
                                }}
                                handleDeleteChange={() =>
                                    modifyHistory(entry._id, "remove", setSymptoms, "symptoms")
                                }
                                setMedicalName={(value) => SetSymptomName(entry._id, value)}
                            />
                        ))}
                    </div>
                </div>
                <div className=" flex flex-col gap-1.5">
                    <ContainerHeading heading={"Diagnosis"} />

                    <MedicalFieldTab
                        handleOnClick={(value) => addDiagnosisTab(value)}
                        tabs={differentialDiagnoses}
                        name="differentialdiagnoses"
                        subHeading="Differential Diagnosis"
                        isLoading={loadingAssociatedSymptoms}
                        isShown={showAssociatedSymptoms}
                        isRefresh={true}
                        onRefresh={getAIAPIData}
                    />
                    <p className="text-BreadcrumbText text-sm font-base">
                        Frequently searched diagnosis
                    </p>
                    <MedicalFieldTab
                        handleOnClick={(value) => addDiagnosisTab(value)}
                        tabs={frequentSearches?.diagnosis}
                        name="name"
                        isShown={true}
                        isLoading={false}
                    />
                    {/* diagnosis */}
                    <div>
                        {diagnosis.map((entry, i) => (
                            <DiagnosisTextFields
                                key={entry._id}
                                index={i}
                                placeholderText="Diagnosis"
                                nameText="diagnosis"
                                diagnosis={entry.name}
                                notes={entry.notes}
                                handleAddChange={() => {
                                    modifyHistory(null, "add", setDiagnosis, "diagnosis")
                                    if (diagnosis?.filter(s => s.name !== "")?.length === 2) {
                                        getAIAPIData();
                                    }
                                }
                                }
                                handleDeleteChange={() =>
                                    modifyHistory(entry._id, "remove", setDiagnosis, "diagnosis")
                                }
                                setMedicalName={(value) => SetDiagnosisName(entry._id, value)}
                            />
                        ))}
                    </div>
                </div>
                <div className=" flex flex-col gap-1">
                    <ContainerHeading heading={"Lab Tests"} />
                    <p className="text-BreadcrumbText text-sm font-base">
                        Frequently searched test
                    </p>
                    <MedicalFieldTab
                        handleOnClick={(value) => addLabTestTab(value)}
                        tabs={frequentSearches?.labtest}
                        name="name"
                        isShown={true}
                        isLoading={false}
                    />
                    {/* labtest */}
                    <div>
                        {labtest.map((entry, i) => (
                            <LabTestFields
                                key={entry._id}
                                placeholderText={"Lab Test"}
                                nameText={"labTests"}
                                index={i}
                                test={entry.name}
                                repeat={entry.repeat}
                                notes={entry.notes}
                                handleAddChange={() =>
                                    modifyHistory(null, "add", setLabTest, "labTest")
                                }
                                handleDeleteChange={() =>
                                    modifyHistory(entry._id, "remove", setLabTest, "labTest")
                                }
                            />
                        ))}
                    </div>
                </div>
                <div className=" flex flex-col gap-1">
                    <ContainerHeading heading={"Drug Prescription"} />
                    <p className="text-BreadcrumbText text-sm font-base">
                        Frequently searched drug
                    </p>
                    <MedicalFieldTab
                        handleOnClick={(value) => addDrugTab(value)}
                        tabs={frequentSearches?.drugs}
                        name="name"
                        isShown={true}
                        isLoading={false}
                    />

                    <div>
                        {drug.map((entry, i) => (
                            <DrugPrescription
                                key={entry._id}
                                name={entry.drugName}
                                content={entry.content}
                                dosage={entry.dosage}
                                frequency={entry.frequency}
                                duration={entry.duration}
                                isBefore={entry.isBeforeMeal}
                                notes={entry.notes}
                                index={i}
                                handleAddChange={() =>
                                    modifyHistory(null, "add", setDrug, "drug")
                                }
                                handleDeleteChange={() =>
                                    modifyHistory(entry._id, "remove", setDrug, "drug")
                                }
                                   search={(searchtext) =>
                                       SearchMedication(searchtext, 10)
                                   }
                                searchMapper={SearchMedicationMapper}

                            />
                        ))}
                    </div>
                </div>

                <AdvicePatient
                    patientAdvice={prescriptionData?.prescriptions?.patientAdvice}
                    patientNotes={prescriptionData?.prescriptions?.privateNotes}
                />
                <FollowUp
                    doctorId={prescriptionData?.doctorId}
                    followUpTimeSlot={prescriptionData?.prescriptions?.followUpTimeSlot}
                    followUpAppDate={prescriptionData?.prescriptions?.followUpDate}
                />

            </div>
        </>
    );
}

export default Symptoms;
