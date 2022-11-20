import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure({ ...awsconfig, ssr: true });

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
