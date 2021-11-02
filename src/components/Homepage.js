import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import Loader from './Loader'

const { Title } = Typography

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats

    if (isFetching) return <Loader />

    return (
        <div className="home_container">
            <Title level={2} className="heading">
                Global Crypto Stats
            </Title>
            <Row gutter={[32, 32]}>
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24th Volume" value={millify(globalStats.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <div className="home_heading_container">
                <Title level={2} className="home_title">
                    Top 10 Cryptocurrencies
                </Title>
                <Title level={2} className="show_more">
                    <Link to="/cryptocurrencies">Show More...</Link>
                </Title>
            </div>
            <Cryptocurrencies simplified={true} />
            <div className="home_heading_container">
                <Title level={2} className="home_title">
                    Latest Crypto News
                </Title>
                <Title level={2} className="show_more">
                    <Link to="/news">Show More...</Link>
                </Title>
            </div>
            <News simplified={true} />
        </div>
    )
}

export default Homepage