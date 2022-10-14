import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Call CoinGecko API on the Back-End 
export async function getServerSideProps() {

    let results
    
    try {
        // Fetch Data
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        const data = await response.json()

        // Destructuring Data to only pass relevant parameters to the Front-End
        results = data.map((coin) => ({
            name: coin.name,
            symbol: coin.symbol,
            image_url: coin.image,
            current_price: coin.current_price,
            high_24h: coin.high_24h,
            low_24h: coin.low_24h,
            price_change_24h: coin.price_change_24h
        }))

        console.log(results)

    } catch (error) {
        // If there were any Errors, return an empty Object
        results = {}
        console.log(error)
    }

    return {
        props: { "data": { results } } 
    }

}

export default function Home() {
  return (
    <>
      <Head>
        <title>Crypto Market</title>
        <meta name="description" content="A Lightweight Next.js Application for staying up to date with the Cryptocurrency Market" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <h1>Welcome, to Crypto Market</h1>
      </main>

      <footer>

      </footer>
    </>
  )
}