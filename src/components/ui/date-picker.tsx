import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { useState } from "react"
import { Label } from "./label"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"

type TDatePicker<T> = {
   label?: string;
   variant?: 'default' | 'filter';
   placeholder?: string;
   className?: string;
   helperText?: string;
   disabledDates?: (date: Date) => boolean;
   name: Path<T extends FieldValues ? T : Record<string, unknown>>;
   control: Control<T extends FieldValues ? T : Record<string, unknown>, unknown>;
   readOnly?: boolean;
   tooltipMessage?: string;
};

export function DatePicker<T extends unknown>({
   control,
   name,
   placeholder,
   label,
   readOnly = false,
   className,
   helperText,
   disabledDates,
   tooltipMessage,
}: TDatePicker<T>) {
   const [open, setOpen] = useState(false);
   const hasError = !!helperText;

   return (
      <Controller
         name={name}
         control={control}
         render={({ field: { value, onChange, ref } }) => {
            return (
               <div
                  className={cn(
                     'flex flex-col gap-2 w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring relative',
                     className
                  )}
               >
                  {label && <Label>{label}</Label>}

                  <Popover open={open} onOpenChange={setOpen}>
                     <TooltipProvider delayDuration={0}>
                        {readOnly ? (
                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <PopoverTrigger asChild disabled={readOnly}>
                                    <button
                                       type="button"
                                       ref={ref}
                                       className={cn(
                                          "relative flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm items-center",
                                          "pl-10",
                                          open &&
                                          "border-action-hover-on-color ring-2 ring-action-hover-on-color/30",
                                          hasError &&
                                          "border-alert-error focus:border-alert-error hover:border-alert-error focus:ring-alert-error/30",
                                          className
                                       )}
                                    >
                                       <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                       {value ? (
                                          <span className="text-content-text truncate">
                                             {format(value, "PPP")}
                                          </span>
                                       ) : (
                                          <span className="text-muted-foreground">
                                             {placeholder}
                                          </span>
                                       )}
                                    </button>
                                 </PopoverTrigger>
                              </TooltipTrigger>
                              <TooltipContent>
                                 <p>{tooltipMessage}</p>
                              </TooltipContent>
                           </Tooltip>
                        ) : (
                           <PopoverTrigger asChild disabled={readOnly}>
                              <button
                                 type="button"
                                 ref={ref}
                                 className={cn(
                                    "relative flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm items-center",
                                    "pl-10",
                                    open &&
                                    "border-action-hover-on-color ring-2 ring-action-hover-on-color/30",
                                    hasError &&
                                    "border-alert-error focus:border-alert-error hover:border-alert-error focus:ring-alert-error/30",
                                    className
                                 )}
                              >
                                 <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                 {value ? (
                                    <span className="text-content-text truncate">
                                       {format(value, "PPP")}
                                    </span>
                                 ) : (
                                    <span className="text-muted-foreground">
                                       {placeholder}
                                    </span>
                                 )}
                              </button>
                           </PopoverTrigger>
                        )}
                     </TooltipProvider>

                     <PopoverContent className="w-auto p-0 border border-background-primary bg-background-full-white">
                        <Calendar
                           mode="single"
                           selected={value}
                           onSelect={onChange}
                           initialFocus
                           disabled={disabledDates}
                        />
                     </PopoverContent>
                  </Popover>

                  {hasError && (
                     <p className="text-xs text-chart-5 font-normal absolute -bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {helperText}
                     </p>
                  )}
               </div>
            );
         }}
      />
   );
}
