import {useEffect,useState}  from "react"
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { genreMovies } from "../api/genre"
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
export function Main(){
  function SampleNextArrow1(props) {
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

function SamplePrevArrow1(props) {
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
   const settings = {
       slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 100,
  cssEase: "linear",
  infinite: true,
  arrows: true,
     nextArrow: <SampleNextArrow1 />,
  prevArrow: <SamplePrevArrow1 /> 
}
const [movies,setMovies]=useState([])
useEffect(()=>{
     const fetchTrending = async () => {
      const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=7c1df1bd8915cee5d5406945b86e9839`
      );
      const data = await res.json();
      console.log(data)
      setMovies(data.results); 
    };

    fetchTrending();
},[])
    return(
      
            
           
            <Slider  className="slide"{...settings} style={{

               width:"98%",
               margin:"0 auto",
                 marginTop:"20px"

            }}>
                
             {movies.map((movie) => 
                 { return <div> <div key={movie.id} className="single1"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
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
<Link to={`/movies/${movie.id}`} style={{
  position:"absolute",
  bottom:"20px",
  left:"20px",
  width:"fit-content",
  backgroundColor:"#7530ad",
  color:"white",
  borderRadius:"4px",
  padding:"10px"
}}>REGARDER</Link>
  </div>
            </div>

          </div>    }
            
            
               )}

       
</Slider>
        
    )
}
export function ElementHome({url,title,category,img,slides}){
   const [slidesToShow, setSlidesToShow] = useState(8);
  
    // detect window width and set slides
    useEffect(() => {
      const updateSlides = () => {
        const width = window.innerWidth;
        if (width < 480) {
          setSlidesToShow(2);
        } else if (width < 800) {
          setSlidesToShow(slides-2);
        } else if (width < 1024) {
          setSlidesToShow(slides);
        } else {
          setSlidesToShow(slides);
        }
      };
  
      updateSlides(); // run once at mount
      window.addEventListener("resize", updateSlides);
  
      return () => window.removeEventListener("resize", updateSlides);
    }, [slides]);
    const settings = {
       slidesToShow: slidesToShow,
  slidesToScroll:slidesToShow ,
  
  speed: 1000,
  infinite: true,
  dots: true,
  arrows: true,
     nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow /> 
}
const [movies,setMovies]=useState([])
useEffect(()=>{
     const fetchTrending = async () => {
      const res = await fetch(
       url
      );
      const data = await res.json();
      setMovies(data.results); 
    };

    fetchTrending();
},[url])
    return(
        <div className="element">
            <h2 className="subTitle">{title}</h2>
            <p>spend the movie night with your friends.</p>
            <Slider  {...settings}>
                
             {movies.map((movie) => {
                return <Link  key={movie.id} to ={`/${category}/${movie.id}`}>
                    <div >

 <img src={`https://image.tmdb.org/t/p/original/${movie[`${img}_path`]}`}>
        
        </img>

        <div className="title">
          
            {movie.title||movie.name}</div>
             </div>
             </Link>
              } )}
</Slider>
        </div>
    )
}

export default function Home(){
      const [genres, setGenres] = useState([]);
  useEffect(() => {

        genreMovies("movie").then(data => {
            setGenres(data.genres)

        })
    }, [])
    return(<>
    <Main/>
        <ElementHome 
        url={`https://api.themoviedb.org/3/trending/movie/week?api_key=7c1df1bd8915cee5d5406945b86e9839`} 
        title={"TOP MOVIES THIS WEEK"}
        category={"movies"}
        img={"poster"}
        slides={6}
        />
         <ElementHome 
        url={`https://api.themoviedb.org/3/trending/tv/week?api_key=7c1df1bd8915cee5d5406945b86e9839`} 
        title={"TOP SERIES THIS WEEK"}
 category={"series"}
 img={"backdrop"}
 slides={4}
        />
         {genres.map(genre => {
                return  <ElementHome key={genre.id}
        url={`https://api.themoviedb.org/3/discover/movie?api_key=7c1df1bd8915cee5d5406945b86e9839&with_genres=${genre.id}&language=en-US&page=1`} 
        title={genre.name}
        category={"movies"}
        img={"poster"}
        slides={6}
        />
            })}
        </>
    )
}
