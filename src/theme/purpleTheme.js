import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

/* Theme for the theme provider */

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#262254'
        },
        seccondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    }
})