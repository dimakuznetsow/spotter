import { useEffect, useState, useCallback, useMemo } from "react";
import { MapPin } from "lucide-react";

import { APIResponse, FlightData } from "@/lib/types";
import { useSearch } from "@/hooks/useSearch";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

interface DestinationSelectProps {
    commandWidth?: string;
    commandHeight?: string;
}

const DestinationSelect: React.FC<DestinationSelectProps> = ({ commandWidth, commandHeight }) => {
    const { setDestinationSkyId, setDestinationEntityId, setDestinationSearch, destinationSearch, setLoading } = useSearch();

    const [resultsTo, setResultsTo] = useState<FlightData[]>([]);

    const fetchResults = useCallback(async () => {
        const controller = new AbortController();

        if (!destinationSearch) {
            setResultsTo([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(
                    destinationSearch
                )}&locale=en-US`,
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
                        "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
                    },
                    signal: controller.signal,
                }
            );
            const json: APIResponse = await response.json();
            if (json && json.data) {
                setResultsTo(json.data);
            }
        } catch (error: unknown) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Fetch error:", error);
            }
        } finally {
            setLoading(false);
        }
    }, [destinationSearch, setLoading, setResultsTo]);


    useEffect(() => {
        fetchResults();
        return () => { };
    }, [fetchResults]);


    const cityResultsTo = useMemo(() => {
        return resultsTo.filter(item => item.navigation.entityType === "CITY");
    }, [resultsTo]);

    const airportResultsTo = useMemo(() => {
        return resultsTo.filter(
            item => item.navigation.entityType === "AIRPORT"
        );
    }, [resultsTo]);



    return (
        <Command className={`border ${commandWidth} ${commandHeight} border-gray-300 rounded-sm`}>
            <CommandInput
                className="text-lg pl-3 pt-6"
                value={destinationSearch}
                placeholder="Where to?"
                icon={
                    <MapPin className="ml-3 mt-2.5 h-5 stroke-3 text-gray-500" />
                }
                onValueChange={(value: string) => {
                    setDestinationSearch(value);
                }}
            />

            <CommandGroup
                className={`absolute w-112 mt-13 border-gray-300 bg-white rounded-sm z-10 shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] ${resultsTo.length === 0 ? "hidden shadow-none" : ""
                    }`}
            >
                <CommandList>
                    {cityResultsTo.map((city) => (
                        <CommandItem
                            key={city.skyId}
                            value={city.presentation.title}
                            onSelect={() => {
                                setDestinationSearch(city.presentation.title);
                                setDestinationSkyId(city.skyId);
                                setDestinationEntityId(city.navigation.entityId);
                                setResultsTo([]);
                            }}
                            className="text-lg ml-6"
                        >
                            <div className="flex flex-col">
                                <span>{city.presentation.title}</span>
                                <span className="text-xs -mt-1">
                                    City in {city.presentation.subtitle}
                                </span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandList>
                <CommandList>
                    {airportResultsTo.filter((airport) => airport.skyId.length < 4).map((airport) => (
                        <CommandItem
                            key={airport.skyId}
                            value={airport.presentation.title}
                            onSelect={() => {
                                const formattedSearch = `${airport.navigation.relevantHotelParams.localizedName} ${airport.skyId}`;
                                setDestinationSearch(formattedSearch);
                                setDestinationSkyId(airport.skyId);
                                setDestinationEntityId(airport.navigation.entityId);
                                setResultsTo([]);
                            }}
                            className="text-lg ml-13"
                        >
                            {airport.presentation.title}{" "}
                            <span className="text-sm text-gray-500">
                                {airport.navigation.relevantFlightParams.skyId}
                            </span>
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandGroup>

        </Command>
    );
};

export default DestinationSelect       