import { useEffect, useState, useMemo, useCallback } from "react";
import { Circle } from "lucide-react";

import { useSearch } from "@/hooks/useSearch";
import { APIResponse, FlightData } from "@/lib/types";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

interface OriginSelectProps {
    commandWidth?: string;
    commandHeight?: string;
}

const OriginSelect: React.FC<OriginSelectProps> = ({ commandWidth, commandHeight }) => {
    const { setOriginSkyId, setOriginEntityId, setOriginSearch, setLoading, originSearch } = useSearch();

    const [resultsFrom, setResultsFrom] = useState<FlightData[]>([]);

    const fetchResults = useCallback(async () => {
        const controller = new AbortController();
        if (!originSearch) {
            setResultsFrom([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(
                    originSearch
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
            console.log("FETCHING RESULTS FROM: ", json.data, " DONE");
            if (json && json.data) {
                setResultsFrom(json.data);
            }
        } catch (error: unknown) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Fetch error:", error);
            }
        } finally {
            setLoading(false);
        }
    }, [originSearch, setLoading, setResultsFrom]);

    useEffect(() => {
        fetchResults();
        return () => { };
    }, [fetchResults]);

    const cityResultsFrom = useMemo(() => {
        return resultsFrom.filter(item => item.navigation.entityType === "CITY");
    }, [resultsFrom]);

    const airportResultsFrom = useMemo(() => {
        return resultsFrom.filter(
            item => item.navigation.entityType === "AIRPORT"
        );
    }, [resultsFrom]);
    return (
        <Command className={`border ${commandWidth} ${commandHeight} border-gray-300 rounded-sm `}>
            <CommandInput
                className="text-lg pt-6"
                value={originSearch}
                icon={
                    <Circle className="mr-2 mt-3 h-4 w-4 stroke-4 text-gray-500" />
                }
                onValueChange={(value: string) => {
                    setOriginSearch(value);
                }}
            />
            <CommandGroup
                className={`absolute w-112 mt-13 border-gray-300 bg-white rounded-sm z-10 shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] ${resultsFrom.length === 0 ? "hidden shadow-none" : ""
                    }`}
            >
                <CommandList>
                    {cityResultsFrom.map((city) => (
                        <CommandItem
                            key={city.skyId}
                            value={city.presentation.title}
                            onSelect={() => {
                                setOriginSearch(city.presentation.title);
                                setOriginSkyId(city.skyId);
                                setOriginEntityId(city.navigation.entityId);
                                setResultsFrom([]);

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
                    {airportResultsFrom.filter((airport) => airport.skyId.length < 4)
                        .map((airport) => (
                            <CommandItem
                                key={airport.skyId}
                                value={airport.presentation.title}
                                onSelect={() => {
                                    const formattedSearch = `${airport.navigation.relevantHotelParams.localizedName} ${airport.skyId}`;
                                    setOriginSearch(formattedSearch);
                                    setOriginSkyId(airport.skyId);
                                    setOriginEntityId(airport.navigation.entityId);
                                    setResultsFrom([]);

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

export default OriginSelect       