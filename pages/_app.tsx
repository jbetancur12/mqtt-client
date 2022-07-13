import '../styles/globals.css'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MQTTProvider } from '../context/mqtt'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/index.scss'
import { NotificationProvider } from '../context/notificationContext'
import NotificationBar from '../components/Notification'
import { useAuth, AuthProvider, ProtectRoute } from '@context/auth';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'


type CustomPage = NextPage & {
  requiresAuth?: boolean;
  redirectUnauthenticatedTo?: string;
};

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: CustomPage;
}


function MyApp({ Component, pageProps }: CustomAppProps) {

  return (
    <>
      {Component.requiresAuth && (
        <Head>
          <script
            // If no token is found, redirect inmediately
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
            {location.replace(
              "/login?next=" +
                encodeURIComponent(location.pathname + location.search)
            )}
            else {document.documentElement.classList.add("render")}`,
            }}
          />
          <script src="https://cdn.tailwindcss.com" async></script>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.1.1/css/all.css"
            integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ"
            crossOrigin="anonymous"
          />
        </Head>
      )}
      <AuthProvider>
        <NotificationProvider>
          <MQTTProvider>
            {/* <NotificationBar /> */}
            {/* <ProtectRoute> */}
            <Component {...pageProps} />
            {/* </ProtectRoute> */}
          </MQTTProvider>
        </NotificationProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
