import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DefaultTextboxClass, { DefaultPrescriptionDetailDivClass } from "../../../utils/Classes";
import ContainerHeading from "components/detail-page/ContainerHeading.jsx";

function VitalDetail({ vitalsObj }) {
  const [bmi, setBmi] = useState();
  const [weight, setweight] = useState();
  const [height, setheight] = useState();

  function calculateBmi(weight, height, set) {
    const heightInM = (height || 0) / 100;
    const bmi = (weight || 0) / Math.pow(heightInM, 2);
    const roundedBmi = isNaN(bmi) ? 0 : bmi.toFixed(2);
    if (set) {
      setBmi(roundedBmi == Infinity ? "---" : roundedBmi);
    }
    return (roundedBmi == Infinity ? "---" : roundedBmi);
  }

  useEffect(() => {
    calculateBmi(weight|| vitalsObj.weight ,height|| vitalsObj.height,true);
  }, [weight, height]);

  var cBMI= calculateBmi(vitalsObj?.weight, vitalsObj?.height);

  return (
    <section className="flex flex-col gap-3 me-[1%]">
      <ContainerHeading heading={"Vitals"} />

      <div className="w-full flex gap-4  flex-wrap md:flex-nowrap">

        <div className={DefaultPrescriptionDetailDivClass + " w-full md:w-1/2  items-center"}>
          <p className="w-1/4">
            Blood Pressure
          </p>
          <div className="flex w-3/4 items-center justify-evenly gap-2">
            <input
              type="number"
              name="vitals_bloodPressure_systolic"
              placeholder="120"
              defaultValue={vitalsObj?.bloodPressure?.systolic}
              className={
                "w-2/4 " + DefaultTextboxClass
              }
            />
            <p className="text-base font-normal text-black">/</p>
            <input
              type="number"
              placeholder="80"
              name="vitals_bloodPressure_diastolic"
              defaultValue={vitalsObj?.bloodPressure?.diastolic}
              className={
                "w-2/4 " + DefaultTextboxClass
              }
            />
            <p>mmHg</p>
          </div>

        </div>

        {/*rbs*/}
        <div className={DefaultPrescriptionDetailDivClass + " w-full md:w-1/2  items-center"}>
          <p className="w-1/4">RBS</p>
          <input
            type="number"
            name="vitals_rbs"
            placeholder="60"
            defaultValue={vitalsObj?.rbs}
            className={
              "w-3/4 " + DefaultTextboxClass
            }
          />
          <p>mg/dL</p>
        </div>
      </div>


      <div className="w-full flex gap-4  flex-wrap md:flex-nowrap">

        <div className={DefaultPrescriptionDetailDivClass + " w-full md:w-1/2  items-center"}>
          <p className="w-1/4">SpO2 levels</p>
          <input
            type="number"
            name="vitals_spo2"
            placeholder="95"
            defaultValue={vitalsObj?.spo2}
            className={
              "w-3/4 " + DefaultTextboxClass
            }
          />
          <p>%</p>
        </div>

        <div className={DefaultPrescriptionDetailDivClass + " w-full md:w-1/2  items-center"}>
          <p className="w-1/4">Pulse Rate</p>
          <input
            type="number"
            name="vitals_pulseRate"
            defaultValue={vitalsObj?.pulseRate}
            placeholder="60"
            className={
              "w-3/4 " + DefaultTextboxClass
            }
          />
          <p >beats/min</p>
        </div>
      </div>


      <div className="w-full flex gap-4  flex-wrap md:flex-nowrap">
        <div className={DefaultPrescriptionDetailDivClass + " w-full md:w-1/2  items-center"}>
          <p className="w-1/4">Temperature</p>
          <input
            type="number"
            name="vitals_temperature"
            placeholder="95"
            defaultValue={vitalsObj?.temperature}
            className={
              "w-3/4 " + DefaultTextboxClass

            }
          />
          <p><sup>&#176;</sup>F</p>
        </div>
        <div className={DefaultPrescriptionDetailDivClass + " w-full md:w-1/2  items-center"}>
          <p className="w-1/4">Respiratory Rate</p>
          <input
            type="number"
            name="vitals_respiratoryRate"
            defaultValue={vitalsObj?.respiratoryRate}
            placeholder="60"
            className={
              "w-3/4 " + DefaultTextboxClass

            }
          />
          <p>breaths/min</p>
        </div>
      </div>
      <div className="w-full flex gap-4  flex-wrap md:flex-nowrap">
        <div className={DefaultPrescriptionDetailDivClass + " w-full md:w-1/2  items-center"}>
          <p className="w-1/4">Height</p>
          <input
            type="number"
            name="vitals_height"
            placeholder="160"
            defaultValue={vitalsObj?.height}
            onChange={(e)=>{
              setheight(e.target.value)
            }}
            className={
              "w-3/4 " + DefaultTextboxClass

            }
          />
          <p >cm</p>
        </div>
        <div className={DefaultPrescriptionDetailDivClass + " w-full md:w-1/2  items-center"}>
          <p className="w-1/4">Weight</p>
          <input
            type="number"
            name="vitals_weight"
            placeholder="60"
            defaultValue={vitalsObj?.weight}
            onChange={(e)=>{
              setweight(e.target.value)
            }}
            className={
              "w-3/4 " + DefaultTextboxClass

            }
          />
          <p >Kg</p>
        </div>
      </div>
      <p className="text-sm font-normal">
        Your Body Mass Index is{" "}
        <span className="text-sm font-semibold">{bmi || cBMI}</span> kg/m2
      </p>
      <p className="sm font-normal">
        This is considered <span className="text-sm font-semibold">normal</span>
      </p>
    </section>
  );
}

// VitalDetail.propTypes = {
//   bp: PropTypes.object.isRequired,
//   rbs: PropTypes.object.isRequired,
//   spo2: PropTypes.object.isRequired,
//   pulseRate: PropTypes.object.isRequired,
//   temperature: PropTypes.object.isRequired,
//   respiratoryRate: PropTypes.object.isRequired,
//   height: PropTypes.object.isRequired,
//   weight: PropTypes.object.isRequired,
//   handleChange: PropTypes.func.isRequired,
// };

export default VitalDetail;
