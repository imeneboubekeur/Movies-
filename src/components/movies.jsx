import { useEffect,useState } from "react"
import {useSearchParams,NavLink,Link } from "react-router-dom";
import { fetchMovies } from "../api/movies"
 




export  function Element({category,data}){
  if (category=="tv"){
    category="series"
  }
   if (category=="movie"){
    category="movies"
  }
    return ( <NavLink to ={`/${category}/${data.id}`}> 
 <div className="elements" >
  <div className="image-wrapper" >
        <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}>
      
        </img>
        <div className="shadow" ></div>
</div>
        <div className="title">
           
            {data.title || data.name}</div>
    </div>
   </NavLink> )
}
export function Pages({page}){
      const [searchParams] = useSearchParams();

     const buildPageNavLink = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    return `?${params.toString()}`;
  };

    return(
        <ul className="pages">
            { ((page-1)>0) && (<NavLink to={buildPageNavLink(parseInt(page) -1)}
             ><li>
                {"<"}
            </li>
            </NavLink>
            )}
            { ((page-1)>0) && (<NavLink to={buildPageNavLink(parseInt(page) -1)}
            ><li>
                {parseInt(page)-1}
            </li>
            </NavLink>
            )}
           <NavLink to={buildPageNavLink(parseInt(page) )}
            
             style={{
              backgroundColor:"#7530ad",
              color:"white"
             }}
             > <li>
                {parseInt(page)}
            </li>
            </NavLink>
            <NavLink to={buildPageNavLink(parseInt(page) +1)}
            >
            <li>
                {parseInt(page)+1}
            </li>
            </NavLink>
            <NavLink to={buildPageNavLink(parseInt(page) +1)}
            >
            <li>
                {">"}
            </li>
            </NavLink>
        </ul>
    )
}
export function Movies({category,genreId,layout}){
     const [loading, setLoading] = useState(false);
     const [movies, setMovies] = useState([]);
      const [searchParams] = useSearchParams();
 const sort = searchParams.get("sort")
  const genre = searchParams.get("genre")
  let page=searchParams.get("page")
  if (page==null){page=1}
  
//*const  id  = useParams().idGenre;
/*const idSort=useParams().sort;*/
    useEffect(()=>{
            setLoading(true);
const fetchData = async () => {
      try {
        let data;
        if (genreId) {
          data = await fetchMovies(category, genreId);
        } else {
          data = await fetchMovies(category, genre, sort, page);
        }
        setMovies(data.results);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
       
},[category,genre,genreId,sort,page])
   return (
       
        <>
    {loading ? (
        

        <p>Loading movies...</p> 
        
      ) : (
        <>
         <div className={`movies ${layout === "grid" ? "grid" : "row"} `}> 
        {movies.map((data) => <Element key={data.id}  category={category} data={data} />)}
        </div>
<Pages page={page}/>
 </>
      )}
       
</>

   )
}