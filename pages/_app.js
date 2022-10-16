// import '../styles/globals.css'
import '../styles/global.scss'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    )
}