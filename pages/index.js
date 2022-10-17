import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// Call CoinGecko API on the Back-End 
export async function getServerSideProps({ query }) {

    let results
    let page = query.page == undefined ? 1 : Number(query.page)

    // console.log(page)
    
    try {
        // Fetch Data
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`)
        const data = await response.json()

        // Destructuring Data to only pass relevant parameters to the Front-End
        results = data.map((coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            image_url: coin.image,
            current_price: coin.current_price,
            high_24h: coin.high_24h,
            low_24h: coin.low_24h,
            price_change_percentage_24h: coin.price_change_percentage_24h
        }))

    } catch (error) {
        // If there were any Errors, return an empty Object
        results = {}
    }

    return {
        props: { results, page }
    }

}

export default function Home({ results, page }) {
    console.log(page)
  return (
    <>
      <Head>
        <title>Crypto Market</title>
        <meta name="description" content="A Lightweight Next.js Application for staying up to date with the Cryptocurrency Market" />
      </Head>

        <h1 className='text-center'>Welcome, to Crypto Market</h1>
        <h2 className='text-center'>Coin Markets</h2>

        <div className='container col pt-4 pb-5'>
            { results && 
                results.map((coin, index) => (
                    <Link href={`/${coin.id}`} key={coin.id}>
                        <div className={`coin row justify-content-start bg-content mb-2 p-2 ${index == 0 ? 'rounded-top':''} ${index == results.length - 1 ? 'rounded-bottom':''}`}>
                            <div className='col-lg-2'>
                                <h4>{coin.name} &nbsp;<span className='text-muted'>{coin.symbol}</span></h4>
                                <Image
                                    src={coin.image_url}
                                    width={100}
                                    height={100}
                                    alt={`${coin.name} logo`}
                                    className='p-1'
                                />
                            </div>
                            
                            <div className='col-lg-6'>
                                <h5 className='text-primary'>Current Price: {coin.current_price} USD</h5>
                                <h5>Highest Price (24h): {coin.high_24h} USD</h5>
                                <h5>Lowest Price (24h): {coin.low_24h} USD</h5>
                                <h5>Price Change Percentage (24h): {coin.price_change_percentage_24h}%</h5>
                            </div>
                        </div>
                    </Link>
            ))}
            <div className='pagination d-flex justify-content-center'>
                <Link  href={`/?page=${ page > 1 ? page - 1 : 1 }`}>
                    <a className={` mt-3 mb-3 justify-self-center ${ page <= 1 ? 'disabled text-muted' : '' }`}>
                        <span aria-hidden="true">&laquo;</span>
                        Previous Page
                    </a>
                </Link>
                <Link href={`/?page=${ page + 1 }`}>
                    <a className='m-3 justify-self-center'>
                        Next Page
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </Link>
            </div>
        </div>
    </>
  )
}