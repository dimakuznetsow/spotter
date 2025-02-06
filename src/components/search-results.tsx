
import { useSearch } from "@/hooks/useSearch";
import { Card } from "@/components/ui/card";


const SearchResults: React.FC = () => {
    const { searchResults } = useSearch();

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours > 0 ? `${hours} hr ` : ''}${mins > 0 ? `${mins} min` : ''}`.trim();
    };

    return (
        <>
            {searchResults?.itineraries?.map((flight: any, index: number) => (
                <Card key={index} className="w-full lg:max-w-screen-lg mx-auto mt-4 py-6">
                    {flight.legs[0]?.carriers?.marketing[0]?.logoUrl && (
                        <div className="flex items-center gap-4 justify-around">
                            <img
                                src={flight.legs[0].carriers.marketing[0].logoUrl}
                                alt="Airline Logo"
                                className="w-12 h-12"
                            />
                            <div>
                                <p className="text-gray-500">{flight.legs[0]?.departure
                                    ? new Date(flight.legs[0].departure).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })
                                    : 'N/A'} - {flight.legs[0]?.arrival
                                        ? new Date(flight.legs[0].arrival).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })
                                        : 'N/A'}</p>
                                <p className="text-xl font-bold">{flight.legs[0].carriers.marketing[0].name}</p>
                            </div>
                            <div className="flex flex-col">
                                <span> {formatDuration(flight.legs[0].segments[0].durationInMinutes)}</span>
                                <span> {flight.legs[0].origin.displayCode} - {flight.legs[0].destination.displayCode}</span>

                            </div>
                            <div>
                                {flight.legs[0].stopCount > 1 ? flight.legs[0].stopCount + " stops" : flight.legs[0].stopCount === 1 ? "1 stop" : "Nonstop"}
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                {Math.floor(Math.random() * (500 - 100 + 1)) + 100} kg CO2e
                                <span>+29% emissions</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                {flight.price.formatted}
                            </div>
                        </div>
                    )}
                </Card>
            ))}
        </>

    );
};

export default SearchResults    