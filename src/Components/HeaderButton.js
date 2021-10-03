import React, { memo } from "react";
import Button from "./Button";

const HeaderButton = ({ ...props }) => <Button className="p-3" {...props} />;
export default memo(HeaderButton);
