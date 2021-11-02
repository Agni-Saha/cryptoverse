import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

export default function Cryptocurrencies({ simplified }) {

    let count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // setCryptos(cryptosList?.data?.coins);
        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));
        setCryptos(filteredData)
    }, [cryptosList, searchTerm])


    if (isFetching) return <Loader />

    return (
        <>
            {!simplified && (
                <div className="search_crypto">
                    <Input
                        placeholder="Search Cryptocurrency"
                        onChange={(event) => setSearchTerm(event.target.value.toLowerCase())}
                    />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto_card_container">
                {
                    cryptos?.map((currency) => (
                        <Col xs={24} sm={12} lg={6} className="crypto_card" key={currency.id}>
                            <Link key={currency.id} to={`/crypto/${currency.id}`}>
                                <Card title={`${currency.rank}. ${currency.name}`}
                                    extra={<img className="crypto_image" src={currency.iconUrl} alt="crypto_image" />}
                                    hoverable
                                >
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>Market Cap: {millify(currency.marketCap)}</p>
                                    <p>Daily Change: {millify(currency.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}
