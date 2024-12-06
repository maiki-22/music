import { HomeIconIn, HomeIconOut, SearchIcon } from "./resources/Icons";
import SearchBar from "./resources/SearchBar";
import { Link } from 'react-router-dom';
export function Navbar() {

const isHomePage = window.location.pathname === "/";

return (
    <>
        <Link
            to="/"
            className="rounded-full hover:text-red-500 bg-zinc-900 size-12 flex items-center justify-center cursor-pointer hover:scale-110 transition duration-300"
        >
            {isHomePage ? <HomeIconIn /> : <HomeIconOut />}
        </Link>

        <SearchBar />
    </>
);
}

export default Navbar