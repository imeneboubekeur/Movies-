import {Movies}  from "./movies"
import{Filter}  from "./filter"
import { Pages } from "./movies"
import {useSearchParams} from "react-router-dom";

const layout="grid"
export default function serie(){
          const [searchParams] = useSearchParams();
let page=searchParams.get("page")
  if (page==null){page=1}
return(
<section className="main">
    <Filter category={"tv"} name={"SERIES"}/>
    <Movies category={"tv"} layout={layout} />
    
</section>
)
}