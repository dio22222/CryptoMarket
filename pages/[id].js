import Image from 'next/image'
import Head from 'next/head'
import JsxParser from 'react-jsx-parser'

export async function getServerSideProps(context) {

    const coin_id = context.params.id
    let results

    try {
        
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin_id}`)
        const data = await response.json()

        // Destructuring deeply nested Objects
        // All Prices are fixed to USD currency
        const { name,
                symbol,
                description: { en:description },
                image: { large:image_url },
                market_data: { current_price: { usd:current_price },
                               price_change_percentage_24h,
                               price_change_percentage_7d,
                               price_change_percentage_14d,
                               price_change_percentage_30d,
                               price_change_percentage_60d,
                               price_change_percentage_200d,
                               price_change_percentage_1y,
                               high_24h: { usd:high_24h },
                               low_24h: { usd:low_24h } }
              } = data

        results = {
            name,
            symbol,
            description,
            image_url,
            current_price,
            price_change_percentage_24h,
            price_change_percentage_7d,
            price_change_percentage_14d,
            price_change_percentage_30d,
            price_change_percentage_60d,
            price_change_percentage_200d,
            price_change_percentage_1y,
            high_24h,
            low_24h,
        }

    } catch (error) {
        results = {}
        console.log(error)
    }

    return {
        props: { results }
    }
}

export default function CoinDetails({ results }) {

    return (
        <>
        <Head>
            <title>{ results.name }</title>
        </Head>
        <div className='coin-details container col pt-5'>
            { results &&
                <>
                <div className='row bg-content p-3 rounded-4'>
                    <div className='col-md mb-4'>
                        <h1 className='mb-4'>{ results.name }&nbsp;<span className='text-muted'>{results.symbol}</span></h1>
                        <Image
                            src={ results.image_url }
                            width={144}
                            height={144}
                            alt={`${results.name} logo`}
                        />
                    </div>
                    <div className='col-md mb-4 mt-5'>
                        <h5 className='text-primary'>Current Price: { results.current_price } USD</h5>
                        <h5>Highest Price (24h): { results.high_24h } USD</h5>
                        <h5>Lowest Price (24h): { results.low_24h } USD</h5>
                    </div>
                    <div className='col-md mb-4 mt-5'>
                        <h5 className='text-primary'>Price Change Percentages:</h5>
                        <h5>24 hours: { results.price_change_percentage_24h }%</h5>
                        <h5>7 days: { results.price_change_percentage_7d }%</h5>
                        <h5>14 days: { results.price_change_percentage_14d }%</h5>
                        <h5>30 days: { results.price_change_percentage_30d }%</h5>
                        <h5>60 days: { results.price_change_percentage_60d }%</h5>
                        <h5>200 days: { results.price_change_percentage_200d }%</h5>
                        <h5>1 year: { results.price_change_percentage_1y }%</h5>
                    </div>
                </div>
                <h2 className='mb-4 mt-4'>Description</h2>
                <JsxParser
                    jsx={`<h4>${results.description}</h4>`}
                />
                </>
            }
        </div>
        </>
    )

}