import Switch from "@mui/material/Switch";
import React, { useState } from "react";
import useLongPress from "./useLongPress";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { ref, update } from "firebase/database";
import { db } from "../firebase";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
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

export default function VentilationItems({
  i,
  state,
  times,
  stateArray,
  changeSwitch,
  Array,
  delItem,
  setArray,
  keys,
  index,
}) {
  const onLongPress = () => {
    handledelOpen();
  };

  const onClick = (event) => {
    handleOpen();
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  //모달창
  const [open, setOpen] = useState(false);
  //모달 창 닫기
  const handleClose = () => setOpen(false);
  //모달 창 오픈
  const handleOpen = () => setOpen(true);
  //설정된 스위치 버튼 상태
  // 스위치 버튼 기능
  const onsendState = (props) => {
    if (props.target.checked === true) {
      changeSwitch(index);
      let state = false;
      for (var k = 0; k < Array.length; k++) {
        update(ref(db, `/${keys[k]}/`), {
          state,
        });
      }
      state = true;
      update(ref(db, `/${keys[index]}/`), {
        state,
      });
      var settingTime = times;
      update(ref(db, "/"), {
        settingTime,
      });
    } else {
      changeSwitch(null);
      let state = false;
      update(ref(db, `/${keys[index]}/`), {
        state,
      });
      settingTime = "null";
      update(ref(db, "/"), {
        settingTime,
      });
    }
  };
  const [pTime, setPTime] = useState(times);
  const [reTime, setReTime] = useState("");

  const [delOpen, setDelOpen] = useState(false);
  const handledelOpen = () => {
    setDelOpen(true);
  };
  const handledelClose = () => {
    setDelOpen(false);
  };
  const handleDeleteItem = () => {
    delItem(i, keys[i]);
    handledelClose();
  };
  console.log(i);
  return (
    <>
      <Modal
        open={delOpen}
        onClose={handledelClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <List
            sx={{
              margin: "auto",
              width: "50%",
              maxWidth: 360,
              backgroundColor: "white",
            }}
            component="nav"
            aria-label="mailbox folders"
          >
            <ListItem button>
              <h2>{`${times.substring(0, 2)}시${times.substring(2, 4)}분`}</h2>
            </ListItem>
            <ListItem button onClick={handleDeleteItem}>
              <ListItemText primary="삭제" />
            </ListItem>
            <Divider />
            <ListItem button divider onClick={handledelClose}>
              <ListItemText primary="취소" />
            </ListItem>
          </List>
        </div>
      </Modal>
      <Box>
        <Paper
          {...longPressEvent}
          elevation={3}
          sx={{
            height: "6rem",
            marginLeft: "2rem",
            marginRight: "2rem",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "inline",
              marginRight: "15rem",
              verticalAlign: "middle",
            }}
          >
            <h3 style={{ display: "inline-block", paddingTop: "1rem" }}>
              {times.substring(0, 2) + "시" + times.substring(2, 4) + "분"}
            </h3>
          </Box>
        </Paper>
        <Switch
          checked={state}
          onChange={onsendState}
          sx={{
            zIndex: 100,
            display: "absolute",
            top: "-5rem",
            left: "30%",
            position: "relative",
            display: "inline-flex",
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Box>
      {/* 모달창 */}
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              환기시간 설정
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticTimePicker
                defaultValue={dayjs(
                  `2023-05-27T${times.substring(0, 2)}:${times.substring(2, 4)}`
                )}
                minutesStep={5}
                displayStaticWrapperAs="mobile"
                componentsProps={{
                  actionBar: { actions: [] },
                }}
                onChange={(newValue) => {
                  setPTime(newValue);
                  setReTime(newValue);
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
                  if (reTime !== "") {
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
                    var time = hour.toString() + min.toString();
                  } else {
                    time = pTime;
                  }

                  update(ref(db, "/" + keys[i]), {
                    time,
                  });
                  let modiArray = [...Array];
                  modiArray[i].time = time;
                  setArray(modiArray);
                  let settingTime = time;
                  if (modiArray[i].state === true) {
                    update(ref(db, "/"), {
                      settingTime,
                    });
                  }
                  handleClose();
                }}
                size="large"
              >
                저장
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    </>
  );
}
