import { useState } from "react";
import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import { db } from "../firebase";
import { ref, set, update } from "firebase/database";
import VentilationItems from "./VentilationItems";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  textAlign: "center",
};

export default function SetTime({ Array, setArray, keys, setKeys, aa }) {
  console.log(Array);

  //스위치 하나만 켜기
  const changeSwitch = (value) => {
    let newArray = [...Array];
    for (var i = 0; i < Array.length; i++) {
      newArray[i].state = false;
    }
    if (value === null) {
    } else {
      newArray[value].state = true;
    }
    setArray(newArray);
  };

  console.log("Array", Array);
  //모달창
  const [open, setOpen] = useState(false);
  //모달 창 닫기
  const handleClose = () => setOpen(false);
  //모달 창 오픈
  const handleOpen = () => setOpen(true);
  const [pTime, setPTime] = useState();
  //item 삭제
  const delItem = (i, k) => {
    let updateArray = Array.filter((_, index) => {
      return Array[index].index !== i;
    });
    setArray(updateArray);

    let updatekeys = keys.filter((_, index) => {
      return index !== i;
    });
    setKeys(updatekeys);
    var time = null;
    var state = null;
    update(ref(db, "/" + k), {
      time,
      state,
    });
  };
  console.log("keys", keys);
  return (
    <div className="App">
      <>
        <h1>환기 시간</h1>
        {Array.map((value, i) => {
          return (
            <VentilationItems
              i={value.index}
              state={value.state}
              times={value.time}
              changeSwitch={changeSwitch}
              Array={Array}
              setArray={setArray}
              keys={keys}
              setKeys={setKeys}
              key={i}
              delItem={delItem}
              index={i}
            />
          );
        })}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            right: "2rem",
            bottom: "6rem",
          }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>

        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  환기시간 설정
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticTimePicker
                    minutesStep={5}
                    displayStaticWrapperAs="mobile"
                    componentsProps={{
                      actionBar: { actions: [] },
                    }}
                    onChange={(newValue) => {
                      setPTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <Box
                  sx={{
                    float: "right",
                    marginRight: "-2rem",
                    marginBottom: "-2.5rem",
                  }}
                >
                  <Button
                    onClick={handleClose}
                    size="large"
                    sx={{ marginRight: "0.5rem" }}
                  >
                    취소
                  </Button>

                  <Button
                    onClick={() => {
                      let hour;
                      let min;
                      if (pTime.$H < 10) {
                        hour = "0" + pTime.$H;
                      } else {
                        hour = pTime.$H;
                      }
                      if (pTime.$m < 10) {
                        min = "0" + pTime.$m;
                      } else {
                        min = pTime.$m;
                      }
                      let time = hour.toString() + min.toString();
                      let state = false;
                      let id = 2;
                      if (Array.length >= 1) {
                        id = 2 + keys[keys.length - 1].substring(11);
                      }

                      set(ref(db, "/settingTime" + id), {
                        time,
                        state,
                      });

                      var keys2 = [...keys];
                      keys2.push("settingTime" + id);
                      setKeys(keys2);
                      var Array2 = [...Array];
                      Array2.push({
                        state: false,
                        time: time,
                        index: aa.current,
                      });
                      aa.current += 1;
                      console.log("Array2", Array2);
                      setArray(Array2);
                      handleClose();
                    }}
                    size="large"
                  >
                    저장
                  </Button>
                </Box>
              </Box>
            </>
          </Modal>
        </>
      </>
    </div>
  );
}
