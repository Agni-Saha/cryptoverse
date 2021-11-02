import React from 'react'
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Exchanges from './components/Exchanges';
import Cryptocurrencies from './components/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails';
import News from './components/News'

function App() {
    console.log(process.env.REACT_APP_CRYPTO_API_URL)
    return (
        <div className="App">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Switch>
                            <Route exact path="/">
                                <Homepage />
                            </Route>
                            <Route exact path="/exchanges">
                                <Exchanges />
                            </Route>
                            <Route exact path="/cryptocurrencies">
                                <Cryptocurrencies />
                            </Route>
                            <Route exact path="/crypto/:coinId">
                                <CryptoDetails />
                            </Route>
                            <Route exact path="/news">
                                <News />
                            </Route>
                        </Switch>
                    </div>
                </Layout>
                <div className="footer">
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        <Link to="/" className="footer_header_link">
                            CryptoVerse Inc.
                        </Link>
                        All rights reserved<br />
                        Created by <a href="https://agni-pfolio.vercel.app/"
                            className="portfolio_link" target="_blank"
                            rel="noreferrer">Agni Saha</a>
                    </Typography.Title>
                    <Space >
                        <Link to="/" className="footer_link">Home</Link>
                        <Link to="/exchanges" className="footer_link">Exchanges</Link>
                        <Link to="/cryptocurrencies" className="footer_link">Cryptocurrencies</Link>
                        <Link to="/news" className="footer_link">News</Link>
                    </Space>
                </div>
            </div>
        </div>
    );
}

export default App;
