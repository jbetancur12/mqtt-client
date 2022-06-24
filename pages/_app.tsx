import '../styles/globals.css'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MQTTProvider } from '../context/mqtt'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/index.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com" async></script>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.1.1/css/all.css"
          integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ"
          crossOrigin="anonymous"
        />
      </Head>
      <MQTTProvider>
        <Component {...pageProps} />
      </MQTTProvider>
    </>
  )
}

export default MyApp
