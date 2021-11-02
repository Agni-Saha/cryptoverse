import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'

import icon from "../images/default.png"

export default function Navbar() {

    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false)
        }
        else {
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <div className="nav_container">
            <div className="logo_container">
                <Avatar src={icon} style={{width: "4rem", height: "4rem"}} />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Cryptoverse</Link>
                </Typography.Title>
                <Button className="menu_control_container"
                    onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {
                activeMenu && (
                    <Menu theme="dark" 
                        className="navbar_link_container">
                        <Menu.Item icon={<HomeOutlined style={{ fontSize: '24px' }} />}>
                            <Link to="/" className="navbar_link">
                                Home
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<FundOutlined style={{ fontSize: '24px' }} />}>
                            <Link to="/cryptocurrencies" className="navbar_link">
                                Cryptocurrencies
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<MoneyCollectOutlined style={{ fontSize: '24px' }} />}>
                            <Link to="/exchanges" className="navbar_link">
                                Exchanges
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<BulbOutlined style={{ fontSize: '24px' }} />}>
                            <Link to="/news" className="navbar_link">
                                News
                            </Link>
                        </Menu.Item>
                    </Menu>
                )
            }
        </div>
    )
}
