import { ButtonLink } from "components/ButtonLink/ButtonLink";
import Link from "next/link";
import { FaHouseUser, FaHeart } from "react-icons/fa"

export const MainMenu = ({ items, callToActionLabel, callToActionDestination }) => {

    return (
        <div className="bg-slate-800 text-white px-5 h-[64px] sticky top-0 z-20 flex">
            <div className="py-4 pl-5 text-pink-600 flex">
                <FaHouseUser size={30} />
                <FaHeart size={30} />
            </div>
            <div className="flex flex-1 justify-end">
                {(items || []).map(item => (
                    <div key={item.id} className="hover:bg-slate-700 cursor-pointer relative group">
                        <div>
                            <Link className="p-5 block" href={item.destination}>
                                {item.label}
                            </Link>
                        </div>
                        {!!item.subMenuItems?.length &&
                            <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full -mt-2">
                                {item.subMenuItems.map(subMenuItem => (
                                    <Link
                                        key={subMenuItem.id}
                                        href={subMenuItem.destination}
                                        className="block whitespace-nowrap p-5 hover:bg-slate-700">
                                        {subMenuItem.label}
                                    </Link>
                                ))}
                            </div>
                        }
                    </div>
                ))}
                <div className="ml-3 my-auto">
                    <ButtonLink label={callToActionLabel} destination={callToActionDestination} />
                </div>
            </div>
        </div>);
}