import { useEffect,useState } from "react"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Episods(){
            const id = useParams().id
            const season = useParams().season;
            const [episods,setEpisods]=useState([])
useEffect(()=>{
    const fetchData= async()=> {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=7c1df1bd8915cee5d5406945b86e9839&language=en-US`)
  const data= await res.json();
  console.log("seasons",data)
setEpisods(data.episodes)
}
   fetchData()  
},[id,season])

return(
     <div className={`series` }> 
            {episods.map((data) => 
            <Link key={data.id} to ={`/series/${id}/${season}/${data.episode_number}`}> 
 <div className="elements" >
  <div className="image-wrapper"style={{overflow:"hidden", flex: "1"}}>
        <img src={`https://image.tmdb.org/t/p/w300/${data.still_path}`}>
        
        </img>
</div>
        <div className="title">
           
            {`Episode ${data.episode_number} : ${data.name}` }</div>
    </div>
   </Link> 
            )}
            </div>
)
}