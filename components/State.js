import React, { useEffect, useState } from "react";
import { ref, update, get } from "firebase/database";
import { db } from "../firebase";

import { Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";

import { LoadingButton } from "@mui/lab";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function State({
  setLoading,
  setState,
  state,
  khaiGrade,
  rainType,
  tempKo,
}) {
  const [waiting, setWaiting] = React.useState(false);
  const [open, setOpen] = useState(false);
  const serve = ["info", "error"];
  const [serverity, setserverity] = useState();
  const [text, setText] = useState();
  // 1초마다 받아옴
  useEffect(() => {
    const interval = setInterval(() => {
      async function getData() {
        await get(ref(db, "/state")).then((snapshot) => {
          setState(snapshot.val());
        });
      }
      getData();
    }, 1000);

    return () => clearInterval(interval);
    //  stop일때 버튼 동작 금지
  }, []);

  const imo = useState(() => {
    switch (rainType) {
      case "0":
        return "☀️";

      case "1":
        return "☔";

      case "2":
        return "☔☃️";

      case "3":
        return "☃️";

      case "5":
        return "🌂";

      case "6":
        return "🌂☃️";

      default:
        return "☃️";
    }
  });
  //open 버튼 눌렀을때
  const handleClick = () => {
    if (
      (khaiGrade.startsWith("좋음") || khaiGrade.startsWith("보통")) &&
      rainType === "0"
    ) {
      setserverity(serve[0]);
      setWaiting(true);
      setTimeout(function () {
        setWaiting(false);
      }, 5000);
      setText(`창문을 엽니다.`);
    } else {
      setserverity(serve[1]);
      setText(`미세먼지: ${khaiGrade} \n 하늘: ${tempKo}${imo} `);
      setWaiting(true);
      setTimeout(function () {
        setWaiting(false);
      }, 5000);
      setText(`창문을 엽니다.`);
    }
    setOpen(true);
    onOpen();
  };
  const handleClick2 = () => {
    setserverity(serve[0]);
    setWaiting(true);
    setTimeout(function () {
      setWaiting(false);
    }, 5000);
    setText(`창문을 닫습니다.`);

    setOpen(true);

    onClose();
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onOpen = () => {
    setState("OPEN");
    var state = "OPEN";
    update(ref(db, "/"), {
      state,
    });
  };
  const onClose = () => {
    setState("CLOSE");
    var state = "CLOSE";
    update(ref(db, "/"), {
      state,
    });
  };

  return (
    <>
      <Box sx={{ marginTop: "1rem", paddingBottom: "0.5rem" }}>
        <h1>창문상태</h1>
        <h2>{state}</h2>

        <Box
          sx={{
            width: "48%",
            display: "inline-block",
            marginRight: "0.5rem",
          }}
        >
          <LoadingButton
            loading={waiting}
            onClick={handleClick}
            fullWidth
            variant="contained"
            size="large"
            loadingIndicator="작동중..."
          >
            열기
          </LoadingButton>
        </Box>
        <Box sx={{ width: "48%", display: "inline-block" }}>
          <LoadingButton
            loading={waiting}
            onClick={handleClick2}
            fullWidth
            variant="contained"
            loadingIndicator="작동중..."
            size="large"
          >
            닫기
          </LoadingButton>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{ display: "flex", zIndex: "50", verticalAlign: "middle" }}
      >
        <Alert
          onClose={handleClose}
          severity={serverity}
          sx={{ width: "70%", marginBottom: "5rem", display: "flex" }}
        >
          <span style={{ fontSize: "1.6rem" }}> {text}</span>
        </Alert>
      </Snackbar>
    </>
  );
}
