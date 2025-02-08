
import { InfoIcon } from 'lucide-react'

import Header from '@/components/header'
import SearchCard from '@/components/search-card'
import flight from '@/assets/flights-bg.svg'
import map from '@/assets/map.png'

const Main = () => {

    return (
        <main >
            <Header />
            <div className="w-full 2xl:max-w-screen-2xl mx-auto">
                <img src={flight} alt="Flights background" />
                <div className="text-center text-6xl -mt-20">
                    Flights
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <SearchCard />
                    {/* <div className="flex text-xl font-semibold mt-10 items-center gap-2">
                        <div>
                            Find cheap flights from Tel Aviv-Yafo to anywhere
                        </div>
                        <InfoIcon size={20} className='text-gray-400' />
                    </div>
                    <div className="flex gap-2 mt-2">

                        {['Tel Aviv-Yafo', 'Haifa', 'Amman', 'Eilat'].map(city => (
                            <div key={city} className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
                                {city}
                            </div>
                        ))}
                    </div> */}
                    <div className="w-full rounded-xl md:rounded-2xl p-4 mt-10 md:p-0 md:w-[736px] lg:w-[982px] overflow-hidden">
                        <img src={map} className="w-full block" alt="Map background" />
                    </div>
                </div>
            </div>
        </main >
    )
}

export default Main