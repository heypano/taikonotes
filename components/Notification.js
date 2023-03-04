import { memo, useEffect, useState } from "react";
import { useNotification } from "../redux/errorSlice";

const colorMap = {
  warning: "text-yellow-500",
  error: "text-red-500",
  success: "text-green-500",
};

function Notification() {
  const {
    notificationType = "success",
    notificationMessage,
    updateFlag,
  } = useNotification();
  const [animationClass, setAnimationClass] = useState();

  useEffect(() => {
    // Whenever the updateflag changes that means a new message was set
    // so we reset the animation
    // (we want this to trigger even if it's the same message)
    setAnimationClass("animate-slowFadeOut");
  }, [updateFlag]);

  return (
    <div
      className={`opacity-0 ${colorMap[notificationType]} ${animationClass}`}
      onAnimationEnd={() => {
        // Remove the animation class so that it can retrigger
        setAnimationClass("");
      }}
    >
      {notificationMessage}
    </div>
  );
}

export default memo(Notification);
