import {Details}  from "./movieDetails"
import{Filter}  from "./filter"


export default function movies({category}){
return(
<section className="main">
    
    <Details category={category}  />
</section>
)
}