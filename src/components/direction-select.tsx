import { ArrowRightLeft, ArrowRight, Shuffle } from "lucide-react";

import { useSearch } from "@/hooks/useSearch";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const DirectionSelect: React.FC = () => {
    const { direction, setDirection } = useSearch();

    const flightOptions = [
        { value: "roundtrip", label: "Round trip" },
        { value: "one-way", label: "One way" },
        { value: "multi-city", label: "Multi-city" },
    ];

    let IconComponent;
    if (direction === "roundtrip") {
        IconComponent = ArrowRightLeft;
    } else if (direction === "one-way") {
        IconComponent = ArrowRight;
    } else if (direction === "multi-city") {
        IconComponent = Shuffle;
    } else {
        IconComponent = null;
    }

    return (
        <Select defaultValue={direction} onValueChange={(value: string) => setDirection(value)}>
            <SelectTrigger className="w-[180px] flex items-center border-transparent shadow-none focus:ring-0">
                {IconComponent && <IconComponent className="h-4 w-4" />}
                <SelectValue placeholder={direction} />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-sm border-none">
                {flightOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default DirectionSelect       