import { Layout } from 'antd'
import UserInfoForm from '../../Mini_components/User_info_form';
import UserOptionMenu from '../../Mini_components/User_option_menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronRight, faCircleUser } from '@fortawesome/free-solid-svg-icons';

function ContentAccount() {


    const { Content } = Layout;

    return (
        <Content style={{
            padding: '0 16px',
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%'
        }}>
            <div className='content__container'>
                <div className="content__user__head" style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                    <div className='content__user__head-home'
                        style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#1677ff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                    >
                        <FontAwesomeIcon icon={faHouse} style={{ fontSize: '26px', margin: '20px' }} />
                        <a href='/'
                            style={{ fontSize: '20px', fontWeight: '700', }}
                        >
                            Trang chủ</a>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '20px', margin: '20px' }} />
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>Thông tin tài khoản</span>
                </div>

                <div className="content__user__main" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    padding: 'clamp(24px, 3vw, 32px)',
                    maxWidth: '1440px',
                    margin: '0 auto',
                    flexWrap: 'wrap',
                }}>
                    <div className="user__aside" style={{
                        backgroundColor: '#fff',
                        padding: 'clamp(24px, 3vw, 36px)',
                        borderRadius: '12px',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        width: '100%',
                        maxWidth: '450px',
                        maxHeight: '600px',
                    }}>
                        <div className='user__avatar' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '80px', display: 'flex' }} />
                        </div>

                        <div className='user__account__opt'>
                            <UserOptionMenu />
                        </div>
                    </div>

                    <div className="user__info" style={{
                        backgroundColor: '#fff',
                        padding: 'clamp(24px, 3vw, 36px)',
                        borderRadius: '12px',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        width: '100%',
                        maxWidth: '700px',
                    }}>
                        <div className='user__info__label' style={{ fontSize: '30px', fontWeight: '700', margin: '20px', textAlign: 'center' }}>
                            Thông tin tài khoản
                        </div>

                        <div className='user__info__form'>
                            <UserInfoForm />
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default ContentAccount;