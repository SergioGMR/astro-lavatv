const baseUrl = "https://api.themoviedb.org/3"
const endUrl = "/popular?include_adult=false&include_video=true&language=es-ES&page=1&sort_by=popularity.desc&api_key="
const options = { method: 'GET', headers: { accept: 'application/json' } };
const getPopularMovies = async () => {
    const url = `${baseUrl}/movie${endUrl}${import.meta.env.TMDB_API_KEY}`
    const response = await fetch(
        url,
        options
    );
    const data = await response.json();
    return data.results.slice(0, 7);
}
const getPopularTvShows = async () => {
    const response = await fetch(
        `${baseUrl}/tv${endUrl}${import.meta.env.TMDB_API_KEY}`,
        options
    );
    const data = await response.json();
    return data.results.slice(0, 7);
}
const baseImgPath = "https://image.tmdb.org/t/p/w500";

export { getPopularMovies, getPopularTvShows, baseImgPath };