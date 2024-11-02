import { useEffect, useState } from "react";
import VitalDetail from "../../components/detail-page/vitals/vitalDetail";
import PersonalHistoryTextField from "components/detail-page/vitals/PersonalHistoryTextField.jsx";
import PropTypes from "prop-types";
import ContainerHeading from "components/detail-page/ContainerHeading.jsx";

export default function VitalsGeneralExamination({ vitalsObj,medicalHistoryObj }) {

  // State for personal history records
  const DefaultPersonalHistory = () => ({
    _id: Date.now().toString(),
    activity: "",
    activityNature: "",
    notes: ""
  });
  const [personelHistory, setPersonelHistory] = useState([DefaultPersonalHistory()]);
  const [vitalsDetail, setVitalsDetail] = useState({});
  useEffect(() => {
    if(medicalHistoryObj?.personalHistory?.length>0)
    {
      setPersonelHistory( medicalHistoryObj?.personalHistory);
    }
    else{
      setPersonelHistory([DefaultPersonalHistory()])
    }
    if(vitalsObj!=null)
    {
      setVitalsDetail(vitalsObj)
    }
   
  }, [medicalHistoryObj,vitalsObj]);

  // Modify personal history (add or remove)
  const modifyPersonelHistory = async (key, action) => {
    setPersonelHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const index = newHistory.findIndex((item) => item._id === key);

      if (action === "remove" && index > -1) {
        newHistory.splice(index, 1);
        if (newHistory.length === 0) {
          newHistory.push(DefaultPersonalHistory());
        }
      } else if (action === "add") {
        newHistory.push(DefaultPersonalHistory());
      }

      return newHistory;
    });

  };

  // Add a new personal history tab
  const addPersonelHistoryTab = (key) => {
    if (!personelHistory.some((entry) => entry.activity === key)) {
      modifyPersonelHistory(key, "add");
    }
  };



  return (
    <div className="my-5 flex flex-col gap-4">
      <VitalDetail vitalsObj={vitalsDetail}
       
      />
      <ContainerHeading heading={"Personal History"}/>
      <div className="mr-5">
        {personelHistory.map((value, i) => (
          
          <PersonalHistoryTextField
            key={value._id}
            index={i}
            activity={value.activity}
            notes={value.notes}
            activityNature={value.nature}
            handleAddChange={() => modifyPersonelHistory(null, "add")}
            handleDeleteChange={() =>
              modifyPersonelHistory(value._id, "remove")
            }
          
          />
        ))}
      </div>
    </div>
  );
}

VitalsGeneralExamination.propTypes= {
  isLoading: PropTypes.bool,
  vitalsObj:PropTypes.object,
  medicalHistoryObj:PropTypes.object
}
