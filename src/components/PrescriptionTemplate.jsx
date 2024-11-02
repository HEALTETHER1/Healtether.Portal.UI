import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {
    GetPrescriptionForReportByAppointmentId,
    GetPreviousMedicalReportsByPatientId,
} from "../services/appointment/writePrescription";
import {useReactToPrint} from "react-to-print";
import {format} from "date-fns";

export const PrescriptionReport = () => {
    let isLoadindData=false;
    const {appointmentId, patientId} = useParams();
    const [prescriptionDetails, setPrescriptionDetails] = useState(null);
    const [medicalHistoryDetails, setMedicalHistoryDetails] = useState(null);

    useEffect(() => {


        const fetchDetails = async () => {
            isLoadindData=true;
            const prescriptionResponse = await GetPrescriptionForReportByAppointmentId(appointmentId);
            const medicalHistoryResponse = await GetPreviousMedicalReportsByPatientId(patientId);

            setPrescriptionDetails(prescriptionResponse);
            setMedicalHistoryDetails(medicalHistoryResponse);
        };

        if(!isLoadindData)
        fetchDetails();

    }, []);

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    if (!prescriptionDetails || !medicalHistoryDetails) return <p>No Data</p>;

    const {
        vitals,
        prescriptions,
        doctorName,
        patientName,
        patientAge,
        patientGender,
        patientMobile,
        doctorId,
        clinicPatientId,
        clinic,
        appointmentDate,
        timeSlot
    } = prescriptionDetails;
    const {
        symptoms,
        diagnosis,
        drugPrescriptions,
        patientAdvice,
        followUpDate,
    } = prescriptions;
    const {
        allergies,
        medication,
        familyHistory,
        pastHistory,
        pastProcedureHistory,
    } = medicalHistoryDetails;

    return (
        <>
            <div>
                <div
                    ref={contentToPrint}
                    className="max-w-4xl mx-auto p-8 mt-1 bg-white shadow-lg border print:border-0 print:shadow-none border-gray-300"
                >
                    {/* Header Section */}

                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                        <div className="flex items-center">
                            {clinic?.logo?.toString() !== "" ? (
                                <img
                                    src={clinic?.logo}
                                    alt="Clinic Logo"
                                    className="h-16 w-16 object-contain"
                                />
                            ) : (
                                <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-500">No Logo</span>{" "}
                                </div>
                            )}
                            <div className="ml-4">
                                <h1 className="text-lg font-bold">{clinic?.clinicName}</h1>
                                <p>
                                    Dr. {doctorName},
                                </p>
                                <p className="text-sm">
                                    {doctorId?.specialization}
                                </p>
                                {/*  <p>Reg no: 61234564</p>*/}
                            </div>
                        </div>
                    </div>

                    {/* Patient Details */}
                    <div className="flex justify-between items-center border-b pb-4 mb-4 text-md">

                        <div className="font-semibold">
                            <p className="font-normal">
                                Patient Details:</p>
                            <p> {patientName}, {patientGender}, {patientAge} yrs,{" "} </p>
                            <p> {patientMobile}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm">Date:{"  "}{appointmentDate ? format(new Date(appointmentDate), 'dd MMM yyyy') : ""} {timeSlot}</p>
                            <p className="text-sm">Patient ID: {clinicPatientId}</p>
                        </div>
                    </div>

                    {/* Medical History */}
                    <div className="grid grid-cols-2 gap-2 border-b pb-2 mb-2">
                        <div>
                            <h2 className="font-semibold">Patient Medical History</h2>

                            <p>
                                <span className="font-medium"> Allergies: </span>{" "}
                                {allergies.length > 0
                                    ? allergies.map((allergy, index) => (
                                        <span key={index}>{allergy.name}, </span>
                                    ))
                                    : "No allergies recorded."}
                            </p>

                            <p>
                                <span className="font-medium"> Medication:</span> {" "}
                                {medication.length > 0
                                    ? medication.map((med) => (
                                        <span key={med._id}>
                      {med.name} ({med.duration.value} {med.duration.unit}),{" "}
                    </span>
                                    ))
                                    : "No medications recorded."}
                            </p>

                            <p>
                                <span className="font-medium"> Family History:</span>{" "}
                                {familyHistory.length > 0
                                    ? familyHistory.map((history) => (
                                        <span key={history._id}>{history.name}, </span>
                                    ))
                                    : "No family history recorded."}
                            </p>

                            <p>
                                <span className="font-medium"> Past Medical History:</span>{" "}
                                {pastHistory.length > 0
                                    ? pastHistory.map((history) => (
                                        <span key={history._id}>{history.name}, </span>
                                    ))
                                    : "No past medical history recorded."}
                            </p>

                            <p>
                                <span className="font-medium"> Past Procedures:</span>{" "}
                                {pastProcedureHistory.length > 0
                                    ? pastProcedureHistory.map((procedure) => (
                                        <span key={procedure._id}>{procedure.name}, </span>
                                    ))
                                    : "No past procedures recorded."}
                            </p>
                        </div>
                    </div>

                    {/* Vitals */}
                    <div className="grid grid-cols-2 gap-2 border-b pb-2 mb-2">
                        <div>
                            <h2 className="font-semibold">Vitals</h2>
                            <p>
                                <span className="font-medium"> Blood Pressure: </span>
                                {vitals?.bloodPressure?.systolic}/{vitals?.bloodPressure?.diastolic}{" "}
                                mmHg
                            </p>
                            <p>
                                <span className="font-medium"> Pulse Rate: </span>
                                {vitals?.pulseRate} bpm
                            </p>
                            <p>
                                <span className="font-medium"> SpO2: </span>
                                {vitals?.spo2} %
                            </p>
                            <p>
                                <span className="font-medium">Temperature: </span>
                                {vitals?.temperature} °C
                            </p>
                            <p>
                                <span className="font-medium">Height: </span>
                                {vitals?.height} cm
                            </p>
                            <p>
                                <span className="font-medium">Weight: </span>
                                {vitals?.weight} kg
                            </p>
                            <p>
                                <span className="font-medium">RBS: </span>
                                {vitals?.rbs} mg/dL
                            </p>
                        </div>
                    </div>

                    {/* Symptoms */}
                    <div className="mb-2 border-b pb-2">
                        <h2 className="font-semibold">Symptoms</h2>
                        {symptoms.length > 0 ? (
                            symptoms.map((symptom) => <p key={symptom._id}>{symptom.name}</p>)
                        ) : (
                            <p>No symptoms recorded.</p>
                        )}
                    </div>

                    {/* Diagnosis */}
                    <div className="mb-2 border-b pb-2">
                        <h2 className="font-semibold">Diagnosis</h2>
                        {diagnosis.length > 0 ? (
                            diagnosis.map((diag) => <p key={diag._id}>{diag.name}</p>)
                        ) : (
                            <p>No diagnosis recorded.</p>
                        )}
                    </div>

                    {/* Medication Section */}
                    <div className="mb-2">
                        <h2 className="font-semibold mb-2">Medication</h2>
                        <table className="min-w-full table-auto text-left border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">Drug</th>
                                <th className="px-4 py-2">Dosage</th>
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Frequency</th>
                                <th className="px-4 py-2">Duration</th>
                                <th className="px-4 py-2">Notes</th>
                            </tr>
                            </thead>
                            <tbody>
                            {drugPrescriptions.length > 0 ? (
                                drugPrescriptions.map((drug) => (
                                    <tr key={drug._id}>
                                        <td className="border px-4 py-2">{drug.drugName}</td>
                                        <td className="border px-4 py-2">{drug.dosage}</td>
                                        <td className="border px-4 py-2">
                                            {drug.isBeforeMeal ? "Before Meal" : "After Meal"}
                                        </td>
                                        <td className="border px-4 py-2">{drug.frequency}</td>
                                        <td className="border px-4 py-2">
                                            {drug.duration.value || "N/A"} {drug.duration.unit}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {drug.notes || "No notes"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border px-4 py-2" colSpan="6">
                                        No medications prescribed.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Advice/Instructions */}
                    <div className="mb-2">
                        <h2 className="font-semibold text">Advice/Instructions</h2>
                        <p>{patientAdvice || "No specific advice provided."}</p>
                    </div>

                    {/* Follow Up */}
                    <div className="mb-2">
                        <h2 className="font-semibold">Follow Up</h2>
                        <p>
                            {followUpDate
                                ? `Next follow-up on ${new Date(
                                    followUpDate
                                ).toLocaleDateString()}`
                                : "No follow-up scheduled."}
                        </p>
                    </div>

                    {/* Footer Section */}
                    <div className="flex justify-between items-center pt-4 border-t font-medium text-sm">
                        <div>
                            <p>Ph: {clinic?.adminUserId?.mobile || "N/A"}</p>
                            <p>Email: {clinic?.adminUserId?.email || "N/A"}</p>
                        </div>
                        <div className="text-right">
                            <p>{clinic?.address}</p>
                            <p>Timings: 8:30 am - 10:50 pm Mon-Fri</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex w-full justify-center p-4 print:hidden print:flex-none">
                <button
                    onClick={() => handlePrint(null, () => contentToPrint.current)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none print:hidden" // Hides during print
                >
                    Print Prescription
                </button>
            </div>
        </>
    );
};

