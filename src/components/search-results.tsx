
import { useSearch } from "@/hooks/useSearch";
import { Card } from "@/components/ui/card";
import { ChevronDown, MoveRight } from "lucide-react";


const SearchResults: React.FC = () => {
    const { searchResults, direction } = useSearch();

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours > 0 ? `${hours} hr ` : ''}${mins > 0 ? `${mins} min` : ''}`.trim();
    };

    console.log(JSON.stringify(searchResults));

    return (
        <>
            {searchResults?.itineraries?.map((flight: any, index: number) => {
                // Check if operating carrier exists; otherwise, use marketing
                const carriers = flight.legs[0]?.carriers;
                const carrier =
                    carriers && carriers.operating?.length > 2
                        ? carriers.operating[0]
                        : carriers?.marketing?.[0];

                const totalDuration = flight.legs[0].segments.length > 1
                    ? flight.legs[0].segments.reduce((total: number, segment: any) => total + segment.durationInMinutes, 0)
                    : flight.legs[0].segments[0].durationInMinutes;



                return (
                    <Card
                        key={index}
                        className={`w-full lg:max-w-screen-lg mx-auto flex items-center border border-[#dadce0] h-23 md:h-18.5 shadow-none 
            ${index === 0 ? "rounded-t-lg rounded-b-none border-b-none" : "rounded-none"} 
            ${index === searchResults.itineraries.length - 1 ? "rounded-b-lg border-b-none mb-4" : ""}`}
                    >
                        {carrier && (
                            <>
                                {/* Web */}
                                <div className="hidden md:flex items-center ">
                                    <div className="ml-6 mr-8">
                                        {carrier.logoUrl && (
                                            <img
                                                src={carrier.logoUrl}
                                                alt="Airline Logo"
                                                className="w-9 h-9"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-[#202124] text-base font-medium w-47 lg:w-72 mr-2">
                                            {flight.legs[0]?.departure
                                                ? new Date(flight.legs[0].departure).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })
                                                : 'N/A'}{' '}
                                            -{' '}
                                            {flight.legs[0]?.arrival
                                                ? new Date(flight.legs[0].arrival).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })
                                                : 'N/A'}
                                        </div>
                                        <div className="text-xs font-normal text-[#70757a]">
                                            {carrier.name}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-21 lg:w-32 text-center">
                                        <div className="text-[#202124] text-base font-normal truncate">
                                            {formatDuration(totalDuration)}
                                        </div>
                                        <div className="text-[#70757a] text-xs font-normal">
                                            {flight.legs[0].origin.displayCode} - {flight.legs[0].destination.displayCode}
                                        </div>
                                    </div>
                                    <div className="text-[#202124] text-base font-normal w-21 lg:w-32 text-center">
                                        {flight.legs[0].stopCount > 1
                                            ? flight.legs[0].stopCount + ' stops'
                                            : flight.legs[0].stopCount === 1
                                                ? '1 stop'
                                                : 'Nonstop'}
                                    </div>
                                    <div className="flex flex-col items-center w-27 lg:w-40 text-left">
                                        <div className="text-[#202124] text-base font-normal">
                                            {Math.floor(Math.random() * (500 - 100 + 1)) + 100} kg CO2e
                                        </div>
                                        <div className="text-[#70757a] text-xs font-normal mt-1">
                                            +{Math.floor(Math.random() * (29 - 10 + 1)) + 10}% emissions
                                        </div>
                                    </div>
                                    <div className="w-21 lg:w-32 ml-4 text-center text-[#202124] text-base font-medium">
                                        {flight.price.formatted}
                                    </div>
                                    <div className="ml-10 lg:ml-4 p-2 rounded-full hover:bg-[#70757a]/10">
                                        <ChevronDown className="h-6 w-6 text-[#70757a]" />
                                    </div>
                                </div>



                                {/* Mobile */}
                                <div className="w-full flex flex-row justify-between md:hidden px-4">
                                    <div className="flex items-center">
                                        <div className=" mr-5 place-self-start">
                                            {carrier.logoUrl && (
                                                <img
                                                    src={carrier.logoUrl}
                                                    alt="Airline Logo"
                                                    className="w-9 h-9"
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-col">
                                                    <div className="text-[#202124] text-base font-medium">
                                                        {flight.legs[0]?.departure
                                                            ? new Date(flight.legs[0].departure).toLocaleTimeString('en-US', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true,
                                                            })
                                                            : 'N/A'}
                                                    </div>
                                                    <div className="text-[#70757a] text-xs font-normal mt-1">
                                                        {flight.legs[0].origin.displayCode}
                                                    </div>
                                                </div>
                                                <div>
                                                    <MoveRight className="w-5 h-5" />
                                                </div>
                                                <div className="flex-col">
                                                    <div className="text-[#202124] text-base font-medium">
                                                        {flight.legs[0]?.arrival
                                                            ? new Date(flight.legs[0].arrival).toLocaleTimeString('en-US', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true,
                                                            })
                                                            : 'N/A'}
                                                    </div>
                                                    <div className="text-[#70757a] text-xs font-normal mt-1">
                                                        {flight.legs[0].destination.displayCode}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-6 text-[#70757a] text-xs font-normal mt-1">
                                                <div>
                                                    {flight.legs[0].stopCount > 1
                                                        ? flight.legs[0].stopCount + ' stops'
                                                        : flight.legs[0].stopCount === 1
                                                            ? '1 stop'
                                                            : 'Nonstop'}
                                                </div>
                                                <div>
                                                    {formatDuration(totalDuration)}
                                                </div>
                                                <div>
                                                    {carrier.name}
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="flex content-between">
                                        <div className="flex-col ">
                                            <div className="text-[#202124] text-base font-medium ">
                                                {flight.price.formatted}
                                            </div>
                                            <div className="text-[#70757a] text-xs font-normal mt-1 flex-1">
                                                {direction === "roundtrip" ? "round trip" : "\u00A0"}
                                            </div>
                                            <div className="text-[#70757a] text-xs font-normal mt-1">
                                                +{Math.floor(Math.random() * (29 - 10 + 1)) + 10}% emissions
                                            </div>
                                        </div>
                                        <div className="ml-10 lg:ml-4 p-2 rounded-full hover:bg-[#70757a]/10 place-self-center">
                                            <ChevronDown className="h-6 w-6 text-[#70757a]" />
                                        </div>

                                    </div>
                                </div>
                            </>
                        )}
                    </Card>
                );
            })}

        </>

    );
};

export default SearchResults    