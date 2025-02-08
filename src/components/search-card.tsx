import { useNavigate } from "react-router";
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
    const navigate = useNavigate();
    const { adults, kids, infants, cabinClass, direction, originSkyId, originEntityId, destinationSkyId, destinationEntityId, dateFrom, dateTo, setSearchResults } = useSearch();

    const [loading, setLoading] = useState(false);

    console.log("DATE FROM: ", dateFrom)
    console.log("SEARCH CARD DATE TO: ", dateTo?.toISOString().split('T')[0])

    const handleFetchResults = async () => {
        const controller = new AbortController();
        setLoading(true);

        try {
            console.log("Fetching results...")
            const dateParam = dateFrom ? dateFrom.toISOString().split("T")[0] : "";
            const returnDateParam = dateTo ? `&returnDate=${dateTo.toISOString().split("T")[0]}` : "";

            const response = await fetch(
                `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&cabinClass=${cabinClass}&adults=${adults}&kids=${kids}&infants=${infants}&sortBy=best&currency=USD&market=en-US&countryCode=US&date=${dateParam}&returnDate=${returnDateParam}`,
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
                        "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
                    },
                    signal: controller.signal,
                }
            );
            const json = await response.json();
            console.table("RESULTS: ", json)

            if (json && json.data) {
                setSearchResults(json.data);
                navigate("/flight-results");
            }
        } catch (error: unknown) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Fetch error:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    // console.log("originSkyId: ", originSkyId)
    // console.log("originEntityId: ", originEntityId)
    // console.log("destinationSkyId: ", destinationSkyId)
    // console.log("destinationEntityId: ", destinationEntityId)

    // console.log("dateFrom: ", dateFrom?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    console.log("dateTo: ", dateTo?.toISOString().split('T')[0])

    // console.log("cabinClass:", cabinClass)
    // console.log("direction:", direction)
    // console.log("adults:", adults)
    // console.log("kids:", kids)
    // console.log("infants:", infants)

    return (
        <Card className="relative w-full md:w-[736px] lg:w-[982px] mt-10 border-none
        shadow-[0_2px_2px_0_rgba(0,0,0,0.3),0_2px_6px_-6px_rgba(0,0,0,0.15)] 
        md:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)]">
            <CardHeader className="flex-row pt-4 pl-2 pb-2">
                <DirectionSelect />
                <PassengersSelect />
                <ClassSelect />
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row p-0 justify-center mb-6 px-4 md:px-0">
                <div className="flex gap-2 relative mb-6">
                    <OriginSelect commandWidth="w-full md:w-43 lg:w-70" commandHeight="h-12 md:h-14" />


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

                    <DestinationSelect commandWidth="w-full md:w-43 lg:w-70" commandHeight="h-12 md:h-14" />
                </div>

                <CalendarSelect marginLeft="ml-0 md:ml-4" buttonWidth="w-full md:w-84 lg:w-93" buttonHeight="h-12 md:h-14" />

            </CardContent>
            <Button
                onClick={handleFetchResults}
                disabled={!originSkyId || !destinationSkyId || !dateFrom || loading}
                className="absolute left-1/2 transform -translate-x-1/2 -bottom-5 rounded-full px-5 py-5 bg-blue-500 text-white flex items-center gap-2"
            >
                <Search size={24} />
                <div>Explore</div>
            </Button>
        </Card>
    );
};

export default SearchCard;
