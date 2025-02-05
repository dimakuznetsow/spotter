
import './App.css'
import { InfoIcon } from 'lucide-react'

import Header from './components/header'
import SearchCard from './components/search-card'
import flight from './assets/flights-bg.svg'
import map from './assets/map.png'

function App() {

  return (
    <main className="w-full 2xl:max-w-screen-2xl mx-auto">
      <Header />
      <img src={flight} alt="Flights background" />
      <div className="text-center text-6xl -mt-20">
        Flights
      </div>
      <div className='w-3/4 mx-auto mt-20'>
        <SearchCard />
        <div className="flex text-xl font-semibold mt-10 items-center gap-2">
          <div>
            Find cheap flights from Tel Aviv-Yafo to anywhere
          </div>
          <InfoIcon size={20} className='text-gray-400' />
        </div>
        <div className="flex gap-2 mt-2">

          <div className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
            Tel Aviv-Yafo
          </div>
          <div className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
            Haifa
          </div>
          <div className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
            Amman
          </div>
          <div className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
            Eilat
          </div>
        </div>
        <img src={map} className='text-center mt-4 rounded-2xl' alt="Map background" />
      </div>
    </main >
  )
}

export default App
