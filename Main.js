import React, { useState, useEffect, useRef } from "react";
import { ref, get, child } from "firebase/database";
import "./App.css";
import { Paper } from "@mui/material";
import { db } from "./firebase";
import Menu from "./components/Menu";
import CircularProgress from "@mui/material/CircularProgress";
import Temp from "./components/Temp";
import NowAir from "./components/NowAir";
import Setting from "./components/Setting";
import NowSky from "./components/NowSky";
export default function Main() {
  const [alignment, setAlignment] = useState(true);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState("28");
  const [tempKo, setTempKo] = useState("맑음");
  const [wet, setWet] = useState("70");
  const [khaiGrade, setkhaiGrade] = useState("좋음");
  const [pm10, setPm10] = useState(10);
  const [pm25, setPm25] = useState(25);
  const [settingTime, setSettingTime] = useState([]);
  const [rainType, setrainType] = useState([]);
  const [keys, setKeys] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const aa = useRef(0);
  // 창문 state값 불러오기
  useEffect(() => {
    setLoading(true);
    async function getData() {
      const dbRef = ref(db);
      await get(child(dbRef, "/")).then((snapshot) => {
        console.log(snapshot.val());
        setState(snapshot.val().state);
        setrainType(snapshot.val().rain);
        var prekhaiGrade;
        setWeatherData(snapshot.val().forecastData);
        switch (snapshot.val().khaiGrade) {
          case "1":
            prekhaiGrade = "좋음😊";
            break;
          case "2":
            prekhaiGrade = "보통😐";
            break;
          case "3":
            prekhaiGrade = "나쁨😷";
            break;
          default:
            prekhaiGrade = "매우나쁨😡";
            break;
        }
        var tempKo;
        switch (snapshot.val().rain) {
          case "0":
            tempKo = "맑음";
            break;
          case "1":
            tempKo = "비";
            break;
          case "2":
            tempKo = "비/눈";
            break;
          case "3":
            tempKo = "눈";
            break;
          case "5":
            tempKo = "비";
            break;
          case "6":
            tempKo = "비";
            break;
          default:
            tempKo = "눈날림";
            break;
        }

        const filteredValues = Object.keys(snapshot.val())
          .filter((key) => key.startsWith("settingTime"))
          .map((key) => snapshot.val()[key])
          .splice(1);

        for (let i = 0; i < filteredValues.length; i++) {
          filteredValues[i].index = aa.current;
          aa.current += 1;
        }
        setSettingTime(filteredValues);
        const filteredKeys = Object.keys(snapshot.val())
          .filter((key) => key.startsWith("settingTime"))
          .splice(1);
        var newArrays = [];
        for (let i = 0; i < filteredKeys.length; i++) {
          newArrays[i] = filteredKeys[i];
        }
        setKeys(newArrays);
        setPm10(snapshot.val().pm10);
        setPm25(snapshot.val().pm25);
        setkhaiGrade(prekhaiGrade);
        setTemp(snapshot.val().temp);
        setWet(snapshot.val().wet);
        setTempKo(tempKo);
      });
    }
    getData();
    setLoading(false);
  }, []);
  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : alignment ? (
        <div>
          <></>
          <Paper elevation={3} sx={{ margin: "10px", paddingBottom: "20px" }}>
            {/* 날씨 */}
            <Temp
              temp={temp}
              tempKo={tempKo}
              wet={wet}
              khaiGrade={khaiGrade}
              rainType={rainType}
            />
            {/* 공기 */}

            <NowAir pm25={pm25} pm10={pm10} />
          </Paper>

          <Paper elevation={3} sx={{ margin: "10px" }}>
            <h2>시간별 예보</h2>
            <div style={{ overflowX: "scroll", paddingBottom: "10px" }}>
              <NowSky
                weatherData={weatherData}
                setWeatherData={setWeatherData}
              />
            </div>
          </Paper>
          <div
            style={{
              position: "fixed",
              width: "100%",
              bottom: 0,
            }}
          >
            {/* 바닥에 메뉴 */}
            <Menu alignment={alignment} setAlignment={setAlignment} />
          </div>
        </div>
      ) : (
        <>
          {/* 창문 상태 설정화면 */}
          <Setting
            setLoading={setLoading}
            setState={setState}
            state={state}
            settingTime={settingTime}
            setSettingTime={setSettingTime}
            khaiGrade={khaiGrade}
            rainType={rainType}
            tempKo={tempKo}
            keys={keys}
            setKeys={setKeys}
            aa={aa}
          />
          <div
            style={{
              position: "fixed",
              width: "100%",
              bottom: 0,
              zIndex: "200",
            }}
          >
            <Menu alignment={alignment} setAlignment={setAlignment} />
          </div>
        </>
      )}{" "}
    </div>
  );
}

// PTY 강수형태 코드값
// REH 습도 %
// RN1 1시간 강수량 mm
// T1H 기온 ℃
// UUU 동서바람성분 m/s
// VEC 풍향 deg
// VVV  남북바람성분 m/s
// WSD 풍속 m/s
