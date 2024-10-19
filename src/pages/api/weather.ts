import { getWeatherWithCache } from "@lib/weather"
import type { APIRoute } from "astro"

export const GET: APIRoute = async (request) => {
    const lat = request.url.searchParams.get("lat")
    const lon = request.url.searchParams.get("lon")
    const weather = await getWeatherWithCache({ lat, lon })
    return new Response(JSON.stringify(weather), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    })
}