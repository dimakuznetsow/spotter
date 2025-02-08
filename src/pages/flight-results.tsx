import { useEffect, useState } from "react";

import { useSearch } from "@/hooks/useSearch"
import Header from "@/components/header"
import ClassSelect from "@/components/class-select"
import PassengersSelect from "@/components/passengers-select"
import DirectionSelect from "@/components/direction-select"
import DestinationSelect from "@/components/destination-select"
import OriginSelect from "@/components/origin-select"
import CalendarSelect from "@/components/calendar-select"
import FilterSection from "@/components/filter-section"
import SearchResults from "@/components/search-results"
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";



const FlightResults = () => {
    const { direction, adults, kids, infants, cabinClass, dateFrom, dateTo, originSkyId, originEntityId, destinationSkyId, destinationEntityId, searchResults, setSearchResults } = useSearch()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (
            !originSkyId ||
            !destinationSkyId ||
            !originEntityId ||
            !destinationEntityId ||
            !cabinClass ||
            !dateFrom
        ) {
            return;
        }

        const controller = new AbortController();

        const fetchResults = async () => {
            setLoading(true);
            try {
                console.log("Fetching results...");
                const response = await fetch(
                    `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&cabinClass=${cabinClass}&adults=${adults}&kids=${kids}&infants=${infants}&sortBy=best&currency=USD&market=en-US&countryCode=US&date=${dateFrom.toISOString().split("T")[0]}&limit=20`,
                    {
                        method: "GET",
                        headers: {
                            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
                            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
                        },
                        signal: controller.signal,
                    }
                );
                console.log("Fetching results... DONE");
                const json = await response.json();
                console.table("RESULTS: ", json);

                if (json && json.data) {
                    setSearchResults(json.data);
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

        return () => {
            controller.abort();
        };
    }, [
        direction,
        adults,
        kids,
        infants,
        cabinClass,
        dateFrom,
        dateTo,
        originSkyId,
        originEntityId,
        destinationSkyId,
        destinationEntityId,
    ]);

    console.log("RESULTS direction: ", direction)
    console.log("RESULTS adults: ", adults)
    console.log("RESULTS kids: ", kids)
    console.log("RESULTS infants: ", infants)
    console.log("RESULTS cabinClass: ", cabinClass)
    console.log("RESULTS dateFrom: ", dateFrom)
    console.log("RESULTS dateTo: ", dateTo)
    console.log("RESULTS originSkyId: ", originSkyId)
    console.log("RESULTS originEntityId: ", originEntityId)
    console.log("RESULTS destinationSkyId: ", destinationSkyId)
    console.log("RESULTS destinationEntityId: ", destinationEntityId)

    return (
        <main>
            <Header />
            <div className="w-full md:max-w-screen-md lg:max-w-screen-lg mx-auto">
                <div className="flex items-center gap-2 mt-2 px-2 md:px-0">
                    <DirectionSelect />
                    <PassengersSelect />
                    <ClassSelect />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-2 px-4 md:px-0">
                    <div className="relative w-full md:w-fit flex items-center gap-2">
                        <OriginSelect commandWidth="w-full md:w-48 lg:w-78" commandHeight="h-12 md:h-14" />
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
                        h-8
                        md:h-10 
                        w-8
                        md:w-10 
                        rounded-full
                        bg-white"
                        >
                            <ArrowRightLeft size={20} />
                        </Button>
                        <DestinationSelect commandWidth="w-full md:w-48 lg:w-78" commandHeight="h-12 md:h-14" />
                    </div>
                    <CalendarSelect buttonWidth="w-full md:w-88 lg:w-93" buttonHeight="h-12 md:h-14" marginLeft="ml-0 md:ml-3" />
                </div>
                <div className="w-full lg:max-w-screen-lg mx-auto  mt-2 px-4 md:px-0">
                    <FilterSection />
                </div>
                {loading && "LOADING..."}
                <div className="px-4 md:px-0">
                    {searchResults && !loading && <SearchResults />}
                </div>
            </div>
        </main>
    )
}

export default FlightResults