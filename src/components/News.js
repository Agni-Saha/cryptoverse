import React, { useState } from 'react'
import { Typography, Select, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Text, Title } = Typography
const { Option } = Select

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

export default function News({ simplified }) {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 12
    })

    if (!cryptoNews?.value) return <Loader />

    return (
        <Row gutter={[24, 24]}>
            {
                !simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select_news"
                            placeholder="Select a Crypto"
                            optionFilterProp="children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Cryptocurency">Cryptocurrency</Option>
                            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
                        </Select>
                    </Col>
                )
            }
            {
                cryptoNews.value.map((news, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                        <Card
                            hoverable
                            className="news_card"
                            key={index}
                        >
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news_image_container">
                                    <Title className="news_title" level={4}>
                                        {news.name}
                                    </Title>
                                    <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news_image"
                                        style={{maxWidth: "200px", maxHeight: "100px"}}
                                    />
                                </div>
                                <p>
                                    {
                                        news.description > 100
                                            ? `${news.description.substring(0, 100)}...`
                                            : news.description
                                    }
                                </p>
                                <div className="provider_container">
                                    <div className="">
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                                        <Text className="provide_name">
                                            {news.provider[0]?.name}
                                        </Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}
