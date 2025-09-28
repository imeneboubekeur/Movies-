import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
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


export default function Carousel({url,link,property,property1,property3}){
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
        const res = await fetch(url)
  const data= await res.json();
  console.log("seasons",data.seasons)
setSeries(data[property])
}
   fetchData()  
},[url,property])
  console.log("seasonssss",series)

return(<>

<Slider className="titleAdd" {...settings}>

        {series.map((serie) => (
        
<Link to={ serie[property3] ? `${link}/${serie[property3]}` : `${link}`}>
                    <div key={serie.id}>

 <img src={`https://image.tmdb.org/t/p/w200/${serie[property1]}`}>
        
        </img>

        <div className="title">
          
            {serie.title || serie.name}</div>
             </div>
             </Link>
 ) )
 
 }
 

      </Slider>
      </>
)

}