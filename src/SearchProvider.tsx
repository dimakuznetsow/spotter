import { useState, ReactNode } from "react";

import { SearchResults } from "@/lib/types";
import { SearchContext } from "./SearchContext";

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [originSkyId, setOriginSkyId] = useState("");
    const [originEntityId, setOriginEntityId] = useState("");
    const [originSearch, setOriginSearch] = useState("");
    const [destinationSkyId, setDestinationSkyId] = useState("");
    const [destinationEntityId, setDestinationEntityId] = useState("");
    const [destinationSearch, setDestinationSearch] = useState("");
    const [cabinClass, setCabinClass] = useState("economy");
    const [direction, setDirection] = useState("roundtrip");
    const [adults, setAdults] = useState(1);
    const [kids, setKids] = useState(0);
    const [infants, setInfants] = useState(0);
    const [totalPassengers, setTotalPassengers] = useState(1);
    const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date());
    const [dateTo, setDateTo] = useState<Date | undefined>();
    const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <SearchContext.Provider
            value={{
                originSkyId,
                setOriginSkyId,
                originEntityId,
                setOriginEntityId,
                originSearch,
                setOriginSearch,
                destinationSkyId,
                setDestinationSkyId,
                destinationEntityId,
                setDestinationEntityId,
                destinationSearch,
                setDestinationSearch,
                cabinClass,
                setCabinClass,
                direction,
                setDirection,
                adults,
                setAdults,
                kids,
                setKids,
                infants,
                setInfants,
                totalPassengers,
                setTotalPassengers,
                dateFrom,
                setDateFrom,
                dateTo,
                setDateTo,
                searchResults,
                setSearchResults,
                loading,
                setLoading
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
