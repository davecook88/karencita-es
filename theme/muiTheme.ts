import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { amber, orange } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: { main: orange[600] },
    secondary: amber,
  },
  typography: { fontFamily: ["Nunito", "Montserrat"].join(",") },
});

export default theme;
