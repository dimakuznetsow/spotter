import { ArrowRightLeft, Search } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";

import { useSearch } from "../hooks/useSearch";
import PassengersSelect from "./passengers-select";
import ClassSelect from "./class-select";
import DirectionSelect from "./direction-select";
import OriginSelect from "./origin-select";
import DestinationSelect from "./destination-select";
import CalendarSelect from "./calendar-select";
import { useState } from "react";

const SearchCard = () => {
    const { adults, kids, infants, cabinClass, direction, originSkyId, originEntityId, destinationSkyId, destinationEntityId, dateFrom, dateTo } = useSearch();

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState();



    const handleFetchResults = async () => {
        const controller = new AbortController();
        setLoading(true);

        try {
            console.log("Fetching results...")
            const response = await fetch(
                `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&cabinClass=${cabinClass}&adults=${adults}&kids=${kids}&infants=${infants}&sortBy=best&currency=USD&market=en-US&countryCode=US&date=${dateFrom?.toISOString().split('T')[0]}`,
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
                        "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
                    },
                    signal: controller.signal,
                }
            );
            console.log("Fetching results... DONE")
            const json = await response.json();
            console.table("RESULTS: ", json)

            if (json && json.data) {
                setResults(json.data);
            }
        } catch (error: unknown) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Fetch error:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    console.log("originSkyId: ", originSkyId)
    console.log("originEntityId: ", originEntityId)
    console.log("destinationSkyId: ", destinationSkyId)
    console.log("destinationEntityId: ", destinationEntityId)

    console.log("dateFrom: ", dateFrom?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    console.log("dateTo: ", dateTo?.toISOString().split('T')[0])

    console.log("cabinClass:", cabinClass)
    console.log("direction:", direction)
    console.log("adults:", adults)
    console.log("kids:", kids)
    console.log("infants:", infants)

    return (
        <Card className="relative mt-10 border-none shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)]">
            <CardHeader className="flex-row gap-4 items-center">
                <DirectionSelect />
                <PassengersSelect />
                <ClassSelect />
            </CardHeader>

            <CardContent className="flex gap-4 w-full">
                <div className="flex gap-2 relative mb-6">
                    <OriginSelect />

                    <Button
                        className="
                        absolute 
                        left-1/2 
                        top-1/2 
                        transform 
                        -translate-x-1/2 
                        -translate-y-1/2 
                        px-4 
                        py-4 
                        h-10 
                        w-10 
                        rounded-full
                        bg-white"
                    >
                        <ArrowRightLeft size={20} />
                    </Button>

                    <DestinationSelect />
                </div>

                <CalendarSelect />

            </CardContent>
            <Button
                onClick={handleFetchResults}
                disabled={!originSkyId || !destinationSkyId || !dateFrom || loading}
                className="absolute  -bottom-4.5 rounded-full px-6 py-4 bg-blue-500 text-white flex items-center gap-2"
            >
                <Search size={24} />
                <div>Search</div>
            </Button>
        </Card>
    );
};

export default SearchCard;
