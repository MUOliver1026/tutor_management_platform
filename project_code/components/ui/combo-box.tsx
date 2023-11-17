"use client"

import {FC, useState} from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { placeholderCSS } from "react-select/dist/declarations/src/components/Placeholder"

interface ComboboxProps {
    items:{
       value: string,
       label: string
    }[]
    placeholder: string;
    onChange: (selectedValue: string) => void;
}


const Combobox:FC<ComboboxProps> = ({ items, placeholder,onChange  }) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                <CommandInput placeholder={`Search ${placeholder}...`} />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {items.map((item) => (
                            <CommandItem
                            key={item.value}
                            onSelect={() => {
                                setTimeout(() => {
                                    setValue(prevValue => {
                                        const newValue = item.value === prevValue ? "" : item.value;
                                        onChange?.(newValue);
                                        return newValue;
                                    });
                                    setOpen(false);
                                }, 0);
                            }}
                            
                        >
                        
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === item.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Combobox