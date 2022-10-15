import Image from 'next/image'


export async function getServerSideProps(context) {

    const coin_id = context.params.id
    let results

    try {
        
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin_id}`)
        const data = await response.json()

        // Destructuring deeply nested Objects
        // All Prices are fixed to USD currency
        const { name,
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
        <h1>Coin Details</h1>
        <div className='container'>
            { results &&
                <div className='details'>
                    { results.name },
                    <Image
                        src={ results.image_url }
                        width={144}
                        height={144}
                        alt={`${results.name} logo`}
                    />
                    { results.description },
                    { results.current_price },
                    { results.price_change_percentage_24h },
                    { results.price_change_percentage_7d },
                    { results.price_change_percentage_14d },
                    { results.price_change_percentage_30d },
                    { results.price_change_percentage_60d },
                    { results.price_change_percentage_200d },
                    { results.price_change_percentage_1y },
                    { results.high_24h },
                    { results.low_24h },
                </div>
            }
        </div>
        </>
    )

}