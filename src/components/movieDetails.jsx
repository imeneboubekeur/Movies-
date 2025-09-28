import { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom";
import {Movies}  from "./movies"
import { details } from "../api/movieDetails"
import { credits } from "../api/credits"
import Carousel from "./movieCarousel"
import zendaya  from "../images/zendaya.png"
import tom  from "../images/tomHolland.png"
import timothee  from "../images/timothe.png"
import marisa  from "../images/marisaTomei.png"
import gwyneth  from "../images/gwynethPaltrow.png"
import angelina  from "../images/angelinaJolie.png"

export function Backdrop({data}){
return (
        <div className="single"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
            }}>
                <div className="wrapper"  style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      boxShadow: "inset 0 200px 200px  rgba(0, 0, 0, 0.8)", 
    }}>
            <div className="single0">
                <div  style={{
  
    fontWeight: "bold",
    color: "white",
    textShadow: `
      0 0 5px #7530ad,
      0 0 10px #7530ad,
      0 0 20px #7530ad,
      0 0 40px #7530ad
    `,
  }}>{data.title||data.name} </div>
                <div className="singleGenres">
                    {data.genres.map((genre) => {
                        return<Link to ={`/movies?page=1&genre=${genre.id}`} key={genre.id}> <span >{genre.name}</span></Link>
                    })}
                </div>
                <div className="infos">
                    <div>{data.release_date||data.first_air_date}</div>
                    <div>2h 53m</div>
                    <div style={{
                        backgroundColor:"#7530ad",
                        borderRadius:"8px",
                        padding:"5px"
                    }}>{Math.round(data.vote_average*10)/10}/10</div>
                </div>
            </div>
            <div className="buttons">
                <div>
                    <button className="trailer">Watch Trailer</button>
                    <button className="add">+ Add to the list</button>
                </div>
                <div className="like">
                    <button className="likes" ><span>191</span> <span>like</span></button>
                    <button className="dislikes"><span>191 <span>dislike</span></span></button>
                </div>
            </div>
            </div>
        </div>
    )
}
export function Others({category,data}){
return (
    <Carousel category={category} genreId={data.genres[0].id} />
)
}
export function Credits(){
    /*useEffect(()=>{
        credits("movie",299534).then((credit)=>{
            console.log(credit)
            setActors(credit.cast)
            
        })
    },[])*/
  
    return(
        <div className="actors">
          <div className="actorsContainer">
             <div key={1} className="singleActor">
                   <img src={zendaya}>
        
        </img> 
        <p>Zendaya</p>
                </div>
                <div key={2} className="singleActor">
                   <img src={tom}>
        
        </img> 
        <p>Tom Holland</p>
                </div>
                <div key={3} className="singleActor">
                   <img src={timothee}>
        
        </img> 
        <p> Timothée Chalamet </p>
                </div>
                <div key={4} className="singleActor">
                   <img src={marisa}>
        
        </img> 
        <p>Marisa Tomei</p>
                </div>
                <div key={5} className="singleActor">
                   <img src={gwyneth}>
        
        </img> 
        <p>Gwyneth Paltrow</p>
                </div>
                <div key={6} className="singleActor">
                   <img src={angelina}>
        
        </img> 
        <p>Angelina Jolie</p>
                </div>
        </div>
        </div>

    )
}
export function Description({data}){
      const [activeTab, setActiveTab] = useState("description"); 

return(
    <div className="description">
         <div className="btns">
             <button onClick={() => setActiveTab("description")}>
          Description
        </button>
        <button onClick={() => setActiveTab("actors")}>
          Actors
        </button>
         </div>
          {activeTab === "description" && <div className="desc">
            <p>{data.overview}</p>
         </div>}
        {activeTab === "actors" && <Credits/>}
         
         
    </div>
)
}

export function Single({ data,credits ,category}) {
    console.log(data)
    return(
        <div>
        <Backdrop data={data}/>
        <Description data={data} credits={credits}/>
        <Others category={category}  data={data}></Others>
        </div>
    )
}

export function Details({ category }) {
    const [single, setSingle] = useState([])
        

        const [creditsObj, setCreditsObj] = useState(null)

    const id = useParams().id
    useEffect(() => {
        const fetchData = async () => {
    const singleData = await details(category, id);
    setSingle(singleData);
    
    const creditsData = await credits(category, id);
    console.log(creditsData)
    setCreditsObj(creditsData);
  };
  fetchData()
    }, [id,category])
    if (single.length !== 0) {
        return (
            <Single data={single} credits={creditsObj} category={category} />
        )
    }

}