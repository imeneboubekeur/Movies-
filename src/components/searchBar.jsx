import { useState } from "react";

export default function SearchBar({ query,setQuery }) {

  

  return (
    <form  className="searchBar">
      <input
        type="text"
        placeholder="Search movies or TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
     
    </form>
  );
}