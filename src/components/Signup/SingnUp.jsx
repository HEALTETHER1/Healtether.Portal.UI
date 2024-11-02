import singnupimage from "../assets/signupasset.png";
import polygon1 from "../../../../assets/Polygon_1.png";
import polygon2 from "../../../../assets/Polygon_2.png";
import arrow from "../../../../assets/Arrow.png";

function SignUp() {
  return (
    <div className="flex flex-row">
      <div className="bg-[#19D2AF] rounded-tr-[120px] rounded-bl-[120px] h-[100vh] w-[680px] ">
        <div>
          <img
            src={polygon1}
            alt=""
            height={400}
            width={364}
            className="absolute inset-0 left-[10%] object-cover "
          />
          <img
            src={polygon2}
            alt=""
            height={293}
            width={269}
            className="relative left-[185px] top-6"
          />
        </div>
        <div className="relative">
          <img
            src={singnupimage}
            alt=""
            height={616}
            width={415}
            className="absolute left-[100px] top-[-75px]"
          />
          <div className="absolute top-[200px] left-[145px] [font-family:'Arimo']  font-normal text-[#1E1E36] text-[16px] tracking-[0.40px] leading-[22.4px]">
            Powered by HealTether
          </div>
        </div>
      </div>
      <div className="h-[857px] w-[700px] flex flex-col mt-[12rem] ml-[10rem]">
        <div className="w-[480px] [font-family:'Poppins'] text-[#1E1E36] text-[2rem] font-[500] leading-[139.99%] tracking-[0.05625rem]">
          Welcome to our Community!
        </div>
        <div className=" [font-family:'Poppins'] text-[#1E1E36] text-[1rem] font-normal leading-[139.99%] tracking-[0.025rem]">
          We need some details to get you sign up!
        </div>

        <div className=" [font-family:'Poppins'] text-[#1E1E36] text-[1rem] font-normal leading-[139.99%] tracking-[0.025rem]">
          This will take just a moment.
        </div>

        <div className="mt-3 mb-3 border border-gray-300 rounded-md p-2 w-[60%]">
          <select className="border-none outline-none w-full">
            <option
              disabled="disabled"
              selected="selected"
              className="[font-family:'Arimo'] font-normal"
            >
              Select an clinic
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div>
          <button className="[font-family:'Arimo']  font-bold inline-flex items-center justify-center px-[26px] py-[12px] bg-[#009394] rounded-[8px] box-border text-white gap-[8px]">
            Let&apos;s go <img src={arrow} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
