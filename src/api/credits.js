export async function credits(category,id){
const res=await fetch(`https://api.themoviedb.org/3/${category}/${id}/credits?api_key=7c1df1bd8915cee5d5406945b86e9839&language=en-US`)
    
    return res.json();
}