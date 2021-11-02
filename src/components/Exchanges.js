import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    if (isFetching) return <Loader />

    return (
        <>
            <Row style={{ margin: "1.5rem 0.5rem 2rem 0.5rem" }}>
                <Col className="exchange_heading" span={6}>
                    Exchanges
                </Col>
                <Col className="exchange_heading" span={6}>
                    24h Trade Volume
                </Col>
                <Col className="exchange_heading" span={6}>
                    Markets
                </Col>
                <Col className="exchange_heading" span={6}>
                    Change
                </Col>
            </Row>
            <Row>
                {exchangesList?.map((exchange, index) => (
                    <Col span={24} key={index}>
                        <Collapse key={index}>
                            <Panel key={index}
                                showArrow={false}
                                header={(
                                    <Row>
                                        <Col span={6}>
                                            <Text>
                                                <strong>
                                                    {exchange.rank}.
                                                </strong>
                                            </Text>
                                            <Avatar className="exchange_image" src={exchange.iconUrl} />
                                            <Text>
                                                <strong>
                                                    {exchange.name}
                                                </strong>
                                            </Text>
                                        </Col>
                                        <Col span={6}>
                                            ${millify(exchange.volume)}
                                        </Col>
                                        <Col span={6}>
                                            {millify(exchange.numberOfMarkets)}
                                        </Col>
                                        <Col span={6}>
                                            {millify(exchange.marketShare)}%
                                        </Col>
                                    </Row>
                                )}
                            >
                                {HTMLReactParser(exchange.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Exchanges;
