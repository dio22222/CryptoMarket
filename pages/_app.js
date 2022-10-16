import '../styles/global.scss'
import Head from 'next/head'
import Layout from '../components/Layout'
import { useEffect } from "react";

export default function App({ Component, pageProps }) {

    // Bootstrap JS
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
      }, []);

    return (
        <Layout>
            <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    )
}