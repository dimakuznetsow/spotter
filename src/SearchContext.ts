import { createContext } from "react";

interface SearchContextProps {
  originSkyId: string;
  setOriginSkyId: (id: string) => void;
  destinationSkyId: string;
  setDestinationSkyId: (id: string) => void;
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
  dateTo: Date | undefined;
  setDateTo: (date: Date | undefined) => void;
  dateFrom: Date | undefined;
  setDateFrom: (date: Date | undefined) => void;
  searchResults: [];
  setSearchResults: (results: []) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);
