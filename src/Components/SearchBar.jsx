import { Search, X } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {

  return (
    <div className="search-container">

      <Search size={20} className="search-icon" />

      <input
        type="text"
        placeholder="Search cryptocurrency..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <button
          className="clear-button"
          onClick={() => setSearchTerm("")}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}

    </div>
  );
}

export default SearchBar;