import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, ShoppingCartOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';

function UserOptionMenu() {
    
    const navigate = useNavigate();
    const location = useLocation();


    const getSelectedKey = () => {
        switch (location.pathname) {
            case '/tai-khoan':
                return '1';
            case '/tai-khoan/theo-doi-don-hang':
                return '2';
            case '/tai-khoan/lich-su-don-hang':
                return '3';
            case '/':
                return '4';
            default:
                return '1';
        }
    };

    const handleMenuClick = (key) => {
        switch (key) {
            case '1':
                navigate('/tai-khoan'); // Chuyển đến trang thông tin tài khoản
                break;
            case '2':
                navigate('/tai-khoan/theo-doi-don-hang'); // Chuyển đến trang theo dõi đơn hàng
                break;
            case '3':
                navigate('/tai-khoan/lich-su-don-hang'); // Chuyển đến trang lịch sử đơn hàng
                break;
            case '4':
                navigate('/'); // Chuyển đến trang đăng xuất
                break;
            default:
                break;
        }
    };

    return (
        <Menu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            style={{
                width: '100%',
                fontSize: 'clamp(18px, 2vw, 22px)', // Tăng font size
                fontWeight: '600',
                textAlign: 'left',
                borderRadius: 12,
                padding: '0 20px', // Tăng padding
                overflow: 'hidden',
            }}
            onClick={({ key }) => handleMenuClick(key)} // Gọi hàm handleMenuClick khi chọn item
        >
            <Menu.Item key="1"
                icon={<UserOutlined style={{
                    fontSize: 'clamp(22px, 2.5vw, 26px)', // Tăng icon size
                    marginRight: '16px' // Tăng khoảng cách icon
                }} />}
                style={{
                    margin: '12px 0', // Tăng margin
                    padding: '16px 20px', // Tăng padding
                    height: 'auto',
                    borderRadius: '8px', // Thêm border radius cho menu item
                }}
            >
                Thông tin tài khoản
            </Menu.Item>
            <Menu.Item key="2"
                icon={<ShoppingCartOutlined style={{
                    fontSize: 'clamp(22px, 2.5vw, 26px)',
                    marginRight: '16px'
                }} />}
                style={{
                    margin: '12px 0',
                    padding: '16px 20px',
                    height: 'auto',
                    borderRadius: '8px',
                }}
            >
                Theo dõi đơn hàng
            </Menu.Item>
            <Menu.Item key="3"
                icon={<HistoryOutlined style={{
                    fontSize: 'clamp(22px, 2.5vw, 26px)',
                    marginRight: '16px'
                }} />}
                style={{
                    margin: '12px 0',
                    padding: '16px 20px',
                    height: 'auto',
                    borderRadius: '8px',
                }}
            >
                Lịch sử mua hàng
            </Menu.Item>
            <Menu.Item key="4"
                icon={<LogoutOutlined style={{
                    fontSize: 'clamp(22px, 2.5vw, 26px)',
                    marginRight: '16px'
                }} />}
                style={{
                    margin: '12px 0',
                    padding: '16px 20px',
                    height: 'auto',
                    borderRadius: '8px',
                }}
                onClick={() => {
                    localStorage.clear();
                    navigate("/dang-nhap")
                }}
            >
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
}

export default UserOptionMenu;