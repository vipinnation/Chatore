"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#645caa",
  //     },

  //   },
  palette: {
    primary: {
      main: "#645caa",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    
  },
});

export default theme;
