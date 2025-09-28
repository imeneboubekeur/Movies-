import { genreMovies } from "../api/genre"
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { Link } from "react-router-dom";


export function Genre({ genres ,open}) {
    const [searchParams] = useSearchParams();

     const buildPageLink = (genre) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    params.set("genre", genre);
    return `?${params.toString()}`;
  };

   
    return (

        <ul className={`genres ${open ? "open" : ""}`} style={{
            backgroundColor: "rgba(255, 252, 252, 1)",

            position: "absolute",
            top: 25, left: 0, right: 0, bottom: 0,

            zIndex: 1000,
           
        }}>
            {genres.map(genre => {
                return <li key={genre.id}>
                    <Link to={buildPageLink(genre.id)}> {genre.name}</Link>

                </li>
            })}
        </ul>
    )

}
export function Sort({ open }) {
 const [searchParams] = useSearchParams();

     const buildPageLink = (sort) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    params.set("sort", sort);
    return `?${params.toString()}`;
  };
   
    return <ul className={`genres ${open ? "open" : ""}`} style={{
        backgroundColor: "rgba(255, 252, 252, 1)",

        position: "absolute",
        top: 25, left: 0, right: 0, bottom: 0,

        zIndex: 1000,
        
    }}>

        <li key={1}>
<Link to={buildPageLink("popularity.desc")}> Popular</Link>
        </li>
<li key={2}>
<Link to={buildPageLink("release_date.desc")}> Derniers Ajouts</Link>
        </li>
        <li key={3}>
<Link to={buildPageLink("vote_average.desc")}> Le Mieux Noté</Link>
        </li>

    </ul>


}
export function Filter({category,name}) {
    const [searchParams] = useSearchParams();
    const [genres, setGenres] = useState([]);
      const [openGenre, setOpenGenre] = useState(false);
  const [openSort, setOpenSort] = useState(false);
   
    const genre = searchParams.get("genre")
    console.log(genre)
    const dropdownRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
             
                   setOpenGenre(false);
        setOpenSort(false);
            }
        }


        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);

        };
    }, []);


    useEffect(() => {

        genreMovies(category).then(data => {
            setGenres(data.genres)

        })
    }, [category])
    return (
        <div className="relCon">
        <div ref={dropdownRef} className="relative">
            <div className="name">{name}</div>
            <button ref={dropdownRef} style={{ position: "relative" }} onClick={() => {
                setOpenGenre((prev) => !prev)
                   
        setOpenSort(false);
                
            }

            }>Genres
              
                 <Genre genres={genres} open={openGenre} />
            </button>
            <button  style={{ position: "relative" }} onClick={() => {
                setOpenSort((prev) => !prev);
          setOpenGenre(false);
            
            }}>Sort 

           
             <Sort  open={openSort} />
            </button>

        </div>
        <p style={{color:"#be5fff",
                fontSize:" 0.875rem",
                fontStyle: "italic"
        }}>Action,Emotions,laugh or fears,everything is here!</p>
</div>
    )
}


