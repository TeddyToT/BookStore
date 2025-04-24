import { Tabs } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(null);

    const navLink = ['/', '/san-pham', '/gioi-thieu', '/lien-he'];

    // k phải nav
    useEffect(() => {
        if (!navLink.includes(location.pathname)) {
            setActiveKey(null);
            return;
        }

        // nav
        switch (location.pathname) {
            case '/':
                setActiveKey('1');
                break;
            case '/san-pham':
                setActiveKey('2');
                break;
            case '/gioi-thieu':
                setActiveKey('5');
                break;
            case '/lien-he':
                setActiveKey('6');
                break;
            default:
                setActiveKey(null);
        }
    }, [location]);

    const items = [
        {
            key: '1',
            label: <Link to="/">Trang chủ</Link>,
        },
        {
            key: '2',
            label: <Link to="/san-pham">Sản phẩm</Link>,
        },
        {
            key: '5',
            label: <Link to="/gioi-thieu">Giới thiệu</Link>,
        },
        {
            key: '6',
            label: <Link to="/lien-he">Liên hệ</Link>,
        },
    ];

    return (
        <Tabs
            activeKey={activeKey}
            tabBarStyle={{ margin: '0' }}
            justifycontent="center"
            size="large"
            items={items}
        />
    );
};

export default Navbar;