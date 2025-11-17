import { FieldError, UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const FormInput = ({
  label,
  name,
  type = "text",
  register,
  error,
}: FormInputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm font-medium text-[#0C0C0C]">{label}</span>
      <input
        type={type}
        {...register(name)}
        className="border border-[#D1D5DB] rounded-lg px-4 py-2 w-full outline-none text-[#0C0C0C] text-sm caret-[#0C0C0C]"
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};

export default FormInput;
