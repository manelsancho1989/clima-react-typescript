import styles from "./App.module.css"
import Alert from "./components/Alert/Alert"
import Form from "./components/Form/Form"
import useWeather from "./components/hooks/useWeather"
import Spiner from "./components/Spinner/Spiner"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"

function App() {
  const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Wheater Finder</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spiner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>City Not Found</Alert>}
      </div>
    </>
  )
}

export default App
