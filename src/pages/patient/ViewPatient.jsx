import { useState } from "react";
import Sidebar from "components/detail-page/sidebar";
import { isToday } from "date-fns";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import ViewPersonalDetails from "components/view-page/ViewPersonalDetails";
import ViewDocument from "components/view-page/ViewDocument";
import ViewFiles from "./patient-detail/ViewFiles";
import Consultation from "./Consultation";
import { SetStartConsultation } from "../../services/appointment/appointment";
import { GetPatientWithAllMedicalRecords } from "../../services/patient/patient";
export async function PatientWithAppointmentDetailLoader({ params }) {
  var patientData = undefined;
  if (params?.id != undefined) {
    patientData = await GetPatientWithAllMedicalRecords(params.id);
    return { patientData };
  }
  return { patientData };
}
function ViewPatient() {
  const navigate = useNavigate();
  const { patientData } = useLoaderData();

  const [callEndConsultation, SetCallEndConsultation] = useState(false);
  var prescription = [];
  var medicalFile = [];
  var procedure = [];
  var currentAppointment = null;
  //let loadingRecords =false;
  const settingsArray = [
    {
      name: "Consultation",
      isVisible: false,
      isEnabled: false,
    },
    {
      name: "Details",
      isVisible: true,
      isEnabled: true,
    },
    {
      name: "Prescription",
      isVisible: true,
      isEnabled: true,
    },
    {
      name: "Medical records",
      isVisible: true,
      isEnabled: true,
    },
    {
      name: "Procedure records",
      isVisible: true,
      isEnabled: true,
    },
    {
      name: "Appointment history",
      isVisible: false,
      isEnabled: true,
    },
    {
      name: "Payment history",
      isVisible: false,
      isEnabled: true,
    },
  ];
  const [activeTab, setActiveTab] = useState(1);
  const [patientMenu, setPatientMenu] = useState(settingsArray);
  const [consultationStarted, setConsultationStarted] = useState(false);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  // const [consultationRecord,
  //     SetConsultationRecord] = useState(null);
  // useEffect(() => {     if (!loadingRecords) {         loadingRecords = true;
  //     const fetch = async() => {             var result = await
  // GetCurrentRecords(patientData?.appointment?._id);             if (result !=
  // null) {                 SetConsultationRecord(result);             } }
  //  fetch();     } }, [loadingRecords]);

  for (let index = 0; index < patientData?.appointments.length; index++) {
    var appointment = patientData?.appointments[index];
    if (appointment?.prescriptionRecords != null) {
      prescription = prescription.concat(appointment?.prescriptionRecords);
    }

    if (appointment?.medicalRecords != null) {
      medicalFile = medicalFile.concat(appointment?.medicalRecords);
    }

    if (appointment?.procedureRecords != null) {
      procedure = procedure.concat(appointment?.procedureRecords);
    }

    const today = isToday(new Date(appointment?.appointmentDate));

    if (today) {
      currentAppointment = appointment;
    }
  }

  const handleConsultation = async (e, id) => {
    if (id != null) {
      if (currentAppointment?.ended?.yes == true) return false;

      let arrayMenu = [...patientMenu];
      arrayMenu[0].isVisible = true;
      arrayMenu[0].isEnabled = true;
      for (let j = 1; j < arrayMenu.length; j++) {
        arrayMenu[j].isEnabled = false;
      }
      if (!(patientData?.appointment?.started?.yes == true)) {
        await SetStartConsultation(id);
      }
      setPatientMenu(arrayMenu);
      setActiveTab(0);
      setConsultationStarted(true);
    } else {
      navigate("/scheduleappointment");
    }
  };
  const endConsultation = () => SetCallEndConsultation(!callEndConsultation);
  return (
    <div className="flex flex-row  h-full pt-2 space-x-4 overflow">
      <div className="w-[30%] ml-2 space-y-2">
        <div className="flex flex-row  items-center  p-1  h-[6rem] ">
          <div className="h-[50px] w-[50px] bg-[#E4E0F3] rounded-[50%] object-cover text-2xl flex items-center justify-center">
            <div className="text-center w-full h-fit">
              {patientData.firstName?.substring(0, 1) +
                patientData.lastName?.substring(0, 1)}
            </div>
          </div>

          <div className="flex flex-col ml-3">
            <div className=" text-Secondary text-2xl font-medium mt-3">
              {patientData.firstName + " " + patientData.lastName}
            </div>
            <div className=" text-TextPrimary text-sm  font-normal ">
              {patientData.mobile}
            </div>
            <div className=" text-TextPrimary text-md  font-medium ">
              Patient ID&nbsp;:&nbsp;{patientData.patientId}
            </div>
          </div>
        </div>
        <hr className="h-px block bg-[#D9D9D9]"></hr>
        <div className="flex space-x-2">
          <Link
            to={"edit"}
            className="bg-TextBgPrimary border text-TextPrimary text-sm w-1/2 h-fit py-4 rounded-md text-center cursor-pointer"
          >
            Edit Profile
          </Link>
          <button
              type="button"
              className="bg-Primary text-white border text-sm w-1/2 h-fit py-4 rounded-md text-center cursor-pointer"
              onClick={(e) => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
          {/* {consultationStarted ? (
            <button
              type="button"
              className="bg-Primary text-white border text-sm w-1/2 h-fit py-4 rounded-md text-center cursor-pointer"
              onClick={(e) => {
                endConsultation(e);
              }}
            >
              End Consultation
            </button>
          ) : (
            <button
              type="button"
              className="bg-Primary text-white border text-sm w-1/2 h-fit py-4 rounded-md text-center cursor-pointer"
              onClick={(e) => {
                handleConsultation(e, currentAppointment?._id);
              }}
            >
              {!(currentAppointment?.ended?.yes == true) &&
              currentAppointment?.started?.yes == true
                ? "Continue Consultation"
                : currentAppointment?.ended?.yes == true
                ? "Ended"
                : "Start Consultation"}
            </button>
          )} */}
        </div>
        <div className="flex gap-[0.6rem] flex-col mt-[0.6rem]">
          {patientMenu.map((data, index) => {
            return (
              <Sidebar
                key={index}
                id={index}
                name={data.name}
                isActive={activeTab === index}
                isVisible={data.isVisible}
                isEnabled={data.isEnabled}
                onClick={() => {
                  if (data == "Consultation") {
                    handleTabClick(index);
                    return { visible: true };
                  } else {
                    handleTabClick(index);
                    return index;
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="w-[70%]   bg-BgDetailPage flex flex-col rounded-3xl ml-2 p-8 ">
        <div className={`${activeTab === 0 ? "" : "hidden"} `}>
          <Consultation
            appointmentId={currentAppointment?._id}
            setEndConsultation={callEndConsultation}
            consultationRecords={currentAppointment}
          />
        </div>
        <div className={`${activeTab === 1 ? "" : "hidden"} `}>
          <ViewPersonalDetails obj={patientData} type={"patient"} />
          <ViewDocument obj={patientData} />
        </div>
        <div className={`${activeTab === 2 ? "" : "hidden"}`} disabled>
          <ViewFiles heading={"Prescription"} files={prescription} />
        </div>
        <div className={`${activeTab === 3 ? "" : "hidden"}`} disabled>
          <ViewFiles heading={"Medical Records"} files={medicalFile} />
        </div>
        <div className={`${activeTab === 4 ? "" : "hidden"}`} disabled>
          <ViewFiles heading={"Procedure Records"} files={procedure} />
        </div>
        <div className={`${activeTab === 5 ? "" : "hidden"}`} disabled></div>
        <div className={`${activeTab === 6 ? "" : "hidden"}`} disabled></div>
      </div>
    </div>
  );
}

export default ViewPatient;
