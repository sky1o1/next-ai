import { Controller, useFormContext } from "react-hook-form";
import { Input } from "antd";

export const InputField = ({
  name,
  type = "text",
  placeholder,
  label,
  required = false,
}: {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label>{required ? `${label} *` : label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label || name} is required` : false }}
        render={({ field }) => (
          <Input {...field} type={type} placeholder={placeholder} />
        )}
      />
      {errors[name] && (
        <p style={{ color: "red" }}>
          {errors[name]?.message as React.ReactNode}
        </p>
      )}
    </div>
  );
};
