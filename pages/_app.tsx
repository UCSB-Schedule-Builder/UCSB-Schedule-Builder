import "@progress/kendo-theme-default/dist/all.css";
import "../shared/styles/globals.css";
import "../shared/styles/subject-dropdown.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
