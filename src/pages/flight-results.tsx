import Header from "@/components/header"
import ClassSelect from "@/components/class-select"
import PassengersSelect from "@/components/passengers-select"
import DirectionSelect from "@/components/direction-select"
import DestinationSelect from "@/components/destination-select"
import OriginSelect from "@/components/origin-select"
import CalendarSelect from "@/components/calendar-select"
import FilterSection from "@/components/filter-section"
import { useSearch } from "@/hooks/useSearch"
import SearchResults from "@/components/search-results"



const FlightResults = () => {
    const { searchResults } = useSearch()
    return (
        <main className="">
            <Header />
            <div className="w-full lg:max-w-screen-lg mx-auto flex items-center gap-2 mt-8">
                <DirectionSelect />
                <PassengersSelect />
                <ClassSelect />
            </div>
            <div className="w-full lg:max-w-screen-lg mx-auto flex items-center gap-2 mt-4">
                <OriginSelect />
                <DestinationSelect />
                <CalendarSelect />
            </div>
            <div className="w-full lg:max-w-screen-lg mx-auto  mt-4">
                <FilterSection />
            </div>
            {searchResults && <SearchResults />}
        </main>
    )
}

export default FlightResults