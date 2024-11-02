import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultLogo from "assets/images/healtetherlogov2.png";
import { GetAppointmentOverview } from "./../../../services/appointment/appointment";
import { Link } from "react-router-dom";

function PatientScroll() {
    const navigate = useNavigate();
    const { appointmentId } = useParams();
    const [patients, setPatients] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(false);
    const fetchPatients = async (set_index) => {
        try {
            const data = await GetAppointmentOverview(page, 10, "");
            const len = data.data.data.length;
            if (len) {
                let newPatients = [...patients, ...data.data.data];
                newPatients.forEach((appointment, index) => {
                    if (appointment._id == appointmentId) {
                        setPatients(newPatients);
                        setPage(page + 1);
                        setCurrentIndex(index);
                        return;
                    }
                });
                if (set_index) {
                    fetchPatients();
                }
            } else {
                setLastPage(true);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
            setPatients([]);
        }
    };

    useEffect(() => {
        fetchPatients(true);
    }, []);

    const handleNextClick = () => {
        if (currentIndex < patients.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
        if (!lastPage && currentIndex % 6 == 0) {
            fetchPatients();
        }
    };

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleCardClick = (patient) => {
        navigate(`/prescription/${patient.id}/${patient.patientId}`);
        window.location.reload();
    };

    return (
        <div className="flex items-center w-full pt-[18px]">
            {/* <div className="h-[90px] w-[350px] border-e-2 border-solid flex justify-center pt-2">
        <img
          src={defaultLogo}
          className="h-full w-[214px] transition-all duration-200 cursor-pointer"
          alt="main_logo"
          onClick={() => navigate("/dashboard")}
        />
      </div> */}
            <div
                className="cursor-pointer flex items-center"
                onClick={handlePrevClick}
            >
                <span className="icon-[ep--arrow-left-bold] text-[15px]"></span>
            </div>
            <div className="w-[970px] overflow-hidden h-[105px] ps-5 flex">
                <div
                    className="flex transition-transform duration-500 gap-5"
                    style={{
                        transform: `translateX(-${
                            Math.min(currentIndex, Math.max(patients.length - 3, 0)) *
                            (970 / 6.5)
                        }px)`,
                    }}
                >
                    {patients.map((patient) => {
                        return (
                            <Link
                                id={patient._id}
                                key={patient._id}
                                to={`/prescription/${patient.id}/${patient.patientId}`}
                                refresh="true"
                                onClick={() => handleCardClick(patient)}
                            >
                                <div
                                    className={`h-[90px] cursor-pointer flex flex-col justify-center text-center min-w-[140px] rounded-2xl shadow-[0px_4px_20px_0px_#0000000D] focus:border-[#49B09D] focus:border-2 ${
                                        patient._id === appointmentId
                                            ? "border-[#49B09D] border-[2px]"
                                            : ""
                                    }`}
                                >
                                    <p className="text-[#0C091F] text-[17px] font-medium">
                                        {patient.name}
                                    </p>
                                    <p className="text-[#0C091F] text-[14px] font-normal">
                                        {`${patient.age}, ${patient.gender}`}
                                    </p>
                                    <p className="text-[#8C8C8C] text-[14px] font-normal">
                                        {patient.patient_token}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div
                className="cursor-pointer flex items-center"
                onClick={handleNextClick}
            >
                <span className="icon-[ep--arrow-right-bold] text-[15px]"></span>
            </div>
        </div>
    );
}

export default PatientScroll;
