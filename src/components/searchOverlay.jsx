import { useState, useEffect } from "react";
import { Movies } from "./movies"
import SearchBar from "./searchBar"
import { SearchResults } from "./searchResults"
import { fetchMovies } from "../api/movies";

export function Close({ handleClose }) {
    return (<div className="container">
        <button className=".material-symbols-outlined " onClick={() => handleClose()}>
            <span className="material-symbols-outlined">
                close_small
            </span></button>

    </div>


    )
}
export function SearchOverlay({handleClose,isClosing}) {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
        const [movies1, setMovies1] = useState([]);

    const [tvShows1, setTvShows1] = useState([]);
    const [query,setQuery]=useState("")
    useEffect(() => {
        fetchMovies("movie").then((movies) => {
            setMovies(movies.results)
        })
        fetchMovies("tv").then((series) => {
            console.log("series",series.results)
            setTvShows(series.results)
        })
    }, [])
    useEffect(() => {
  const loadMovies = async () => {
    const promises = []
    for (let i = 1; i <= 5; i++) {
      promises.push(fetchMovies("movie", null, null, i))
    }
    const results = await Promise.all(promises)
    setMovies1(results.flatMap(r => 
      r.results.filter(movie => movie.id !== 13494) ))
  }

  loadMovies()
}, [])
         
   useEffect(() => {
  const loadMovies = async () => {
    const promises = []
    for (let i = 1; i <= 5; i++) {
      promises.push(fetchMovies("tv", null, null, i))
    }
    const results = await Promise.all(promises)
    setTvShows1(results.flatMap(r => 
      r.results.filter(movie => movie.id !== 13494) ))
  }

  loadMovies()
}, [])
     /*useEffect(() => {
    if (query.trim() === "") return;

    const fetchData = async () => {
      const res = await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=7c1df1bd8915cee5d5406945b86e9839&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await res.json();
     if (data.results) {
                const movieResults = data.results.filter(
                    (item) => item.media_type === "movie"
                );
                const tvResults = data.results.filter(
                    (item) => item.media_type === "tv"
                );

                setMovies(movieResults);
                setTvShows(tvResults);
            } else {
                 setMovies([]);
                setTvShows([]);
            }
    };

    fetchData();
  }, [query]);*/
  console.log("serieee",tvShows1)
    return (
        <div className={`overlay ${isClosing ? "hide" : ""}`}
            style={{
              
            }}
        >
                        <Close handleClose={handleClose} />

            <SearchBar query={query} setQuery={setQuery} />

            {movies.length > 0 && (
                <>
                    <h2 style={{ color: "white" }}>Movies</h2>
                    <SearchResults category={"movies"} results={movies} text={query} movies1={movies1}/>
                </>
            )}

            {tvShows.length > 0 && (
                <>
                    <h2 style={{ color: "white" }}>TV Shows</h2>
                    <SearchResults category={"tv"} results={tvShows} text={query} movies1={tvShows1}/>
                </>
            )}
        </div>
    );
}
