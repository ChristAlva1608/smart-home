import { useEffect, useState } from 'react'
// import Loading from "../Weather/Loading";
import WeatherForm from '../Weather/WeatherForm'
import WeatherDetails from '../Weather/WeatherDetails'
import Divider from '@mui/material/Divider';

import classNames from 'classnames/bind'
import styles from './Weather.module.scss'
import { RingLoader } from 'react-spinners'

const cx = classNames.bind(styles)
const override = {
    position: 'relative',
    top: '50%',
    display: 'block',
    margin: '0 auto',
}
function Weather() {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        loadInfo()
    }, [])

    async function loadInfo(city = 'Ho Chi Minh City') {
        try {
            const data = await fetch(
                `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`,
            )
            const response = await data.json()
            setWeather(response)
        } catch (error) {}
    }

    function handleChangeCity(city) {
        setWeather(null)
        loadInfo(city)
    }

    return (
        <div className={cx('weather-app')}>
          
            <h4 style = {{fontSize: '20pt'}}>Temperature Outside</h4>
            <WeatherForm onChangeCity={handleChangeCity} />
            {weather ? (
                <>
                    <WeatherDetails weather={weather} />
                </>
            ) : (
                <RingLoader color="navy" loading={true} cssOverride={override} />
            )}
              <Divider style={{margin: "20px"}}/>
        </div>
    )
}

export default Weather
