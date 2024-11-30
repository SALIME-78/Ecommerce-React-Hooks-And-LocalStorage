import { useState, useRef } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function SearchBar() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();

  const location = useLocation();

  const handleSearch = async (event) => {
    const searchedTerm = await event.target.value.toLowerCase();

    setSearchTerm(searchedTerm);
    if (searchedTerm) {
      setSearchParams({ q: searchedTerm });
    } else {
      setSearchParams({});
    }
  };

  const handleInputKeyDown = () => {
      navigate('/allproducts');
  };


  return (
    <div className="md:flex items-center flex-1 mx-6 max-w-[360px] min-w-[200px]">
      <form className="relative w-full">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
          value={searchTerm}
          onChange={(event) => handleSearch(event)}
          onKeyDown={handleInputKeyDown}
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
