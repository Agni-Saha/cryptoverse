import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => (
    <div className="loader">
        <Spin
            tip="Loading..."
            style={{ color: "#ef233c", fontSize: "1.5rem" }}
            indicator={<LoadingOutlined style={{ fontSize: "4rem", color: "#ef233c", marginBottom: "0.75rem" }} spin />}
        />
    </div>
);

export default Loader;