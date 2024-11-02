import { Paper } from "@mui/material";
import React from "react";
import SetTime from "./SetTime";
import State from "./State";

export default function Setting({
  setLoading,
  setState,
  state,
  settingTime,
  setSettingTime,
  khaiGrade,
  rainType,
  tempKo,
  keys,
  setKeys,
  aa,
  rerender,
  setrerender,
}) {
  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          marginLeft: "1rem",
          marginTop: "0.5rem",
          marginRight: "1rem",
          paddingTop: "0.5rem",
        }}
      >
        {/* 창문 */}
        <State
          setLoading={setLoading}
          setState={setState}
          state={state}
          khaiGrade={khaiGrade}
          rainType={rainType}
          tempKo={tempKo}
        />
      </Paper>
      <Paper
        elevation={3}
        sx={{
          marginLeft: "1rem",
          marginTop: "0.5rem",
          marginRight: "1rem",
          paddingTop: "0.5rem",
          marginBottom: "8rem",
          paddingBottom: "1rem",
        }}
      >
        {/* 개방시간 설정 */}
        <SetTime
          aa={aa}
          Array={settingTime}
          setArray={setSettingTime}
          keys={keys}
          setKeys={setKeys}
          setLoading={setLoading}
        />
      </Paper>
    </div>
  );
}
