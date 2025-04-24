import { Layout } from 'antd'
import PaymentInfoForm from '../../Mini_components/Payment_info_form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronRight, } from '@fortawesome/free-solid-svg-icons';


function ContentPayment() {

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
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>Thanh toán</span>
                </div>

                <div className='content_payment_main' style={{ padding: '20px' }} >
                    <div className="user__info" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid black' }}>
                        <div className='user__info__label' style={{ fontSize: '30px', fontWeight: '700', margin: '20px', textAlign: 'center' }}>
                            Thông tin thanh toán
                        </div>

                        <div className='user__info__form'>
                            <PaymentInfoForm />
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default ContentPayment;