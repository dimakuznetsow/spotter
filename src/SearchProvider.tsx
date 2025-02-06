import { useState, ReactNode } from "react";
import { SearchContext } from "./SearchContext";

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [originSkyId, setOriginSkyId] = useState("");
    const [destinationSkyId, setDestinationSkyId] = useState("");
    const [originEntityId, setOriginEntityId] = useState("");
    const [destinationEntityId, setDestinationEntityId] = useState("");
    const [cabinClass, setCabinClass] = useState("economy");
    const [direction, setDirection] = useState("roundtrip");
    const [adults, setAdults] = useState(1);
    const [kids, setKids] = useState(0);
    const [infants, setInfants] = useState(0);
    const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date());
    const [dateTo, setDateTo] = useState<Date | undefined>();
    const [searchResults, setSearchResults] = useState([]);

    return (
        <SearchContext.Provider
            value={{
                originSkyId,
                setOriginSkyId,
                destinationSkyId,
                setDestinationSkyId,
                originEntityId,
                setOriginEntityId,
                destinationEntityId,
                setDestinationEntityId,
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
                dateFrom,
                setDateFrom,
                dateTo,
                setDateTo,
                searchResults,
                setSearchResults
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
