import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "./Icons";
import { search } from "../Api";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchSearchResults();
    }
  };

  const fetchSearchResults = async () => {
    if (searchTerm.trim() === "") return;
    try {
      const response = await search(searchTerm);
      navigate(`/music/search?query=${searchTerm}`, { state: { results: response } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="relative hidden md:block">
      <div className="absolute flex items-center justify-center size-12 text-zinc-700 focus:ring-white">
        <SearchIcon />
      </div>
      <input
        type="text"
        className="block w-[400px] transition duration-300 h-12 p-2 ps-12 text-sm rounded-full bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
