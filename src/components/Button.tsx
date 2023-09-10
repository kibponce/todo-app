import { FC, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | JSX.Element | JSX.Element[];
}

const Button: FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button className="h-full" {...props}>
      {label}
    </button>
  );
};

export default Button;
