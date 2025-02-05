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
        { value: "premium-economy", label: "Premium economy" },
        { value: "business", label: "Business" },
        { value: "first", label: "First" },
    ];

    return (
        <Select defaultValue={"economy"} onValueChange={(value: string) => setCabinClass(value)}>
            <SelectTrigger className="w-[180px] flex items-center border-transparent shadow-none focus:ring-0">
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