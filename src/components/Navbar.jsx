import { HomeIconIn, HomeIconOut, SearchIcon } from "./resources/Icons";
import SearchBar from "./resources/SearchBar";
export function Navbar() {

const isHomePage = window.location.pathname === "/music";

return (
    <>
        <a
            href="/music"
            className="rounded-full hover:text-red-500 bg-zinc-900 size-12 flex items-center justify-center cursor-pointer hover:scale-110 transition duration-300"
        >
            {isHomePage ? <HomeIconIn /> : <HomeIconOut />}
        </a>

        <SearchBar />
    </>
);
}

export default Navbar