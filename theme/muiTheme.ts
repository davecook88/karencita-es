import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { amber, orange } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: orange,
  },
});

export default theme;
