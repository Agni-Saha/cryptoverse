import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Row, Col, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'

import LineChart from './LineChart'
import Loader from './Loader'

const { Title, Text } = Typography
const { Option } = Select

export default function CryptoDetails() {
    const { coinId } = useParams()
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    const cryptoDetails = data?.data?.coin


    if (isFetching) return <Loader />

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ]

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ]


    return (
        <Col className="coin_detail_container">
            <Col className="coin_heading_container">
                <Title level={2} className="coin_name">
                    {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
                </Title>
                <p>
                    {cryptoDetails.name} live price in US Dollars (USD).
                    View value statistics, market cap and supply.
                </p>
            </Col>
            <Select
                defaultValue="7d"
                className="select_timeperiod"
                placeholder="Select Timeperiod"
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>

            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />

            <Col className="stats_container">
                <Col className="coin_value_statistics">
                    <Col className="coin_value_statistics_heading">
                        <Title level={3} className="coin_details_heading">
                            {cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the statistics
                            of {cryptoDetails.name}, such as the
                            base and quote currency, the rank, and
                            trading volume.
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }, index) => (
                        <Col className="coin_stats" key={index}>
                            <Col className="coin_stats_name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className="other_stats_info">
                    <Col className="coin_value_statistics_heading">
                        <Title level={3} className="coin_details_heading">
                            Other Stats
                        </Title>
                        <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }, index) => (
                        <Col className="coin_stats" key={index}>
                            <Col className="coin_stats_name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="coin_desc_link">
                <Row className="coin_desc">
                    <Title level={3} className="coin_details_heading">
                        What is {cryptoDetails.name}?
                    </Title>
                    {HTMLReactParser(cryptoDetails.description)}
                </Row>
                <Col className="coin_links">
                    <Title level={3} className="coin_details_heading">
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links?.map((link, index) => (
                        <Row className="coin_link" key={index}>
                            <Title level={5} className="link_name">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreferrer">
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}
