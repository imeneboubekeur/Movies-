import {Element} from "./movies"
import { Link } from "react-router-dom";
import { fetchMovies } from "../api/movies"
import { useEffect,useState } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
  const settings = {
    dots: true,           // show dots below slider
    infinite: true,       // loop slides
    speed: 500,           // animation speed (ms)
    slidesToShow: 8,      // number of slides visible
    slidesToScroll: 8,responsive: [         // make it responsive
      {
        breakpoint: 1024,
        settings: { slidesToShow: 6, slidesToScroll: 6}
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 4, slidesToScroll: 4 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      }
    ],
     nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />   // number of slides to scroll per click
    /*responsive: [         // make it responsive
      {
        breakpoint: 1024,
        settings: { slidesToShow: 6, slidesToScroll: 6}
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 6, slidesToScroll: 6 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      }
    ]*/
  };
  const [movies,setMovies]=useState([])
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
    
     
      <Slider {...settings}>
        
        {movies.map((movie) => (
               <Link to ={`/movies/${movie.id}`} key={movie.id}
             >       <div key={movie.id}>

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
