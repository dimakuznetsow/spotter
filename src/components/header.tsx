import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MenuIcon, MoonIcon, Grip } from "lucide-react"

import google from '../assets/google.svg'


const Header = () => {
    return (
        <div className="h-16 w-screen px-6 py-4 flex items-center justify-between bg-white border-b border-gray-300">
            <div className="flex gap-4 items-center justify-center">
                <MenuIcon size={24} className="block" />
                <img src={google} alt="google" className="h-6 block" />

                <div className="flex gap-2 ml-8">
                    <div className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
                        <div>
                            x
                        </div>
                        <div>
                            Travel
                        </div>
                    </div>
                    <div className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
                        <div>
                            x
                        </div>
                        Explore
                    </div>
                    <div className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
                        <div>
                            x
                        </div>
                        Flights
                    </div>
                    <div className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
                        <div>
                            x
                        </div>
                        Hotels
                    </div>
                    <div className="flex gap-1 items-center border-1 rounded-full border-gray-300 text-black px-4 py-1.5">
                        <div>
                            x
                        </div>
                        Vacation rentals
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-center justify-center">
                <MoonIcon size={24} className="block" />

                <Grip size={24} className="block" />
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>DK</AvatarFallback>
                </Avatar>
            </div>

        </div>
    )
}

export default Header