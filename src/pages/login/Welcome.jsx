import { useState } from "react";
import switch_clinic from "assets/images/switchclinic.png";
import arrow from "assets/images/Arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentClinic } from "../../store/slice/ClinicSlice";
import { useNavigate } from "react-router-dom";
import { DefaultSelectboxClass } from "../../utils/Classes";

function Welcome() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [selectClinic, SetSelectClinic] = useState("0");
  const [listClients, setlistClients] = useState(user.linkedClinics);
  const dispatch = useDispatch();

  const SetCurrentClinic = () => {
    let clinics = [...listClients];
    if (clinics.length > 0)
      for (let index = 0; index < clinics.length; index++) {
        if (clinics[index].clinic._id == selectClinic) {
          dispatch(setCurrentClinic({ ...clinics[index].clinic }));
          navigate("/Dashboard");
          return;
        }
      }
  };
  return (
    <div className="flex flex-row font-['Montserrat'] h-screen  font-medium">
      <div className="w-6/12">
        <img src={switch_clinic} className="w-full h-full" alt="" />
      </div>
      <div className="w-6/12 flex flex-col mt-[12rem] ml-[10rem]">
        <div className="w-[480px]  text-[#1E1E36] text-[2rem] font-[500] leading-[139.99%] tracking-[0.05625rem]">
          Welcome to our Community!
        </div>
        <div className="text-[#1E1E36] text-[1rem] font-normal leading-[139.99%] tracking-[0.025rem]">
          We need some details to get you sign up!
        </div>

        <div className=" text-[#1E1E36] text-[1rem] font-normal leading-[139.99%] tracking-[0.025rem]">
          This will take just a moment.
        </div>

        <div className="mt-3 mb-3 w-[60%]">
          <select
            className={DefaultSelectboxClass + " w-full text-lg"}
            defaultValue={selectClinic}
            onChange={(e) => SetSelectClinic(e.target.value)}
          >
            <option disabled="disabled" className=" font-normal" value="0">
              Select Clinic
            </option>
            {listClients != null && listClients.length > 0 ? (
              listClients.map((item) => (
                <option value={item?.clinic?._id} key={item?.clinic?._id}>
                  {item?.clinic?.clinicName}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        </div>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => SetCurrentClinic()}
            className="font-bold inline-flex items-center justify-center px-[26px] py-[12px] bg-[#009394] box-border text-white gap-[8px]"
          >
            Let&apos;s go
            <img src={arrow} alt="" />
          </button>

          {listClients == null || listClients.length == 0 ? (
            <button className="font-bold border inline-flex items-center justify-center px-[26px] py-[12px] border-[#009394] text-[#009394] box-border text-white gap-[8px]">
              Login with other account
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;

// export function DynamicSelectDropdown({listOfClients,defaultText}){ const
// [clients,SetClients]=useState(listOfClients!=null?listOfClients:[]);   return
// ( <select className={DefaultTextboxClass+ " w-full text-lg"}>   <option
// disabled="disabled" selected="selected" className="
// font-normal">{defaultText}</option>   {clients.map((item,i) =>     <option
// value={item._id}>{item.clinicName}</option>     )} </select>) }
