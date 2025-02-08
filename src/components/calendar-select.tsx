import { useSearch } from "@/hooks/useSearch";

import { Button } from "./ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
import { CalendarDaysIcon } from "lucide-react";

interface CalendarSelectProps {
    marginLeft?: string;
    buttonWidth?: string;
    buttonHeight?: string;
}

const CalendarSelect: React.FC<CalendarSelectProps> = ({ marginLeft, buttonWidth, buttonHeight }) => {
    const { direction, dateTo, dateFrom, setDateFrom, setDateTo } = useSearch();

    const handleDateFormat = (date: Date | undefined) => date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })


    return (
        <div className={`flex ${marginLeft} ${buttonWidth} ${buttonHeight}`}>
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="relative w-full h-full rounded-sm border-gray-300 text-lg flex justify-between"
                    >
                        <CalendarDaysIcon className="absolute left-2" size={20} />
                        <span className="ml-5">
                            {handleDateFormat(dateFrom)}
                        </span>
                        <span className="mr-5">
                            {handleDateFormat(dateTo)}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="mr-24 w-134 bg-white rounded-sm border-gray-300 z-10">
                    <div className="flex gap-2">
                        <Calendar
                            mode="single"
                            selected={dateFrom}
                            onSelect={setDateFrom}
                            className="rounded-md border shadow"
                        />
                        <Calendar
                            mode="single"
                            disabled={direction === "one-way"}
                            selected={dateTo}
                            onSelect={setDateTo}
                            className="rounded-md border shadow"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CalendarSelect       