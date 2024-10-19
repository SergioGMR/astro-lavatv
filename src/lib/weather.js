const obtenerCoordenadas = async () => {
    try {
        if ("geolocation" in navigator) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.warn("Error al obtener la ubicación:", error.message);
                        reject(error);
                    },
                    { timeout: 10000, maximumAge: 0 }
                );
            });
        } else {
            console.warn("Usando coordenadas predeterminadas:", error.message);
            return obtenerCoordenadaPredeterminada();
        }
    } catch (error) {
        console.warn("Usando coordenadas predeterminadas:", error.message);
        return obtenerCoordenadaPredeterminada();
    }
};

const obtenerCoordenadaPredeterminada = () => {
    const ciudades = [
        { lat: 40.4168, lon: -3.7038 },  // Madrid
        { lat: 41.3851, lon: 2.1734 },   // Barcelona
        { lat: 37.3891, lon: -5.9845 },  // Sevilla
        { lat: 39.4699, lon: -0.3763 },  // Valencia
        { lat: 43.2630, lon: -2.9350 },   // Bilbao
        { lat: 28.4636, lon: -16.2518 },  // Santa Cruz de Tenerife
        { lat: 28.1235, lon: -15.4366 },  // Las Palmas de Gran Canaria
        { lat: 27.8081, lon: -17.9156 }   // Valverde, El Hierro
    ];
    return ciudades[Math.floor(Math.random() * ciudades.length)];
};

const getWeatherWithCache = async (coords, cacheDuration = 10 * 60 * 1000) => {
    try {
        const coords = await obtenerCoordenadas();
        const apiKey = import.meta.env.OPENWEATHER_API_KEY;
        console.log(apiKey);
        if (!apiKey) {
            console.error("La clave de API de OpenWeather no está definida");
            throw new Error("Clave de API no disponible");
        }
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=es&appid=${apiKey}`;
        console.log(apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener el clima:", error.message);
        throw error;
    }
};

export { obtenerCoordenadas, getWeatherWithCache };