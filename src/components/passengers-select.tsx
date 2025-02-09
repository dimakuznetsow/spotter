import { useState } from "react";
import { Minus, Plus, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useSearch } from "@/hooks/useSearch";

const PassengersSelect: React.FC = () => {
    const { setAdults, setKids, setInfants, totalPassengers, setTotalPassengers } = useSearch();

    const [committedCounts, setCommittedCounts] = useState({
        adults: 1,
        children: 0,
        infantsInSeat: 0,
        infantsOnLap: 0,
    });

    const [editingCounts, setEditingCounts] = useState({ ...committedCounts });
    const [cardOpen, setCardOpen] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const totalEditing =
        editingCounts.adults +
        editingCounts.children +
        editingCounts.infantsInSeat +
        editingCounts.infantsOnLap;

    const canAddPassenger = totalEditing < 10;


    const handlePopoverOpenChange = (open: boolean) => {
        if (open) {
            setEditingCounts({ ...committedCounts });
            setTotalPassengers(committedCounts.adults + committedCounts.children + committedCounts.infantsInSeat + committedCounts.infantsOnLap);
            setAdults(committedCounts.adults);
            setKids(committedCounts.children + committedCounts.infantsInSeat);
            setInfants(committedCounts.infantsOnLap);
            setCancelled(false);
            setCardOpen(true);
        } else {
            if (!cancelled) {
                if (canAddPassenger) {
                    setCommittedCounts({ ...editingCounts });
                    setAdults(editingCounts.adults);
                    setKids(editingCounts.children + editingCounts.infantsInSeat);
                    setInfants(editingCounts.infantsOnLap);
                    setTotalPassengers(editingCounts.adults + editingCounts.children + editingCounts.infantsInSeat + editingCounts.infantsOnLap);
                }

            }
            setCardOpen(false);
        }
    };

    const handleCancel = () => {
        setCancelled(true);
        setCardOpen(false);
    };

    const handleDone = () => {
        setCancelled(false);
        setCommittedCounts({ ...editingCounts });
        setAdults(editingCounts.adults);
        setKids(editingCounts.children + editingCounts.infantsInSeat);
        setInfants(editingCounts.infantsOnLap);
        setTotalPassengers(editingCounts.adults + editingCounts.children + editingCounts.infantsInSeat + editingCounts.infantsOnLap);
        setCardOpen(false);
    };

    return (
        <div>
            <Popover open={cardOpen} onOpenChange={handlePopoverOpenChange}>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="font-normal border-none">
                        <User className="h-4 w-4 text-gray-500" />
                        {totalPassengers}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="
            bg-white 
            shadow-[0_1px_3px_0_rgba(60,64,67,0.3),_0_4px_8px_3px_rgba(60,64,67,0.15)] 
            border-none  
            ml-44
            w-61 
            h-70 
            rounded-xs
          "
                >
                    {/* Adults */}
                    <div className="flex items-center justify-between mb-3">
                        <div className={`${!canAddPassenger && editingCounts.adults > 1 ? "text-red-500" : ""}`}>
                            Adults
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="default"
                                disabled={editingCounts.adults === 1}
                                className="font-normal h-8 w-8"
                                onClick={() =>
                                    setEditingCounts((prev) => ({
                                        ...prev,
                                        adults: Math.max(1, prev.adults - 1),
                                    }))
                                }
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            {editingCounts.adults}
                            <Button
                                variant="default"
                                disabled={editingCounts.adults === 9}
                                className="font-normal h-8 w-8"
                                onClick={() =>
                                    setEditingCounts((prev) => ({
                                        ...prev,
                                        adults: prev.adults + 1,
                                    }))
                                }
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between mb-3">
                        <div className={`${!canAddPassenger && editingCounts.children > 0 ? "text-red-500" : ""}`}>
                            Children
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="default"
                                disabled={editingCounts.children === 0}
                                className="font-normal h-8 w-8"
                                onClick={() =>
                                    setEditingCounts((prev) => ({
                                        ...prev,
                                        children: Math.max(0, prev.children - 1),
                                    }))
                                }
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            {editingCounts.children}
                            <Button
                                variant="default"
                                disabled={editingCounts.children === 9}
                                className="font-normal h-8 w-8"
                                onClick={() =>
                                    setEditingCounts((prev) => ({
                                        ...prev,
                                        children: prev.children + 1,
                                    }))
                                }
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between mb-3">
                        <div className={`${!canAddPassenger && editingCounts.infantsInSeat > 0 ? "text-red-500" : ""}`}>
                            Infants
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="default"
                                disabled={editingCounts.infantsInSeat === 0}
                                className="font-normal h-8 w-8"
                                onClick={() =>
                                    setEditingCounts((prev) => ({
                                        ...prev,
                                        infantsInSeat: Math.max(0, prev.infantsInSeat - 1),
                                    }))
                                }
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            {editingCounts.infantsInSeat}
                            <Button
                                variant="default"
                                disabled={editingCounts.infantsInSeat === 9}
                                className="font-normal h-8 w-8"
                                onClick={() =>
                                    setEditingCounts((prev) => ({
                                        ...prev,
                                        infantsInSeat: prev.infantsInSeat + 1,
                                    }))
                                }
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Infants on Lap */}
                    <div className="flex items-center justify-between">
                        <div className={`${!canAddPassenger && editingCounts.infantsOnLap > 0 ? "text-red-500" : ""}`}>
                            Infants on lap
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="default"
                                disabled={editingCounts.infantsOnLap === 0}
                                className="font-normal h-8 w-8"
                                onClick={() =>
                                    setEditingCounts((prev) => ({
                                        ...prev,
                                        infantsOnLap: Math.max(0, prev.infantsOnLap - 1),
                                    }))
                                }
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            {editingCounts.infantsOnLap}
                            <Button
                                variant="default"
                                disabled={editingCounts.infantsOnLap === 9}
                                className="font-normal h-8 w-8"
                                onClick={() =>
                                    setEditingCounts((prev) => ({
                                        ...prev,
                                        infantsOnLap: prev.infantsOnLap + 1,
                                    }))
                                }
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Action buttons or error message */}
                    {!canAddPassenger ? (
                        <div className="text-red-500 text-sm mt-4">
                            Sorry, we do not support more than 9 passengers.
                        </div>
                    ) : (
                        <div className="flex gap-2 ml-10 mt-14">
                            <Button
                                variant="ghost"
                                className="text-blue-500 hover:bg-blue-200/20 rounded-full"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-blue-500 hover:bg-blue-200/20 rounded-full"
                                onClick={handleDone}
                            >
                                Done
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default PassengersSelect;
