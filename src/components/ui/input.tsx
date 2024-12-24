import * as React from "react"
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { cn } from "@/lib/utils"
import { Label } from "./label";

type InputProps<T> = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
  name: Path<T extends FieldValues ? T : Record<string, unknown>>
  control: Control<T extends FieldValues ? T : Record<string, unknown>, unknown>
  iconStart?: React.ElementType;
  iconEnd?: React.ElementType;
  iconClassName?: string;
}

export const Input = <T extends unknown>({
  label,
  helperText,
  name,
  control,
  className,
  iconEnd: IconEnd,
  iconStart: IconStart,
  iconClassName,
  ...props
}: InputProps<T>) => {
  const inputId = React.useId()
  const hasError = helperText && helperText?.length > 0;

  return (

    <div className={cn("flex flex-col gap-2 w-full relative", className)}>
      {label && (
        <div className={cn('flex items-center gap-2')}>
          <Label htmlFor={inputId}>
            {label}
          </Label>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Controller
          name={name!}
          control={control}
          render={({ field: { ref, value, onChange, ...field } }) => (
            <div className="relative w-full">
              {IconStart && (
                <IconStart className={cn('absolute left-3 top-1/2 transform -translate-y-1/2 size-5', iconClassName)} />
              )}
              <input
                id={inputId}
                onChange={e => onChange(e.target.value)}
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  IconStart && 'pl-10',
                  IconEnd && 'pr-10',
                  className
                )}
                {...field}
                {...props}
                ref={ref}
              />
              {IconEnd && (
                <IconEnd className={cn('absolute right-3 top-1/2 transform -translate-y-1/2 size-5', iconClassName)} />
              )}
            </div>
          )}
        />
      </div>
      {hasError && (
        <p className="text-xs text-chart-5 font-normal absolute -bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {helperText}
        </p>
      )}
    </div>
  )
}

