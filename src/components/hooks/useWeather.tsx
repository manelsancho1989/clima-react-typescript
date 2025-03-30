import axios from "axios"
import { SearchType } from "../../types"
import { z } from 'zod'
import { useMemo, useState } from "react"
//import { object, string, number, Output, parse } from 'valibot'

//Type with type guard
/*function isWeatherResponse(weatherResult: unknown): weatherResult is Weather {
    return (
        Boolean(weatherResult) &&
        typeof weatherResult === 'object' &&
        typeof (weatherResult as Weather).name === 'string' &&
        typeof (weatherResult as Weather).main.temp === 'number' &&
        typeof (weatherResult as Weather).main.temp_max === 'number' &&
        typeof (weatherResult as Weather).main.temp_min === 'number'
    )
}
*/

//Type with ZOD
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

export type Weather = z.infer<typeof Weather>

//Valibot
/*
const WehatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number(),
    })
})
type Weather = Output<typeof WehatherSchema>
*/

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    }
}

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState)

    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {

        setLoading(true)
        setWeather(initialState)

        const appID = import.meta.env.VITE_API_KEY

        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`
            const { data } = await axios(geoURL)

            if (!data[0]) {
                setNotFound(true)
                return
            }

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`
            const { data: weatherResult } = await axios(weatherURL)

            //Type with type guard
            /*
            console.log(weatherResult)
            const result = isWeatherResponse(weatherResult)
            console.log(result)
            */

            //Type with ZOD

            const result = Weather.safeParse(weatherResult)
            if (result.success) {
                setWeather(result.data)
            }

            //Valibot
            //const result = parse(WehatherSchema, weatherResult)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}