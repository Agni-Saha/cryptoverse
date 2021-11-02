import React from 'react'
import { Line } from 'react-chartjs-2'
import { Row, Col, Typography } from 'antd'

const { Title } = Typography

export default function LineChart({ coinHistory, currentPrice, coinName }) {

    const coinPrice = []
    const coinTimeStamp = []

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd"
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <>
            <Row className="chart_header">
                <Title level={2} className="chart_title" >
                    {coinName} Price Chart
                </Title>
                <Col className="price_container">
                    <Title level={5} className="price_change" >
                        {coinHistory?.data?.change}
                    </Title>
                    <Title level={5} className="current_price" >
                        Current {coinName} Price: $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}
