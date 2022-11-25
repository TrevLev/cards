import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";

import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({ ...awsExports, ssr: true });

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
