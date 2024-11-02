import { InfinitySpin } from "react-loader-spinner";
function Loader({ width }) {
  let spinWidth = width != null ? width : "300";
  return (
    <div>
      <InfinitySpin width={spinWidth} color="#5351C7" />
    </div>
  );
}

export default Loader;
