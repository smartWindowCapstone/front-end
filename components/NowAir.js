import React from "react";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));
export default function NowAir({ pm25, pm10 }) {
  return (
    <>
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">초미세먼지</Typography>
          <Typography variant="h6">{pm25}㎍/m³</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid item xs>
          <Typography variant="h6">
            미세먼지
            <div>{pm10}㎍/m³</div>{" "}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
