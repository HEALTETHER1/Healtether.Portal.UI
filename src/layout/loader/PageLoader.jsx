import { ThreeCircles } from "react-loader-spinner";

export default function PageLoader()
{
    return (
        <>
        <div className="grid  h-full w-full bg-[#f7f4fa] bg-opacity-10 justify-items-center  items-center">
        <div className=''>
        <ThreeCircles
  height="100"
  width="100"
  color="#740ac7"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/></div>
        </div>
        </>
    );
}