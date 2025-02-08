import { useNavigate } from "react-router"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MenuIcon, MoonIcon, Grip } from "lucide-react"

import google from '../assets/google.svg'
import icon1 from '../assets/header-icon1.svg'
import icon2 from '../assets/header-icon2.svg'
import icon3 from '../assets/header-icon3.svg'
import icon4 from '../assets/header-icon4.svg'
import icon5 from '../assets/header-icon5.svg'


const items = [
    { name: "Travel", icon: icon1 },
    { name: "Explore", icon: icon2 },
    { name: "Flights", icon: icon3 },
    { name: "Hotels", icon: icon4 },
    { name: "Vacation rentals", icon: icon5 },
];

const Header = () => {

    const navigate = useNavigate()
    return (
        <div className="h-16 w-screen px-6 py-4 flex items-center justify-between bg-white border-b border-gray-300">
            <div className="flex gap-4 items-center ">
                <MenuIcon size={24} className="block" />
                <img onClick={() => navigate('/')} src={google} alt="google" className="block mt-1" />

                <div className="hidden lg:flex gap-1 ml-8">
                    {items.map(({ name, icon }) => (
                        <div
                            key={name}
                            className="flex gap-1 items-center border border-gray-300 rounded-full text-black px-4 py-1.5"
                        >
                            <img src={icon} alt={name} className="w-4.5 h-4.5" />
                            <span>{name}</span>
                        </div>
                    ))}
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