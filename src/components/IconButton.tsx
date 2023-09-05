import React from "react";

export interface IconButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  icon: JSX.Element;
}

function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <button className="h-full" {...props}>
      {icon}
    </button>
  );
}

export default IconButton;
