import "@/styles/index.scss";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { theme } from "../styles/muiTheme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
