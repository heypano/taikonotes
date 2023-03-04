import { memo } from "react";
import Spin from "./Icons/Spin";

function Loader() {
  return <div className="w-full h-full flex items-center justify-center">
    <div className="w-48">
      <Spin />
    </div>
  </div>
}
export default memo(Loader);
