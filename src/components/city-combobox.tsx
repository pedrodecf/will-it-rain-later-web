import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { City } from "country-state-city";
import { Check, ChevronsUpDown } from "lucide-react";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

type CityComboboxProps<T extends FieldValues> = {
   label?: string;
   helperText?: string;
   name: Path<T>;
   control: Control<T>;
   className?: string;
   iconStart?: React.ElementType;
   iconEnd?: React.ElementType;
   iconClassName?: string;
   countryCode?: string;
   placeholder?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "name">;

export function CityCombobox<T extends FieldValues>({
   label,
   helperText,
   name,
   control,
   className,
   iconStart: IconStart,
   iconEnd: IconEnd,
   iconClassName,
   countryCode = "BR",
   placeholder,
   ...props
}: CityComboboxProps<T>) {
   const [open, setOpen] = React.useState(false);
   const inputId = React.useId();
   const allCities = React.useMemo(() => City.getCitiesOfCountry(countryCode) || [], [countryCode]);
   const cityNames = allCities.map((city) => city.name);
   const hasError = helperText && helperText.length > 0;

   return (
      <div className={cn("flex flex-col gap-2 w-full relative", className)}>
         {label && (
            <div className="flex items-center gap-2">
               <Label htmlFor={inputId}>{label}</Label>
            </div>
         )}
         <div className="flex items-center gap-2">
            <Controller
               name={name}
               control={control}
               render={({ field: { value, onChange } }) => (
                  <Popover open={open} onOpenChange={setOpen}>
                     <PopoverTrigger asChild>
                        <div className="relative w-full">
                           {IconStart && (
                              <IconStart
                                 className={cn(
                                    "absolute left-3 top-1/2 -translate-y-1/2 size-5",
                                    iconClassName
                                 )}
                              />
                           )}
                           <button
                              id={inputId}
                              type="button"
                              role="combobox"
                              aria-expanded={open}
                              className={cn(
                                 "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-left",
                                 IconStart && "pl-10",
                                 IconEnd && "pr-10"
                              )}
                              onClick={() => setOpen(!open)}
                              {...props}
                           >
                              {value ? value : (<span className="text-muted-foreground">{placeholder}</span>)}
                              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                           </button>
                           {IconEnd && (
                              <IconEnd
                                 className={cn(
                                    "absolute right-3 top-1/2 -translate-y-1/2 size-5",
                                    iconClassName
                                 )}
                              />
                           )}
                        </div>
                     </PopoverTrigger>
                     <PopoverContent className="p-0 w-full">
                        <Command>
                           <CommandInput placeholder="Digite para filtrar cidades..." />
                           <CommandList>
                              <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                              <CommandGroup>
                                 {cityNames.map((cityName) => (
                                    <CommandItem
                                       key={cityName}
                                       onSelect={() => {
                                          onChange(cityName);
                                          setOpen(false);
                                       }}
                                    >
                                       {cityName}
                                       <Check
                                          className={cn(
                                             "ml-auto h-4 w-4",
                                             value === cityName ? "opacity-100" : "opacity-0"
                                          )}
                                       />
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                           </CommandList>
                        </Command>
                     </PopoverContent>
                  </Popover>
               )}
            />
         </div>
         {hasError && (
            <p className="text-xs text-chart-5 font-normal absolute -bottom-8 left-1/2 -translate-x-1/2 -translate-y-1/2">
               {helperText}
            </p>
         )}
      </div>
   );
}
