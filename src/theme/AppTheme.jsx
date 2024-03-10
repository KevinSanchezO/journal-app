import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import { purpleTheme } from "./";

// For the use of themes in MUI is better to make a higher order component so it
// recives children, the app, and access the themes easily

/* A theme must be provided in ThemeProvider*/

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
        <CssBaseline/>
        {children}
    </ThemeProvider>
  )
}

