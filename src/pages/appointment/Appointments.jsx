import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Table from "components/grid/Table";
import { GetAppointmentOverview } from "services/appointment/appointment";
import { useNavigate } from "react-router-dom";
import { PatientDetailPill } from "./grid/PatientDetailPIll";
import { AppointmentDetailPill } from "./grid/AppointmentDetailPill";
import { useSelector } from "react-redux";
import { AppointmentGridActionPill } from "./grid/AppointmentGridActionPill";
import ButtonList from "../../components/detail-page/ButtonList";
import dayjs from "dayjs";
import { GetDoctorsApi } from "../../services/staff/staff";
import { alertBox } from "components/dialog/prompt";
import { MakeReceiptInAppointmentOverview } from "../../services/appointment/writePrescription";

export default function Appointments() {
    const { user } = useSelector((state) => state.user);
    const { clinic } = useSelector((state) => state.currentClinic);
    const [doctors, setDoctors] = useState(() => []);
    let loadingDoctor = false;
    const navigation = useNavigate();

    // function NavigateToEditAppointment(e, appointment) {
    //   navigation("/appointment/" + appointment._id + "/edit");
    //   e.stopPropagation();
    // }

    // function NavigateToFollowUpAndCancel(e, appointment) {
    //   navigation(
    //     "/prescription/" + appointment._id + "/" + appointment.patientId
    //   );
    //   e.stopPropagation();
    // }

    useEffect(() => {
        if (!loadingDoctor) {
            loadingDoctor = true;
            const fetchDoctor = async () => {
                var doctors = await GetDoctorsApi();
                setDoctors(doctors);
            }
            fetchDoctor();
        }

    }, []);
    let SuperAdmin = user.isSuperAdmin;
    let admin = user.isSuperAdmin;
    let doctor = user.isDoctor;

    const columns = [
        {
            Header: "Patientid",
            accessor: "clinicPatientId",
        },
        {
            Header: "Patient",
            Cell: PatientDetailPill,
        },
        {
            Header: "Appointment",
            Cell: AppointmentDetailPill,
        },
        {
            Header: "Action1",
            Cell: AppointmentGridActionPill,
            iconClassAccessor: "icon-[ic--baseline-whatsapp]",
            iconNameAccessor: "Whatsapp Chat",
            iconBorderedAccessor: false,
            callBackAccessor: (e) => {
                navigation("/chats");
              
            },
        },
        {
            Header: "Action2",
            Cell: AppointmentGridActionPill,
            iconClassAccessor: "icon-[majesticons--clock-plus-line]",
            iconNameAccessor: "Manage Appt.",
            iconBorderedAccessor: false,
            callBackAccessor: (e, appointment) => {
                navigation(`/patient/${appointment.patientId}/appointment/${appointment._id}/details`)
            },
        },
        {
            Header: "Action3",
            Cell: AppointmentGridActionPill,
            iconClassAccessor: "icon-[tabler--receipt]",
            iconNameAccessor: "Make receipt",
            iconBorderedAccessor: true,
            callBackAccessor: async (e, appointment,SetLoader) => {
                SetLoader(true);
                let response = await MakeReceiptInAppointmentOverview(appointment._id);
                if (response?.isValid) {
                    navigation(`/payments/${response?.invoiceId}/manage`);
                    SetLoader(false);
                }
                else {
                    alertBox({
                        show: true,
                        title: 'Info.',
                        proceed: undefined,
                        confirmation: "Something went wrong"
                    });
                    SetLoader(false);
                }
            },
        },
        {
            Header: "Action4",
            Cell: AppointmentGridActionPill,
            iconClassAccessor: "icon-[icon-park-solid--notepad]",
            iconNameAccessor: "Past Medical History",
            iconBorderedAccessor: false,
            callBackAccessor: (e, appointment) => {
                if (doctor || admin || SuperAdmin) {
                    navigation(`/appointment/${appointment._id}/${appointment.patientId}/medicalhistory`);
                }
                else {
                    navigation(`/appointment/${appointment._id}/${appointment.patientId}/medicalhistoryforstaffs`);
                }
                e.stopPropagation();
            },
        },
        {
            Header: "Action5",
            Cell: AppointmentGridActionPill,
            iconClassAccessor: "icon-[mdi--heart-vitals] ",
            iconNameAccessor: "Vitals & Examination ",
            iconBorderedAccessor: true,
            callBackAccessor: (e, appointment) => {
                if (doctor || admin || SuperAdmin) {
                    navigation(
                        `/appointment/${appointment._id}/${appointment.patientId}/vitals`
                    );
                }
                else {
                    navigation(
                        `/appointment/${appointment._id}/${appointment.patientId}/vitalsforstaffs`
                    );
                }
                e.stopPropagation();
            },
        },
    ];



    for (let index = 0; index < user.linkedClinics.length && !admin; index++) {
        const linkedClinic = user.linkedClinics[index];
        let isCurrent = linkedClinic?.clinic?._id === clinic._id;
        if (isCurrent) {
            admin = linkedClinic.isAdmin;
            break;
        }
    }

    if (admin || SuperAdmin || doctor) {
        columns.push({
            Header: "Action6",
            Cell: AppointmentGridActionPill,
            iconClassAccessor: "icon-[tabler--prescription]",
            iconNameAccessor: "Write prescription",
            iconBorderedAccessor: false,
            callBackAccessor: (e, appointment) => {
                navigation(
                    `/appointment/${appointment._id}/${appointment.patientId}/writeprescription`
                );
                e.stopPropagation();
            },
        });
    }
    let tabButton = [
        {
            id: 2,
            name: "Upcoming",
            isActive: false,
            default: true,
            setStatus: { status: "Upcoming" },
        },
        {
            id: 4,
            name: "Cancelled",
            isActive: false,
            setStatus: { status: "Cancelled" },
        },
        {
            id: 5,
            name: "Completed",
            isActive: false,
            setStatus: { status: "Completed" },
        },
        {
            id: 6,
            name: "All",
            isActive: true,
            setStatus: { status: "All" },
        },
    ];

    const rowClick = (row) => {
        navigation(`/appointment/${row._id}/consultation`);
    };



    // method calls the Table.jsx setkeyword to fetch servercall
    const [externalCall, SetExternalCall] = useState({ count: 0, SetKeywordDetails: () => { } });


    function TriggerExternalCall(AppDate, doctorId) {
        const SetKeywordDetails = (keyword) => {
            var keywordOption = {
                text: keyword.text,
                option: keyword.option
            }
            keywordOption["option"]["doctor"] = doctorId || keyword?.option?.doctor;
            keywordOption["option"]["appDate"] = AppDate || keyword?.option?.appDate;
            return keywordOption;
        }
        var counter = externalCall.count;
        SetExternalCall({
            count: counter + 1,
            SetKeywordDetails: SetKeywordDetails
        })
    }


    const fetchUsersData = async (
        page,
        pageSize,
        pageFilter,
        pageSortBy,
        setData
    ) => {
        let paramStr = "";

        if (
            pageFilter?.text?.trim().length > 1 &&
            pageFilter?.text !== "ClearAllFilter"
        ) {
            paramStr = `&keyword=${pageFilter.text}`;
        }
        if (!pageFilter) {
            paramStr += `&date=${dayjs().format("YYYY-MM-DD")}&status=Upcoming`;
        }
        if (pageFilter?.option?.status != null) {
            paramStr += `&status=${pageFilter.option.status}`;
        }
        if (pageFilter?.option?.appDate?.date != null) {
            paramStr += `&date=${pageFilter?.option?.appDate?.date}`;
        }
        if (pageSortBy.length > 0) {
            const sortParams = pageSortBy[0];
            const sortyByDir = sortParams.desc ? "desc" : "asc";
            paramStr = `${paramStr}&sortby=${sortParams.id}&direction=${sortyByDir}`;
        }
        if (pageFilter?.option?.doctor != undefined && pageFilter?.option?.doctor != "0") {
            paramStr += `&doctor=${pageFilter?.option?.doctor}`;
        }
        try {
            let res = await GetAppointmentOverview(page + 1, pageSize, paramStr);
            const results = res.data;
            return {
                results: results.data,
                count: results.totalCount,
            };
        } catch (e) {
            throw new Error(`API error:${e?.message}`);
        }
    };


    const queryClient = new QueryClient();
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    var dateButton = [];
    for (let index = 0; index < 7; index++) {
        const element = {
            id: index,
            name: dayjs().add(index, "day").format("MMM DD"),
            isActive: false,
            setAppDate: { date: dayjs().add(index, "day").format("YYYY-MM-DD") },
        };
        dateButton.push(element);
    }

    return (
        <div>
            <div className="flex flex-row mt-px justify-between">
                {dateButton != null ? (
                    <div className="mt-2 ">
                        {dateButton.map((tab, i) => {
                            return (
                                <ButtonList
                                    key={i}
                                    id={i}
                                    name={tab.name}
                                    isActive={activeTab === i}
                                    activeBgCss="bg-[#0ab99b] "
                                    change={() => {
                                        handleTabClick(i);
                                        TriggerExternalCall(tab.setAppDate);
                                    }}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <></>
                )}
                <div className="flex w-4/12 justify-end items-center">
                    <select
                        name="selectedDoctor"
                        className="border-transparent p-3 border-b-black focus:border-b-black  ring-0 outline-0 hover:ring-0 hover:outline-0 focus:ring-0 focus:outline-0 focus:border-transparent"
                        placeholder="Filter By Attending Doctor "
                        onChange={(e) => {
                            TriggerExternalCall(undefined, e.target.value);
                        }}
                    >
                        <option value="" disabled>Filter By Attending Doctor &nbsp;&nbsp;&nbsp;&nbsp;</option>
                        <option value="0">All &nbsp;&nbsp;&nbsp;&nbsp;</option>
                        {doctors?.length > 0 &&
                            doctors.map((doctor) => {
                                return (
                                    <option key={doctor._id} value={doctor._id}>
                                        {doctor.firstName} {doctor.lastName}
                                    </option>
                                );
                            })}
                        {/* <option>Dr. James ldskf</option> */}
                    </select>
                </div>
            </div>
            <div className="mt-px">
                <QueryClientProvider client={queryClient}>
                    <Table
                        headerColumn={columns}
                        serverCall={fetchUsersData}
                        rowClick={rowClick}
                        showRow={5}
                        tabButton={tabButton}
                        showHeader={false}
                        showFilter={false}
                        tableBg={""}
                        defaultKeywords={
                            {
                                text: '',
                                option: {
                                    status: 'Upcoming',
                                    appDate: { date: dayjs().format("YYYY-MM-DD") },
                                    doctor: null
                                }
                            }
                        }
                        externalCall={externalCall}
                    />
                </QueryClientProvider>
            </div>
        </div>
    );
}
