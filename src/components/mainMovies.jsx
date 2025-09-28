import {Movies}  from "./movies"
import{Filter}  from "./filter"
import { Pages } from "./movies"
import {useSearchParams} from "react-router-dom";

const layout="grid"
export default function movies(){
         const [searchParams]=useSearchParams()
let page=searchParams.get("page")
  if (page==null){page=1}
return(
<section className="main">
    <Filter category={"movie"} name={"MOVIES"}/>
    <Movies category={"movie"} layout={layout} />
    
</section>
)
}