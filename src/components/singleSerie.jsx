import { details } from "../api/movieDetails"
import { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
 style={{
        ...style,
        position:"absolute",
       right:"10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#7530ad",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        zIndex: 2,
      }}      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
         position:"absolute",
       left:"10px",
        alignItems: "center",
        justifyContent: "center",
        background: "#7530ad",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

export function SingleD({data}){
    return (
        <div className="cols">
        <div className="col1" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
            }}>
                <div className="wrapper wrap"  style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      boxShadow: "inset 0 200px 200px  rgba(0, 0, 0, 0.8)", 
    }}>
 <div className="like">
                    <button className="likes" ><span>191</span><span>like</span></button>
                    <button className="dislikes"><span>191 <span>dislike</span></span></button>
                </div>
                <div className="avg" style={{
                        backgroundColor:"#7530ad",
                        borderRadius:"8px",
                        padding:"5px",
                       
                    }}>{Math.round(data.vote_average*10)/10}/10</div>
        </div>
        </div>
        <div className="col2">
            <div  style={{
   fontSize: "3rem",
    fontWeight: "bold",
    color: "white",
    textShadow: `
      0 0 5px #7530ad,
      0 0 10px #7530ad,
      0 0 20px #7530ad,
      0 0 40px #7530ad
    `,
  }}>{data.title||data.name} </div>
                      <button className="add" style={{
                        width:"fit-content"
                      }}>+ Add to the list</button>
 <p>{data.overview}</p>
 <div className="singleGenres">
                    {data.genres.map((genre) => {
                       
              return<Link to ={`/series?page=1&genre=${genre.id}`} key={genre.id}
              style={{color:"#7530ad"}}> <span >{genre.name}</span></Link>

                  })}
                </div>
        </div>
</div>
    )
}
export function Seasons({id}){
   const [slidesToShow, setSlidesToShow] = useState(8);
  
    useEffect(() => {
      const updateSlides = () => {
        const width = window.innerWidth;
        if (width < 480) {
          setSlidesToShow(2);
        } else if (width < 768) {
          setSlidesToShow(4);
        } else if (width < 1024) {
          setSlidesToShow(6);
        } else {
          setSlidesToShow(8);
        }
      };
  
      updateSlides(); 
      window.addEventListener("resize", updateSlides);
  
      return () => window.removeEventListener("resize", updateSlides);
    }, []);
    const settings = {
    dots: true,           
    infinite: true,       
    speed: 500,           
    slidesToShow: slidesToShow,     
    slidesToScroll: slidesToShow,
     nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
}
    const [series,setSeries]=useState([])
useEffect(()=>{
    const fetchData= async()=> {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=7c1df1bd8915cee5d5406945b86e9839&language=en-US`)
  const data= await res.json();
  console.log("seasons",data)
setSeries(data.seasons)
}
   fetchData()  
},[id])
return(
<Slider {...settings}>
        
        {series.map((serie) => (
<Link to={`/series/${id}/${serie.season_number}`}>
                    <div key={serie.id}>

 <img src={`https://image.tmdb.org/t/p/w200/${serie.poster_path}`}>
        
        </img>
<div ></div>
        <div className="title">
          
            {serie.title || serie.name}</div>
             </div>
             </Link>
 ) )
 
 }
 

      </Slider>
)
}
export default function SingleSerie(){
const [single, setSingle] = useState([])
            const id = useParams().id
             useEffect(() => {
 const fetchData = async () => {
    const singleData = await details("tv", id);
    setSingle(singleData);
 }
 fetchData()
    }, [id])
     if (single.length !== 0) {
            return (
                <>
                <SingleD data={single}  />
                <Seasons id={id}/>
                </>
            )
        }
}