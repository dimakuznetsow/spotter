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
