import React from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  label: string | JSX.Element | JSX.Element[];
  color: string;
}

function Button({ label, color, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md px-12 py-1.5 my-1.5 mr-1.5 text-sm font-semibold text-white shadow-sm bg-blue-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
      {...props}
    >
      {label}
    </button>
  );
}

export default Button;
