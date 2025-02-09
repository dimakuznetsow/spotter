import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const filterOptions = [
    { label: "Stops" },
    { label: "Airlines" },
    { label: "Bags" },
    { label: "Price" },
    { label: "Times" },
    { label: "Emissions" },
    { label: "Connecting airports" },
    { label: "Duration" },
];

const FilterSection = () => {
    return (
        <div className="flex items-center gap-2 mb-4">
            {filterOptions.map((option) => (
                <Popover key={option.label} >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="relative px-2 h-8 rounded-lg border-gray-300 text-base flex justify-between"
                        >
                            {option.label}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white rounded-lg border-gray-300 z-10 p-4">
                    </PopoverContent>
                </Popover>
            ))}
        </div>
    )
}

export default FilterSection