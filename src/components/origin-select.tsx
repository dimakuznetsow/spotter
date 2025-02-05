import { useEffect, useState } from "react";
import { Circle } from "lucide-react";

import { useSearch } from "@/hooks/useSearch";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

interface Presentation {
    title: string;
    suggestionTitle: string;
    subtitle: string;
}

interface RelevantFlightParams {
    skyId: string;
    entityId: string;
    flightPlaceType: string;
    localizedName: string;
}

interface RelevantHotelParams {
    entityId: string;
    entityType: string;
    localizedName: string;
}

interface Navigation {
    entityId: string;
    entityType: "CITY" | "AIRPORT";
    localizedName: string;
    relevantFlightParams: RelevantFlightParams;
    relevantHotelParams: RelevantHotelParams;
}

export interface FlightData {
    skyId: string;
    entityId: string;
    presentation: Presentation;
    navigation: Navigation;
}

interface APIResponse {
    status: boolean;
    timestamp: number;
    data: FlightData[];
}


const OriginSelect: React.FC = () => {
    const { setOriginSkyId, setOriginEntityId } = useSearch();

    const [search, setSearch] = useState("");
    const [resultsFrom, setResultsFrom] = useState<FlightData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        if (!search) {
            setResultsFrom([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(
                        search
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
                    setResultsFrom(json.data);
                }
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "AbortError") {
                    console.error("Fetch error:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchResults();

        return () => controller.abort();
    }, [search]);


    const cityResultsFrom = resultsFrom.filter(
        (item) => item.navigation.entityType === "CITY"
    );
    const airportResultsFrom = resultsFrom.filter(
        (item) => item.navigation.entityType === "AIRPORT"
    );

    console.log(resultsFrom)


    return (
        <Command className="border w-70 border-gray-300 rounded-sm">
            <CommandInput
                className="text-lg pl-1 pt-5"
                value={search}
                icon={
                    <Circle className="mr-2 mt-2.5 h-4 w-4 stroke-4 text-gray-500" />
                }
                onValueChange={(value: string) => {
                    setSearch(value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <CommandList
                    className={`absolute w-112 mt-13 border-gray-300 bg-white rounded-sm z-10 shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] ${resultsFrom.length === 0 ? "hidden shadow-none" : ""
                        }`}
                >
                    <CommandGroup>
                        {cityResultsFrom.map((city) => (
                            <CommandItem
                                key={city.skyId}
                                value={city.presentation.title}
                                onSelect={() => {
                                    setSearch(city.presentation.title);
                                    setOriginSkyId(city.skyId);
                                    setOriginEntityId(city.navigation.entityId);
                                    setTimeout(() => setIsOpen(false), 1);
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
                    </CommandGroup>
                    <CommandGroup>
                        {airportResultsFrom.map((airport) => (
                            <CommandItem
                                key={airport.skyId}
                                value={airport.presentation.title}
                                onSelect={() => {
                                    setSearch(`${airport.navigation.relevantHotelParams.localizedName} ${airport.skyId}`);
                                    setOriginSkyId(airport.skyId);
                                    setOriginEntityId(airport.navigation.entityId);
                                    setTimeout(() => setIsOpen(false), 1);
                                }}
                                className="text-lg ml-13"
                            >
                                {airport.presentation.title}{" "}
                                <span className="text-sm text-gray-500">
                                    {airport.navigation.relevantFlightParams.skyId}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            )}
        </Command>
    );
};

export default OriginSelect       