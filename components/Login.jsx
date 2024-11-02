import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import TitleWrap from "./TitleWrap";

const Login = () => {
  const ID = useState("12345");
  const PW = useState("12345");
  const [inputID, setId] = useState("");
  const [inputPW, setPw] = useState("");
  const [visible, getVisible] = useState(false);

  const navigate = useNavigate();

  const id_Get = (e) => {
    setId(e.target.value);
  };
  const pw_Get = (e) => {
    setPw(e.target.value);
  };

  const clickBtn = () => {
    if (ID === inputID && PW === inputPW) {
      getVisible(false);
      navigate("/Main"); // '/timer' 경로로 이동
    } else {
      getVisible(true);
    }
  };

  return (
    <div className="page">
      <TitleWrap />
      <div className="contentWrap">
        {/* inputID | 아이디*/}
        <div className="inputID">아이디</div>
        {/* inputWrap */}
        <div className="inputWrap">
          <input
            className="input"
            placeholder="testID"
            value={inputID}
            onChange={id_Get}
          />
        </div>
        {/* 오류 메세지 출력 visible : false */}
        {visible && <ErrorMessage />}
        {/* inputId | 비번 */}
        <div style={{ marginTop: "26px" }} className="inputID">
          비번
        </div>
        {/* inputWrap */}
        <div className="inputWrap">
          <input
            className="input"
            placeholder="testPW"
            type="password"
            value={inputPW}
            onChange={pw_Get}
          />
        </div>
        {/* 오류 메세지 출력 visible : false */}
        {visible && <ErrorMessage />}
      </div>
      <div>
        <button className="btn" onClick={clickBtn}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Login;
