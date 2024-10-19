import { obtenerCoordenadas } from '@lib/weather';
import { useState, useEffect } from 'react';

const Weather = () => {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // obtenerCoordenadas()
    // .then((coords) => {
    //   setCoords(coords)
    // })
    // .catch((error) => {
    //   console.error(error)
    // })
    // .finally(() => {
    //   console.log('finally')
    // })
    // if (coords) {
    //   fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setWeather(data)
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // }
  }, [coords, weather])

  return (
    <div>
      <h1>Weather</h1>
      <p>Coords: {JSON.stringify(coords)}</p>
    </div>
  )
}

export default Weather