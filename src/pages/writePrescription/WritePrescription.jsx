import PrescriptionSidebar from "components/detail-page/write-prescription/SiderBar/PrescriptionSidebar.jsx";
import MedicalHistory from "pages/writePrescription/MedicalHistory.jsx";
import Symptoms from "./SymptomsDiagonsis";
import VitalsGeneralExamination from "./VitalsGeneralExamination";
import { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigation,
  useParams,
} from "react-router-dom";
import {
  GetPrescriptionByAppointmentId,
  UpdatePrescriptionApi,
} from "services/appointment/writePrescription";
import {
  GetPreviousMedicalReportsByPatientId,
  GetFrequenttextForPrescription,
} from "../../services/appointment/writePrescription";
import Spinner from "../../components/loader/Spinner";
import AppointmentCard from "../../components/AppointmentCard";
import { GetRedirectUrlFromFormRequest } from "../../utils/CommonMethods";
export async function PrescriptionAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(
    Array.from(formData.keys()).map((key) => [
      key,
      formData.getAll(key).length > 1
        ? formData.getAll(key)
        : formData.get(key),
    ])
  );
// validation
  await UpdatePrescriptionApi(
    params.id,
    params.patientId,
    params.appointmentId,
    { data: updates }
  );

  const redirectUrl = GetRedirectUrlFromFormRequest(request, "/appointment");
  return redirect(redirectUrl);
}

export async function PrescriptionLoader({ params }) {
  var prescriptionData = undefined;
  if (params?.appointmentId != undefined && params?.patientId != undefined) {
    prescriptionData = await GetPrescriptionByAppointmentId(
      params?.appointmentId
    );
    return { prescriptionData };
  }
  return { prescriptionData };
}

export default function WritePrescription() {
  const [frequentSearches, setFrequentSearches] = useState({});
  const navigation = useNavigation();
  const location = useLocation();
  const busy = navigation.state === "submitting";
  const { prescriptionData } = useLoaderData();
  const { appointmentId, patientId } = useParams();
  let loadingHistory = false;
  const [medicalHistories, setMedicalHistories] = useState();
  const settingsArray = [
    "Sx, Dx & Prescription",
    "Vitals and General Examination",
    "Medical History",
  ];
  let tabId = 0;
  if (location.pathname.includes("vitals")) {
    tabId = 1;
  } else if (location.pathname.includes("medicalhistory")) {
    tabId = 2;
  }
  const [activeTab, setActiveTab] = useState(tabId);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    if (!loadingHistory) {
      loadingHistory = true;
      const loadHistoryDetail = async () => {
        loadingHistory = true;
        const result = await GetPreviousMedicalReportsByPatientId(patientId);
        setMedicalHistories(result);
      };
      // frequent details
      const getFrequencyforPrescription = async () => {
        loadingHistory = true;
        const result = await GetFrequenttextForPrescription();
        setFrequentSearches(result);
      };
      getFrequencyforPrescription();
      loadHistoryDetail();
    }
  }, [patientId]);

  const handlePrint = () => {
    const newWindow = window.open(
      `/reportTemplate/${appointmentId}/${patientId}`,
      "_blank"
    );
    newWindow.focus();
  };

  return (
    <>
      {/* ///// appointment card /////// */}
            <AppointmentCard  />
      <div className="flex flex-row items-center gap-3 border-b ">
        {settingsArray.map((data, index) => {
          return (
            <div
              className={
                (activeTab === index
                  ? "bg-gradient-to-t from-green-100 "
                  : "") +
                " px-20 text-md font-light border rounded-lg py-2.5 bg-TextBgPrimary cursor-pointer"
              }
              key={index}
              onClick={() => {
                handleTabClick(index);
                return index;
              }}
            >
              {data}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 w-full mt-2">
        <div className="w-[80%]">
          <Form
            id="prescriptionForm"
            method="post"
            encType="multipart/form-data"
            noValidate
          >
            <div className={`${activeTab === 0 ? "" : "hidden"}`}>
              <Symptoms frequentSearches={frequentSearches} prescriptionData={prescriptionData} />
            </div>
            <div className={`${activeTab === 1 ? "" : "hidden"}`}>
              <VitalsGeneralExamination
                vitalsObj={prescriptionData?.vitals}
                medicalHistoryObj={medicalHistories}
              />
            </div>
            <div className={`${activeTab === 2 ? "" : "hidden"}`}>
              <MedicalHistory medicalHistoryObj={medicalHistories} />
            </div>
            <div className="flex justify-end gap-5 mb-2">
              <button
                type="submit"
                disabled={busy}
                className="bg-Primary rounded-lg  py-3 px-14  text-white font-semibold text-md"
                // onClick={() => handleSaveButton()}
              >
                Save &nbsp; {busy ? <Spinner show={true} /> : <></>}
              </button>
              <button
                type="button"
                className="bg-white border-2 rounded-lg  py-3 px-14  text-Primary font-semibold text-md"
                onClick={handlePrint}
              >
                Print &nbsp; {busy ? <Spinner show={true} /> : <></>}
              </button>
            </div>
          </Form>
        </div>
        <div className="w-[20%]">
          <PrescriptionSidebar
            isLoading={false}
            vitals={prescriptionData?.vitals}
            medicalHistory={medicalHistories}
          />
        </div>
      </div>
    </>
  );
}
