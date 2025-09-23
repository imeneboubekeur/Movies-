export async function fetchMovies(category, genreId, sortBy,page) {
if(page==null){page=1}
    let url = `https://api.themoviedb.org/3/discover/${category}?api_key=7c1df1bd8915cee5d5406945b86e9839&language=en-US&page=${page}`
    if (genreId) {
        if (sortBy) {
            url = `https://api.themoviedb.org/3/discover/${category}?api_key=7c1df1bd8915cee5d5406945b86e9839&with_genres=${genreId}&sort_by=${sortBy}&language=en-US&page=${page}`
        } else { url = `https://api.themoviedb.org/3/discover/${category}?api_key=7c1df1bd8915cee5d5406945b86e9839&with_genres=${genreId}&language=en-US&page=${page}` }
    } else if (sortBy) {
        url = `https://api.themoviedb.org/3/discover/${category}?api_key=7c1df1bd8915cee5d5406945b86e9839&sort_by=${sortBy}&language=en-US&page=${page}`

    }
    const res = await fetch(url)
    return res.json();
}