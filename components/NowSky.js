import React, { useState, useEffect } from 'react';
import '../App.css';

function App({weatherData, setWeatherData}) {
  const [currentTimes, setCurrentTime] = useState('');
  const [skyValue, setskyValue] = useState([]);


  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = hours + minutes;
    setCurrentTime(currentTime);
  };

  useEffect(() => {
    getCurrentTime();
  }, []);

  console.log(currentTimes);

  useEffect(() => {
    const getSky = weatherData.filter((item) => item.category === 'SKY');
    setskyValue([...getSky]);
  }, [weatherData, setskyValue]);

  console.log(skyValue);
  const getWeatherIcon = (fcstValue, fcstTime) => {
    const skyValueItem = skyValue.find(item => item.fcstTime === fcstTime);
  
    if (fcstValue === '0') {
      if (fcstTime >= '0800' && fcstTime <= '1800') {
        if (skyValueItem && skyValueItem.fcstValue === '1') {
          return 'img/맑음.png';
        } else {
          return 'img/낮에구름.png';
        }
      } 
      else {
        if (skyValueItem && skyValueItem.fcstValue === '1') {
          return 'img/굿나잇.png';
        } else {
          return 'img/밤.png';
        }
      }
    } else {
      if (fcstTime >= '0800' && fcstTime <= '1800') {
        if (skyValueItem && skyValueItem.fcstValue === '1') {
          return 'img/낮에비.png';
        } else {
          return 'img/낮에비.png';
        }
      } else {
        if (skyValueItem && skyValueItem.fcstValue === '1') {
          return 'img/밤에비.png';
        } else {
          return 'img/밤에비.png';
        }
      }
    }
  };

  return (
    <div className="NowSky" style={{  display: "flex",
        flexDirection:"column"}}>

      <div className="main_weather">
        <div className="weather_forecast" style={{  display: "flex",
  flexDirection: "column"}}>
          <div className="SKY_container" style={{  display: "flex",
  flexDirection: "row",
  width: "100%" }}>
            {weatherData.map((item, index) => {
              if (item.category === 'PTY') {
                return (
                  <div className="SKY_fcstTime" key={index}>
                    {item.fcstTime.slice(0, 2)}시
                    <div className="SKY_value">
                      <img src={getWeatherIcon(item.fcstValue, item.fcstTime)} alt="" />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="T1H_container" style={{  display:"flex",
  flexDirection: "row",
  width: "100%" }}>
            {weatherData.map((item, index) => {
              if (item.category === 'T1H') {
                return (
                  <div className="T1H_container2" key={index}>
                    <div className="T1H_value" style={{  display:"flex",
//   flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width:"100px"}}>{item.fcstValue}°C</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;