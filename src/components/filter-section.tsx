import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const FilterSection = () => {
    return (
        <div className="flex items-center gap-2">
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="relative px-2 h-8 rounded-lg border-gray-300 text-base flex justify-between"
                    >
                        Stops
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-white rounded-lg border-gray-300 z-10">
                    <div className="flex gap-2">

                    </div>
                </PopoverContent>
            </Popover>
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="relative px-2 h-8 rounded-lg border-gray-300 text-base flex justify-between"
                    >
                        Airlines
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-white rounded-lg border-gray-300 z-10">
                    <div className="flex gap-2">

                    </div>
                </PopoverContent>
            </Popover>
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="relative px-2 h-8 rounded-lg border-gray-300 text-base flex justify-between"
                    >
                        Bags
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-white rounded-lg border-gray-300 z-10">
                    <div className="flex gap-2">

                    </div>
                </PopoverContent>
            </Popover>
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="relative px-2 h-8 rounded-lg border-gray-300 text-base flex justify-between"
                    >
                        Price
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-white rounded-lg border-gray-300 z-10">
                    <div className="flex gap-2">

                    </div>
                </PopoverContent>
            </Popover>
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="relative px-2 h-8 rounded-lg border-gray-300 text-base flex justify-between"
                    >
                        Times
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-white rounded-lg border-gray-300 z-10">
                    <div className="flex gap-2">

                    </div>
                </PopoverContent>
            </Popover>
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="relative px-2 h-8 rounded-lg border-gray-300 text-base flex justify-between"
                    >
                        Emissions
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-white rounded-lg border-gray-300 z-10">
                    <div className="flex gap-2">

                    </div>
                </PopoverContent>
            </Popover>
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="relative px-2 h-8 rounded-lg border-gray-300 text-base flex justify-between"
                    >
                        Connecting airports
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-white rounded-lg border-gray-300 z-10">
                    <div className="flex gap-2">

                    </div>
                </PopoverContent>
            </Popover>
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="relative px-2 h-8 rounded-lg border-gray-300 text-base flex justify-between"
                    >
                        Duration
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-white rounded-lg border-gray-300 z-10">
                    <div className="flex gap-2">

                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default FilterSection