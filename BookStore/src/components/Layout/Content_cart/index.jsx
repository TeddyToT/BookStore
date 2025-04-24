import { Layout } from 'antd'
import CartInfoList from '../../Mini_components/Cart_info_list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronRight, } from '@fortawesome/free-solid-svg-icons';

function ContentCart() {

    const { Content } = Layout;

    return (
        <Content>
            <div className='content__container'>
                <div className="content__user__head" style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                    <div className='content__user__head-home'>
                        <FontAwesomeIcon icon={faHouse} style={{ fontSize: '26px', margin: '20px ' }} />
                        <a href='/' style={{ fontSize: '20px', fontWeight: '700' }}>Trang chủ</a>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '20px', margin: '20px' }} />
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>Giỏ hàng</span>
                </div>

                <div className="content__cart__main" style={{ padding: '20px' }}>
                    <div className="cart__info" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid black' }}>
                        <CartInfoList />
                    </div>

                </div>
            </div>
        </Content>
    );
}

export default ContentCart;