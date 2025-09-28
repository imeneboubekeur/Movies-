import { Element } from "./movies";

export function SearchResults({category,results,text,movies1}){
    let display
    if (text==""){
        display=results
    } else {
        display=movies1
    }
    if (movies1)
   {console.log("movies1", movies1)

   return <div className="movies grid"> {display.map(data => {
        if ((data.title &&data.title.toLowerCase().replace(/\s+/g, '').indexOf(text.toLowerCase().replace(/\s+/g, '')) === -1)||
    (data.name &&data.name.toLowerCase().replace(/\s+/g, '').indexOf(text.toLowerCase().replace(/\s+/g, '')) === -1)
    ) {
            return
        } else {
            return <Element key={data.id} category={category} data={data}></Element>

        }
    })} </div>}

}