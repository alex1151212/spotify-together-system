import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1ed760",
    },
    secondary: {
      main: "#000000",
    },
    text: {
      primary: "#fefefe",
      secondary: "#000000",
    },
  },
  components: {},
});
