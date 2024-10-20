const baseUrl = "https://api.themoviedb.org/3"
const endUrl = "?append_to_response=videos,images,credits&language=es-ES"
const options = { method: 'GET', headers: { accept: 'application/json' } }

const getDetails = async (resource, id) => {
    const url = `${baseUrl}/${resource}/${id}${endUrl}&api_key=${import.meta.env.TMDB_API_KEY}`
    const response = await fetch(url, options)
    return await response.json()
}

const getBackropImage = (backdropPath) => {
    return `https://image.tmdb.org/t/p/original${backdropPath}`
}
const getAvatarImage = (avatarPath) => {
    return `https://image.tmdb.org/t/p/w185${avatarPath}`
}

export { getDetails, getBackropImage, getAvatarImage }