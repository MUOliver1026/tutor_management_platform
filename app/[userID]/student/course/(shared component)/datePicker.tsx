"use client"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {FC} from "react";

interface DatePickerProps {
    selectedDate: Date,
    onDateChange: (date:Date | undefined) => void
}

const DatePicker:FC<DatePickerProps> = ({selectedDate, onDateChange}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        {selectedDate ? (
                            format(selectedDate, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={onDateChange}
                    disabled={(date) =>
                        date <= new Date()
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker