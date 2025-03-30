import React from 'react'
import { Weather } from '../hooks/useWeather'
import { formatTemperature } from '../../utils'
import styles from './WeatherDetail.module.css'

type WeaterDetailProps = {
    weather: Weather
}
export default function WeatherDetail({ weather }: WeaterDetailProps) {
    return (
        <div className={styles.container}>
            <h2>Weather in: {weather.name}</h2>
            <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
            <div className={styles.temperatures}>
                <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
                <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
            </div>
        </div>
    )
}
