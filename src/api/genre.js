export async function genreMovies(category){
    const res=await fetch(`https://api.themoviedb.org/3/genre/${category}/list?api_key=7c1df1bd8915cee5d5406945b86e9839&with_genres=35&language=en-US&page=1`)    
    return res.json();
}
export async function genreSeries(){
    const res=await fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=7c1df1bd8915cee5d5406945b86e9839&with_genres=35&language=en-US&page=1")
    return res.json();
}