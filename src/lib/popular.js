const baseUrl = "https://api.themoviedb.org/3"
const endUrl = "/popular?include_adult=false&language=es-ES&page=1&sort_by=popularity.desc&api_key="
const options = { method: 'GET', headers: { accept: 'application/json' } };
const getPopularMovies = async () => {
    const url = `${baseUrl}/movie${endUrl}${import.meta.env.TMDB_API_KEY}`
    const response = await fetch(
        url,
        options
    );
    const data = await response.json();
    return data.results
}
const getPopularTvShows = async () => {
    const response = await fetch(
        `${baseUrl}/tv${endUrl}${import.meta.env.TMDB_API_KEY}`,
        options
    );
    const data = await response.json();
    return data.results
}
const baseImgPath = "https://image.tmdb.org/t/p/w780";

export { getPopularMovies, getPopularTvShows, baseImgPath };