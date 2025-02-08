import { useSearch } from "@/hooks/useSearch";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const ClassSelect: React.FC = () => {
    const { cabinClass, setCabinClass } = useSearch();

    const classOptions = [
        { value: "economy", label: "Economy" },
        { value: "premium_economy", label: "Premium economy" },
        { value: "business", label: "Business" },
        { value: "first", label: "First" },
    ];

    return (
        <Select value={cabinClass} onValueChange={(value: string) => setCabinClass(value)}>
            <SelectTrigger className="w-[180px] border-none flex items-center  shadow-none focus:ring-0">
                <SelectValue placeholder={cabinClass} />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-sm border-none">
                {classOptions.map((item) => (

                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default ClassSelect       