import { createContext } from "react";
import { SearchResults } from "@/lib/types";

interface SearchContextProps {
  originSkyId: string;
  setOriginSkyId: (id: string) => void;
  originSearch: string;
  setOriginSearch: (search: string) => void;
  destinationSkyId: string;
  setDestinationSkyId: (id: string) => void;
  destinationSearch: string;
  setDestinationSearch: (search: string) => void;
  originEntityId: string;
  setOriginEntityId: (id: string) => void;
  destinationEntityId: string;
  setDestinationEntityId: (id: string) => void;
  cabinClass: string;
  setCabinClass: (cabin: string) => void;
  direction: string;
  setDirection: (direction: string) => void;
  adults: number;
  setAdults: (adults: number) => void;
  kids: number;
  setKids: (kids: number) => void;
  infants: number;
  setInfants: (infants: number) => void;
  totalPassengers: number;
  setTotalPassengers: (totalPassengers: number) => void;
  dateTo: Date | undefined;
  setDateTo: (date: Date | undefined) => void;
  dateFrom: Date | undefined;
  setDateFrom: (date: Date | undefined) => void;
  searchResults: SearchResults | null;
  setSearchResults: (results: SearchResults | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);
