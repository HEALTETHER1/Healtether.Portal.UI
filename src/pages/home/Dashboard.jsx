import { useEffect, useState } from "react";
import Table from "components/grid/Table";
import { GetAppointmentOverview } from "services/appointment/appointment";
import { QueryClient, QueryClientProvider } from "react-query";
import Clock from "react-live-clock";
import { Doughnut } from "react-chartjs-2";
import Action from "components/grid/Action";
import { useSelector } from "react-redux";
import { NamePill } from "components/grid/NamePill";
import { format } from "date-fns";
import { GetAppointmentCountToday } from "services/appointment/appointment";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const [pieData, setPieData] = useState([]);
  var isChartDataLoading = false;
  const navigation = useNavigate();
  function NavigateToFollowUpAndCancel(e, appointment) {
    navigation(
      "/patient/" +
        appointment.patientId +
        "/appointment/" +
        appointment._id +
        "/details"
    );
    e.stopPropagation();
  }
  const columns = [
    {
      Header: "Patient",
      accessor: "name",
    },
    {
      Header: "Contact",
      accessor: "mobile",
    },
    {
      Header: "Location",
      accessor: "virtualConsultation",
      Cell: NamePill,
      nameAccessor: (value) => {
        return value.virtualConsultation ? "Online" : "Physical";
      },
    },
    {
      Header: "TimeSlot",
      accessor: "timeSlot",
    },
    {
      Header: "Date",
      accessor: "appointmentDate",
      Cell: NamePill,
      nameAccessor: (value) => {
        return format(new Date(value.appointmentDate), "dd MMMM, yy");
      },
    },
    {
      Header: "Doctor",
      accessor: "doctorName",
    },
    {
      Header: "Payment Status",
      accessor: "payment",
    },
    {
      Header: "Action",
      Cell: Action,
      actionAccessor: [
        {
          name: "Whatsapp",
          iconClass: "icon-[ion--logo-whatsapp] text-xl text-Primary",
          callBack: () => {},
        },
        {
          name: "Follow & Cancel",
          iconClass:
            "icon-[gridicons--reader-following] text-xl text-Secondary",
          callBack: NavigateToFollowUpAndCancel,
        },
      ],
      idAccessor: "_id",
    },
  ];

  const fetchUsersData = async (
    page,
    pageSize,
    pageFilter,
    pageSortBy,
    setData
  ) => {
    let paramStr = "";
    if (pageFilter?.text?.trim().length > 1 &&
    pageFilter?.text != "ClearAllFilter") {
      paramStr = `&keyword=${pageFilter.text}`;
    }
    if (pageSortBy.length > 0) {
      const sortParams = pageSortBy[0];
      const sortyByDir = sortParams.desc ? "desc" : "asc";
      paramStr = `${paramStr}&sortby=${sortParams.id}&direction=${sortyByDir}`;
    }
    try {
      var res = await GetAppointmentOverview(page + 1, pageSize, paramStr);
      const results = res.data;
      const data = {
        results: results.data,
        count: results.totalCount,
      };
      return data;
    } catch (e) {
      throw new Error(`API error:${e?.message}`);
    }
  };
  //moment().format("dd");

  var defaultChart = {
    labels: ["Remaining", "Completed"],
    datasets: [
      {
        label: "Appointment",
        data: [0, 0],
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: ["rgb(83,81,199)", "rgb(228,224,243)"],
      },
    ],
  };
  const [chartData, setChartData] = useState(defaultChart);
  const options = {
    plugins: {
      legend: {
        display: false,
        // Set display to false to remove the key
      },
    },

    responsive: false,
    radius: "90%",
    cutout: "85%",
    aspectratio: 1,
  };
  useEffect(() => {
    if (!isChartDataLoading) {
      isChartDataLoading = true;
      const fetchData = async () => {
        var countToday = await GetAppointmentCountToday();
        setChartData({
          labels: ["Completed", "Remaining"],

          datasets: [
            {
              label: "Appointment",
              data: [countToday.data.completed, countToday.data.received],
              borderRadius: 0,
              borderWidth: 0,
              backgroundColor: ["rgb(83,81,199)", "rgb(228,224,243)"],
            },
          ],
        });
      };
      fetchData();
    }
  }, [pieData]);
  const rowClick = (row) => {
    navigation("/patient/viewpatient/" + row.patientId);
  };
  const queryClient = new QueryClient();
  return (
    <div className="mt-2">
      <div className="flex justify-between mb-6">
        <div className="gap-x-2">
          <span className="text-3xl capitalize text-TextPrimary ">
            Welcome, {user?.firstName + " " + user?.lastName}
          </span>
          <br />
          <span className="text-md text-BreadcrumbText ml-1">
            Your Smart Clinic is ready to use.
          </span>
          <div className="flex mt-6 ml-1 text-sm">
            <div className="w-1/3 space-y-3 text-TextPrimary font-normal">
              <div>
                <p className="text-BreadcrumbText ">Appointment status</p>
              </div>
              <div className="flex">
                <div className="bg-[#E4E0F3] h-5 w-5 shadow-xs border rounded "></div>
                &nbsp;&nbsp; Remaining
              </div>
              <div className="flex">
                <div className="bg-[#5351C7] h-5 w-5 shadow-xs border rounded "></div>
                &nbsp;&nbsp; Completed
              </div>
            </div>
            <div className="w-2/3">
              <Doughnut height={"100%"} data={chartData} options={options} />
            </div>
          </div>
        </div>
        <div className="justify-items-end">
          <div className="grid text-3xl place-content-end">
            <Clock format={"H:mm"} ticking={true} timezone={"Asia/Calcutta"} />
          </div>
          <span className="text-sm grid place-content-end">
            <Clock
              format={"dddd, DD MMMM"}
              ticking={true}
              timezone={"Asia/Calcutta"}
            />
          </span>
        </div>
      </div>

      <hr className="h-px block bg-gray-300"></hr>
      <div className="mt-4">
        <QueryClientProvider client={queryClient}>
          <Table
            headerColumn={columns}
            rowClick={rowClick}
            tableCaption={"Upcoming Appointments"}
            serverCall={fetchUsersData}
            showRow={5}
          />
        </QueryClientProvider>
      </div>
    </div>
  );
}
