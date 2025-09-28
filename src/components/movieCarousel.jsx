import {Element} from "./movies"
import { Link } from "react-router-dom";
import { fetchMovies } from "../api/movies"
import { useEffect,useState,useRef } from "react"
import { useLocation } from "react-router-dom";
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
export default function MovieCarousel({ category, genreId}) {
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
    
  };
  const [movies,setMovies]=useState([])
    const sliderRef = useRef(null);
const location = useLocation();
useEffect(() => {
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 100);
}, []);
  useEffect(() => {
    if (sliderRef.current && sliderRef.current.slickGoTo) {
      sliderRef.current.slickGoTo(0, true);
    }
  }, [location]);
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0); 
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
useEffect(()=>{
fetchMovies(category,genreId).then((data)=>{
   return setMovies(data.results)
})
},[category,genreId])
if (movies.length==0){
    console.log("no movies")
    return <div>no movies</div>
}
if(movies.length!=0)
  return (
    
     
      <Slider ref={sliderRef} {...settings}>
        
        {movies.map((movie) => (
               <Link to ={`/movies/${movie.id}`} key={movie.id}
             >       <div >

 <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}>
        
        </img>

        <div className="title">
          
            {movie.title || movie.name}</div>
             </div>
 </Link> 
 ) )}
 

      </Slider>
    
  );
}
