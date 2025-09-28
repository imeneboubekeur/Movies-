export async function details1(series_id,season_number,episode_number){
    const res=await fetch(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}?api_key=7c1df1bd8915cee5d5406945b86e9839&language=en-US`)
    
    return res.json();
}