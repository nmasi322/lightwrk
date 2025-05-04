import { EyeClosedIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Control, Path } from "react-hook-form";
import { Button } from "./button";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type InputProps = React.ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, startIcon, endIcon, type, ...props }, ref) => {
    return (
      <div className="relative">
        {startIcon && (
          <div className="absolute bottom-0 left-1 top-1 flex h-8 min-w-8 items-center justify-center bg-[inherit]">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "text-base autofill:border-grey-400 autofill:shadow-[inset_0_0_0px_1000px_#fff]",
            "autofill:duration-[5000] autofill:transition-[background-color] autofill:delay-0 autofill:ease-in-out",
            "flex min-h-10 w-full border rounded-md px-3 border-grey-450 focus:border-grey-500 bg-transparent py-2 font-normal text-grey-800 shadow-none",
            "transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950",
            "placeholder:text-grey-400 focus-visible:outline-none focus:border-2 focus:border-[#1AA0E6] duration-500 transition-all ease-in-out",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            startIcon ? "pl-8" : "",
            endIcon ? "pr-8" : ""
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className="absolute bottom-0 right-1 top-1 flex h-8 min-w-8 items-center justify-center rounded-lg bg-white cursor-pointer">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ defaultValue, disabled, type = "password", ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);

    return (
      <Input
        ref={ref}
        type={inputType}
        placeholder="••••••••••"
        disabled={disabled}
        defaultValue={defaultValue}
        endIcon={
          <Button
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
            type="button"
            variant="ghost"
            className="h-8 bg-white"
            size="icon"
          >
            {inputType === "password" ? (
              <EyeClosedIcon className="text-grey-400" />
            ) : (
              <EyeOffIcon className="text-grey-400" />
            )}
          </Button>
        }
        {...props}
      />
    );
  }
);

interface InputFieldProps<T> extends Omit<InputProps, "value" | "name"> {
  control: Control;
  label: string;
  labelClassName?: string;
  name: Path<T>;
  disabled: boolean;
  serverError?: string[];
  defaultValue?: string | number;
  description?: string | React.ReactNode;
  labelEnd?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const InputField = <T,>(props: InputFieldProps<T>) => {
  const {
    labelClassName,
    label,
    labelEnd,
    name,
    control,
    type,
    description,
    ...restProps
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex items-center justify-between">
            <FormLabel
              className={cn(
                "text-sm text-grey-400 font-normal",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
            {labelEnd}
          </div>
          <FormControl>
            {type === "password" ? (
              <InputPassword
                // ref={ref}
                {...restProps}
                {...field}
              />
            ) : (
              <Input
                // ref={ref}
                type={type}
                {...restProps}
                {...field}
                onChange={(e) =>
                  type === "number"
                    ? field.onChange({ ...e, value: +e.target.value })
                    : field.onChange(e)
                }
              />
            )}
          </FormControl>
          <FormMessage />
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
        </FormItem>
      )}
    />
  );
};

InputField.displayName = "InputField";
InputPassword.displayName = "InputPassword";

export { Input, InputField };
