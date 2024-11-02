import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Img from "./Img";
const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",

  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

export default function Weather({ temp, tempKo, wet, khaiGrade, rainType }) {
  console.log("rainType", rainType);
  return (
    <Box sx={{ marginTop: "2rem"}}  >
      <Box>
        <div>
        <Img  rainType={rainType} />
        <Typography
          variant="h1"
          gutterBottom
          sx={{ display: "inline-block", marginTop: "4rem" ,zIndex:5,position:"relative"}}
        >
          {temp}
          <sup>
            <sup style={{ fontSize: "2.0rem" }}>℃</sup>
          </sup>
        </Typography>
        </div>
      </Box>
      {/* 날씨,습도,총대기 */}
      <Box
        sx={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          marginTop: "1.2rem",
          marginBottom: "4rem",
        }}
      >
        <Grid container>
          <Grid item xs>
            <Typography
              variant="h5"
              sx={{ marginTop: "1.2rem", marginBottom: "1.2rem" }}
            >
              {tempKo}
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
            <Typography
              variant="h5"
              sx={{ marginTop: "1.2rem", marginBottom: "1.2rem" }}
            >
              습도 {wet}%
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
            <Typography
              variant="h5"
              sx={{ marginTop: "1.2rem", marginBottom: "1.2rem" }}
            >
              공기 {khaiGrade}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
