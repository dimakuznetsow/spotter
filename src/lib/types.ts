export interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

export interface Carrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface Segment {
  id: string;
  origin: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
    country: string;
  };
  destination: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
    country: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
}

export interface Leg {
  id: string;
  origin: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
  };
  destination: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
  };
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: { marketing: Carrier[]; operating?: Carrier[] };
  operationType: string;
  segments: Segment[];
}

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  fareAttributes: object;
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface FilterStats {
  duration: {
    min: number;
    max: number;
    multiCityMin: number;
    multiCityMax: number;
  };
  airports: {
    city: string;
    airports: { id: string; entityId: string; name: string }[];
  }[];
  carriers: Carrier[];
  stopPrices: {
    direct: { isPresent: boolean; formattedPrice: string };
    one: { isPresent: boolean; formattedPrice: string };
    twoOrMore: { isPresent: boolean };
  };
}

export interface SearchResults {
  context: { status: string; sessionId: string; totalResults: number };
  itineraries: Itinerary[];
  messages: string[];
  filterStats: FilterStats;
  flightsSessionId: string;
  destinationImageUrl: string;
}

export interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface RelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

export interface RelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}

export interface Navigation {
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

export interface APIResponse {
  status: boolean;
  timestamp: number;
  data: FlightData[];
}
