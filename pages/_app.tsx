import '../styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MQTTProvider } from '../context/mqtt';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src='https://cdn.tailwindcss.com' async></script>
      </Head>
      <MQTTProvider>
        <Component {...pageProps} />
      </MQTTProvider>
    </>
  );
}

export default MyApp;
