import React from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  label: string | JSX.Element | JSX.Element[];
}

function Button({ label, ...props }: ButtonProps) {
  return (
    <button className="h-full" {...props}>
      {label}
    </button>
  );
}

export default Button;
