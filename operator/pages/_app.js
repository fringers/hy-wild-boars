import React, {useEffect, useState} from "react";
import Head from "next/head";
import 'leaflet/dist/leaflet.css'
import '../styles/globals.scss'
import {onAuthStateChanged} from "../firebase/auth";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(setUser), [])

  return (
    <>
      <Head>
        <title>Zarządzanie zgłoszeniami dzików</title>
      </Head>
      <Component {...pageProps} user={user}/>
    </>
  )
}

export default MyApp
