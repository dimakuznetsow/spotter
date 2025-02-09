import { useMemo } from 'react';
import { InfoIcon } from 'lucide-react';

import Header from '@/components/header';
import SearchCard from '@/components/search-card';
import flight from '@/assets/flights-bg.svg';
import map from '@/assets/map.png';
import athens from '@/assets/athens.jpeg';
import madrid from '@/assets/madrid.jpeg';
import vienna from '@/assets/vienna.jpeg';
import new_york from '@/assets/new-york.jpeg';

const Main = () => {

    const adCities = useMemo(() => [
        {
            image: athens,
            city: "Athens",
            dates: "Mar 7 - Mar 16",
            details: "",
        },
        {
            image: madrid,
            city: "Madrid",
            dates: "Mar 7 - Mar 16",
            details: "",
        },
        {
            image: vienna,
            city: "Vienna",
            dates: "Mar 7 - Mar 16",
            details: "Nonstop 3 hr 50 min",
        },
        {
            image: new_york,
            city: "New York",
            dates: "Mar 7 - Mar 16",
            details: "1 stop 16 hr 50 min",
        },
    ], []);


    const cityTags = useMemo(() => ['Tel Aviv-Yafo', 'Haifa', 'Amman', 'Eilat'].map(city => (
        <div key={city} className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black text-sm px-4 py-1.5">
            {city}
        </div>
    )), []);

    return (
        <main>
            <Header />
            <div className="w-full 2xl:max-w-screen-2xl mx-auto">
                <img src={flight} alt="Flights background" />
                <div className="text-center text-5xl md:text-5xl lg:text-6xl -mt-10 md:-mt-14 lg:-mt-20">
                    Flights
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <SearchCard />
                    <section className="w-full md:max-w-screen-md lg:max-w-screen-lg px-4">
                        <div className="flex text-xl font-semibold mt-14 items-center gap-2 truncate">
                            <div>
                                Find cheap flights from Tel Aviv-Yafo to anywhere
                            </div>
                            <InfoIcon size={20} className='text-gray-400' />
                        </div>
                        <div className="flex gap-2 mt-2 ">
                            {cityTags}
                        </div>

                        <div className="w-full md:rounded-2xl mt-4 md:p-0 md:w-[736px] lg:w-[982px] overflow-hidden">
                            <img src={map} className="w-full block rounded-xl" alt="Map background" />
                        </div>
                        <div className="flex flex-col md:flex-row mt-4 justify-between gap-4">
                            {adCities.map((item, index) => (
                                <div key={index} className='flex md:flex-col gap-4 md:gap-0'>
                                    <img
                                        src={item.image}
                                        className="h-33.5 md:h-27  md:w-40 lg:w-56  block rounded-xl"
                                        alt={item.city}
                                    />
                                    <div>
                                        <div>
                                            <p className="text-base text-[#242424] font-medium mt-2">
                                                {item.city}
                                            </p>
                                        </div>
                                        <div className="text-sm text-[#70757a] font-normal mt-0.5">
                                            {item.dates}
                                        </div>
                                        {item.details && (
                                            <div className="text-sm text-[#70757a] font-normal">
                                                {item.details}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Main;