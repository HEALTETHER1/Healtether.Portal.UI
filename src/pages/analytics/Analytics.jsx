import { useEffect, useRef, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  getGenderRatio,
  getPatientAgeGroup,
  getPatientAppointmentAnalyasis,
} from "../../services/analyatics/analyatics";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DefaultTextboxClass from "../../utils/Classes";

import dayjs from "dayjs";

import moment from "moment";

const Analytics = () => {
  const [labels, setLabels] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [ageGroupLabelData, setAgeGroupLabelData] = useState([]);
  const [ageGroupLabel, setAgeGroupLabel] = useState([]);
  const [patientAnalysisLabel, setPatientAnalysisLabel] = useState([]);
  const [repeatedPatient, setRepeatedPatient] = useState([]);
  const [newPatient, setNewPatient] = useState([]);
  const [patientAnalysisType, setPatientAnalysisType] = useState("monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getPatientAppointmentAnalysis = async () => {
    const data = await getPatientAppointmentAnalyasis(
      patientAnalysisType,
      startDate,
      endDate
    );
    const result = data.data;

    if (result.length > 0) {
      if (patientAnalysisType == "weekly") {
        setPatientAnalysisLabel(data.data.map((item) => item.weekday));
      } else if (patientAnalysisType == "monthly") {
        setPatientAnalysisLabel(data.data.map((item) => item.month));
      } else if (patientAnalysisType == "custom") {
        setPatientAnalysisLabel(
          data.data.map((item) => moment(item.date).format("MMM DD"))
        );
      }
      setNewPatient(data.data.map((item) => item.newPatients));
      setRepeatedPatient(data.data.map((item) => item.repeatedPatients));
    } else {
      console.error("no filter data available");
    }
  };

  const patientRatio = {
    labels: patientAnalysisLabel,
    datasets: [
      {
        label: "New Patient",
        backgroundColor: "#32856E",
        // backgroundColor:'#202741',
        fill: false,
        lineTension: 0.5,
        borderColor: "#32856E",
        borderWidth: 3,
        data: newPatient,
      },
      {
        label: "Repeated Patient",
        backgroundColor: "#85F8D5",
        data: repeatedPatient,
        fill: false,
        lineTension: 0.5,
        borderColor: "#85F8D5",
        borderWidth: 2,
      },
    ],
  };

  const patientRatioOption = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Patient's Ratio",
        align: "start",
        padding: { top: 10 },
        color: "black",
        font: { size: "18px", weight: "400" },
      },
    },
    scales: {
      y: {
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
        },
      },
    },
  };

  // gender ratio api
  const GenderRatio = async () => {
    const data = await getGenderRatio(patientAnalysisType, startDate, endDate);
    if (data.data.length > 0) {
      let arr = [0, 0, 0];
      for (let i = 0; i < data.data.length; i++) {
        let perc = data.data[i].percentage.toFixed(2);
        if (data.data[i].gender == "Male") {
          arr[0] = perc;
        } else if (data.data[i].gender == "Female") {
          arr[1] = perc;
        } else {
          arr[2] = perc;
        }
      }
      setLabelData(arr);
      setLabels(["Male", "Female", "Other"]);
    } else {
      console.error("no filter data available");
    }
  };

  // Gender Ratio
  const genderRatio = {
    labels: labels,
    datasets: [
      {
        backgroundColor: ["#85F8D5", "#44B092", "#205C4C"],
        fill: false,
        lineTension: 0.5,
        borderRadius: 7,
        borderSkipped: false,
        data: labelData,
        categoryPercentage: 1.0,
        datalabels: {
          color: "white",
          align: "left", // Center align the data labels
          font: { size: "18px", family: "Open Sans", weight: "400" },
          formatter: (value, context) => {
            const index = context.dataIndex;
            let labelData2 = labelData[index];
            return labelData2 + "%";
          },

          labels: {
            title: {
              font: {
                weight: "bold",
              },
            },
          },
        },
      },
    ],
  };

  const genderRatioOption = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Gender Ratio",
        align: "start",
        font: { size: "18px", weight: "400" },
        padding: { top: 10, bottom: 50 },
        color: "black",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 20,
          // display:false
          font: {
            size: 17,
          },
          color: "black",
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        suggestedMin: 0,
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  // Age Group

  const PatientAgeGroup = async () => {
    const data = await getPatientAgeGroup(
      patientAnalysisType,
      startDate,
      endDate
    );

    const result = data.data;
    if (result.length > 0) {
      let arr = [0, 0, 0];
      for (let i = 0; i < data.data.length; i++) {
        let count = data.data[i].count;
        if (data.data[i].ageGroup == "0-15 yrs") {
          arr[0] = count;
        } else if (data.data[i].ageGroup == "16-40 yrs") {
          arr[1] = count;
        } else if (data.data[i].ageGroup == "41-60 yrs") {
          arr[2] = count;
        } else {
          arr[3] = count;
        }
      }
      setAgeGroupLabelData(arr);
      setAgeGroupLabel(["0-15 yrs", "16-40 yrs", "41-60 yrs", "61+ yrs"]);
    } else {
      console.error("no filter data available");
    }
  };

  const ageGroup = {
    labels: ageGroupLabel,
    datasets: [
      {
        backgroundColor: ["#85F8D5", "#5DDCB8", "#44B092", "#205C4C"],
        fill: false,
        lineTension: 0.5,
        borderRadius: 5,
        borderSkipped: false,
        data: ageGroupLabelData,
        categoryPercentage: 1.0,
        axis: "y",
        datalabels: {
          color: "white",
          align: "top", // Center align the data labels
          font: { size: "18px", weight: "400" },
          formatter: (value, context) => {
            // Add percentage sign to data labels
            return value + "%" + "";
          },
          labels: {
            title: {
              font: {
                weight: "bold",
              },
            },
          },
        },
      },
    ],
  };

  const ageGroupOption = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Age group Analysis",
        align: "start",
        font: { size: "18px", weight: "400" },
        padding: { top: 10, bottom: 50 },
        color: "black",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          // padding:100,
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        suggestedMin: 0,
        ticks: {
          // display:false,
          font: {
            size: 17,
          },
          color: "black",
        },
        border: {
          display: false,
        },
      },
    },
  };

  // Appointment Booking Analysis
  const appointmentBooking = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "By Whatsapp Assistance",
        backgroundColor: "#44B092",
        fill: false,
        lineTension: 0.5,
        borderColor: "#44B092",
        borderWidth: 2,
        data: [25, 27, 35, 37, 40, 45, 50, 73, 48, 45, 43, 44],
      },
      {
        label: "In The Hospitals",
        backgroundColor: "#85F8D5",
        data: [30, 34, 37, 52, 55, 63, 67, 70, 73, 76, 80, 85],
        fill: false,
        lineTension: 0.5,
        borderColor: "#85F8D5",
        borderWidth: 2,
      },
    ],
  };

  const appointmentBookingOption = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Appointment Booking Analysis",
        align: "start",
        padding: { top: 10 },
        color: "black",
        font: { size: "18px", weight: "400" },
      },
    },
    scales: {
      y: {
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
        },
      },
    },
  };

  // Appointment Analysis
  const appointmentAnalysis = {
    labels: ["Completed", "Cancelled", "Reschedule"],
    datasets: [
      {
        backgroundColor: ["#85F8D5", "#44B092", "#205C4C"],
        fill: false,
        lineTension: 0.5,
        borderRadius: 5,
        borderSkipped: false,
        data: [58, 42, 10],
        datalabels: {
          color: "white",
          align: "left", // Center align the data labels
          font: { size: "18px", weight: "400" },
          formatter: (value, context) => {
            // Add percentage sign to data labels
            return value + "%" + "  ";
          },
          labels: {
            title: {
              font: {
                weight: "bold",
              },
            },
          },
        },
      },
    ],
  };

  const appointmentAnalysisOption = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Appointment Analysis",
        align: "start",
        font: { size: "18px", weight: "500" },
        padding: { top: 10, bottom: 20 },
        color: "black",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 30,
          // display:false
          font: {
            size: 17,
          },
          color: "black",
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        suggestedMin: 0,
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  // Mode of Payment
  const paymentMode = {
    labels: ["Cash", "UPI", "Card"],
    datasets: [
      {
        backgroundColor: ["#85F8D5", "#44B092", "#205C4C"],
        fill: false,
        lineTension: 0.5,
        borderRadius: 5,
        borderSkipped: false,
        data: [10, 60, 30],
        categoryPercentage: 1.0,
        datalabels: {
          color: "white",
          align: "left", // Center align the data labels
          font: { size: "18px", weight: "400" },
          formatter: (value, context) => {
            // Add percentage sign to data labels
            return value + "%" + " ";
          },
          labels: {
            title: {
              font: {
                weight: "bold",
              },
            },
          },
        },
      },
    ],
  };

  const paymentModeOption = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Mode Of Payments",
        align: "start",
        font: { size: "18px", weight: "400" },
        padding: { bottom: 50, top: 20 },
        color: "black",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 30,
          // display:false
          font: {
            size: 17,
          },
          color: "black",
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        suggestedMin: 0,
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  // Age Group
  const paymentAnalysis = {
    labels: ["Consultation Fee", "Procedure Fee"],
    datasets: [
      {
        backgroundColor: ["#44B092", "#205C4C"],
        fill: false,
        lineTension: 0.5,
        borderRadius: 5,
        borderSkipped: false,
        data: [90, 10],
        categoryPercentage: 1.0,
        axis: "y",
        datalabels: {
          color: "white",
          labels: {
            title: {
              font: {
                size: "20px",
                weight: "bold",
              },
            },
          },
        },
      },
    ],
  };

  const paymentAnalysisOption = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Payments analysis",
        align: "start",
        font: { size: "20px", weight: "400" },
        padding: { bottom: 50, top: 20 },
        color: "black",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          // padding:10,
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        suggestedMin: 0,
        ticks: {
          font: {
            size: 15,
          },
          color: "black",
        },
        border: {
          display: false,
        },
      },
    },
  };
  const [analysis, setAnalysis] = useState(1);
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate < endDate) {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
  };

  const dateInputRef = useRef(null);
  const handleButtonClick = () => {
    dateInputRef.current.showPicker();
    setPatientAnalysisType("custom");
  };

  useEffect(() => {
    getPatientAppointmentAnalysis();
    GenderRatio();
    PatientAgeGroup();
  }, [startDate, endDate,patientAnalysisType]);


  return (
    <div className="">
      <div className="flex h-10 mt-3 text-[#585858]  justify-between items-center">
        <div className="flex">
          <button
            className={`py-2.5 px-3    rounded-lg mr-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]  ${
              analysis === 1 ? "text-white bg-[#32856E]" : "bg-[#F9F4FE]"
            }`}
            onClick={() => {
              setAnalysis(1);
            }}
          >
            Patient Analysis
          </button>
          <button
            className={`py-2.5 px-3    rounded-lg mr-3  shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] ${
              analysis === 2 ? "text-white bg-[#32856E]" : "bg-[#F9F4FE]"
            }`}
            onClick={() => {
              setAnalysis(2);
            }}
          >
            Payment Analysis
          </button>
          <button
            className={`py-2.5 px-3   rounded-lg mr-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]  ${
              analysis === 3 ? "text-white bg-[#32856E]" : "bg-[#F9F4FE]"
            }`}
            onClick={() => {
              setAnalysis(3);
            }}
          >
            Appointment Analysis
          </button>
          <div>
          </div>
        </div>
      </div>

      {/* Patient Analysis  */}

      <div
        className={`flex flex-col md:mt-4 px-6 mb-4 ${
          analysis === 1 ? "" : "hidden"
        }`}
      >
        <div className="flex h-10 justify-between items-center text-sm lg:text-base">
          <h1 className="text-md text-gray-600">Patient&apos;s Analysis</h1>
          <div className="flex">
            <button
              className={`p-2.5 mx-2  rounded-lg mr-1 ${
                patientAnalysisType != "weekly"
                  ? "bg-[#F9F4FE]"
                  : "text-white bg-[#32856E]"
              }  shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]`}
              onClick={() => setPatientAnalysisType("weekly")}
            >
              Weekly
            </button>
            <button
              className={`p-2.5 mx-2  rounded-lg mr-1 ${
                patientAnalysisType != "monthly"
                  ? "bg-[#F9F4FE]"
                  : "text-white bg-[#32856E]"
              } shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]`}
              onClick={() => setPatientAnalysisType("monthly")}
            >
              Monthly
            </button>
            <div className="relative">
              <button
                type="button"
                className={`p-2.5 mx-2 rounded-lg mr-1 ${
                  patientAnalysisType !== "custom"
                    ? "bg-[#F9F4FE]"
                    : "text-white bg-[#32856E]"
                } shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]`}
                onClick={() => handleButtonClick()}
              >
                Custom
              </button>

              <input
                type="date"
                name="dateRange"
                ref={dateInputRef}
                onChange={(e) => handleDateChange(e)}
                min="2024-01-01"
                placeholder="Select Date Range"
                autoComplete="off"
                style={{  colorScheme: "green" }}
                className={
                  DefaultTextboxClass +
                  " w-full leading-8 disabled:opacity-75 absolute left-[20px] bg-[#fff]  focus:ring-2 focus:ring-[#32856E] text-[#32856E] disabled:cursor-not-allowed collapse"
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-4 lg:h-90 h-[45vh] px-[5%] py-4  rounded-lg shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
          <Line data={patientRatio} options={patientRatioOption} />
        </div>
        <div className="flex justify-between w-auto">
          <div className=" mt-5 lg:h-86 h-[50vh] rounded-lg text-center lg:px-20 px-[10%] w-[48%]  shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
            <Bar
              data={genderRatio}
              options={genderRatioOption}
              plugins={[ChartDataLabels]}
            />
          </div>
          <div className=" mt-5 lg:h-86 h-[50vh] rounded-lg lg:px-20 w-[48%] shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] ">
            <Bar
              data={ageGroup}
              options={ageGroupOption}
              plugins={[ChartDataLabels]}
            />
          </div>
        </div>
      </div>

      {/* Appointment Analysis  */}
      <div
        className={`flex flex-col md:mt-4 px-6 mb-4 ${
          analysis === 3 ? "" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center text-sm lg:text-base mb-4">
          <h1 className="text-md text-gray-600">Appoinment Analysis</h1>
          <div className="flex">
            <button className="p-2.5 mx-2  bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Yearly
            </button>
            <button className="p-2.5 mx-2 bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Monthly
            </button>
            <button className="p-2.5 mx-2 bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Weekly
            </button>
            <button className="p-2.5 mx-2 bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Daily
            </button>
            <button className="p-2.5 mx-2 bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Custom
            </button>
          </div>
        </div>

        <div className="mt-4 lg:h-90 h-[45vh] px-[5%] py-6 p-[10%] rounded-lg shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
          <Line data={appointmentBooking} options={appointmentBookingOption} />
        </div>
        <div className="flex justify-between w-auto">
          <div className=" mt-5 lg:h-86 h-[50vh] rounded-lg lg:px-10 w-[48%]  shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] ">
            <Bar
              data={appointmentAnalysis}
              options={appointmentAnalysisOption}
              plugins={[ChartDataLabels]}
            />
          </div>
        </div>
      </div>

      {/* Payments Analysis  */}
      <div
        className={`flex flex-col md:mt-4 px-6 mb-4 ${
          analysis === 2 ? "" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center text-sm lg:text-base mb-4">
          <h1 className="text-md text-gray-600">Payment Analysis</h1>
          <div className="flex">
            <button className="p-2.5 mx-2 bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Today
            </button>
            <button className="p-2.5 mx-2  bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Yearly
            </button>
            <button className="p-2.5 mx-2 bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Monthly
            </button>
            <button className="p-2.5 mx-2 bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Weekly
            </button>

            <button className="p-2.5 mx-2 bg-[#F9F4FE]  rounded-lg mr-1 focus:text-white focus:bg-[#32856E] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
              Custom
            </button>
          </div>
        </div>

        <div className="flex justify-between w-auto text-xl">
          <div className="bg-[#F8F7FC] rounded-lg flex w-[49%] p-[2%] lg:p-[6%] items-start justify-center shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
            <p className="w-[45%] text-gray-600">Total Revenue Collected</p>
            <h2 className="text-[#606060] text-5xl">
              ₹ <span className="text-[#110C2C]">5.2K</span>
            </h2>
          </div>
          <div className="bg-[#F8F7FC] rounded-lg flex w-[49%] p-[2%] lg:p-[6%] items-start justify-center shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
            <p className="w-[53%]  text-gray-600">
              Total money deposited in Bank
            </p>
            <h2 className="text-[#606060] text-5xl">
              ₹ <span className="text-[#110C2C]">5K</span>
            </h2>
          </div>
        </div>
        <div className="flex justify-between w-auto ">
          <div className=" rounded-lg mt-10 lg:h-[55vh] h-[50vh] px-[2%] lg:px-[10%] w-[48%]  shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
            <Bar
              data={paymentMode}
              options={paymentModeOption}
              plugins={[ChartDataLabels]}
            />
          </div>
          <div className="rounded-lg mt-10 lg:h-[55vh] h-[50vh] px-[2%] lg:px-[10%] w-[48%] shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]  pb-[6%]">
            <Bar
              data={paymentAnalysis}
              options={paymentAnalysisOption}
              plugins={[ChartDataLabels]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
