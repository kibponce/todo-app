import { InputHTMLAttributes, useMemo } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize: "sm" | "md" | "lg";
  isError: boolean;
  errorMessage?: string;
}

function Input({ inputSize, isError, errorMessage, ...props }: InputProps) {
  const size = useMemo(() => {
    switch (inputSize) {
      case "sm":
        return "h-12  text-sm";
      case "md":
        return "h-14  text-md";
      case "lg":
        return "h-16  text-2xl";
      default:
        return "";
    }
  }, [inputSize]);

  return (
    <div>
      <div
        className={`flex mt-2 rounded-md shadow-sm h-18 border  ${
          isError ? "border-red-400" : "border-slate-400"
        }`}
      >
        <input
          className={`block w-full rounded-md border-0py-1.5 pl-4 pr-20 text-gray-90 focus:outline-none ${size}`}
          {...props}
        />
      </div>
      {isError && errorMessage && (
        <p className="text-sm mt-2 text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

export default Input;
