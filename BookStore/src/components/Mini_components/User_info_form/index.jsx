import { Button, DatePicker, notification, Form, Input } from 'antd';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { DataContexts } from '../../../AppContexts/Contexts';
import { toast } from 'react-toastify';
function UserInfoForm() {
    const {fetchUserInfo} = useContext(DataContexts)
    const [form] = Form.useForm();
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('id'); // Lấy id từ localStorage

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost/be-shopbangiay/api/user.php?userId=${userId}`);
            const data = await response.json();

            // Cập nhật form với dữ liệu từ API
            form.setFieldsValue({
                name: data.name,
                sdt: data.phone,
                email: data.email,
                birthday: data.birthday ? moment(data.birthday, 'DD/MM/YYYY') : null
            });

            setUserData(data);

        } catch (error) {
            console.error('Error fetching user data:', error);

        }
    };

    const onFinish = async (values) => {

        const formData = new FormData;
        formData.append('userId', userId)
        formData.append('name', values.name)
        formData.append('phone', values.sdt)
        formData.append('email', values.email)
        formData.append('birthday', values.birthday ? values.birthday.format('DD/MM/YYYY') : "")
        formData.append('avatar', userData?.avatar || '')
        formData.append('role', userData?.role || '')
        formData.append('address', userData?.address || '')


        console.log('Dữ liệu gửi đi:', formData);

        try {
            const response = await fetch('http://localhost/be-shopbangiay/api/user.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });


            if (response.success == false) {
                toast.error('Cập nhật thông tin thất bại', {
                          position: "top-right",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: false,
                          progress: undefined,
                          theme: "light",
                        });
            } else {
                const updatedData = await response.json();
                setUserData(updatedData);
                toast.success('Cập nhật thông tin thành công', {
                          position: "top-right",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: false,
                          progress: undefined,
                          theme: "light",
                        });
                fetchUserInfo(userId)
            }

        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            toast.error('Cập nhật dữ liệu thất bại', {
                      position: "top-right",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: "light",
                    });
        }

    };
    return (
        <Form
            form={form}
            labelAlign='left'
            labelCol={{
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 6 }
            }}
            wrapperCol={{
                xs: { span: 24 },
                sm: { span: 16 },
                md: { span: 14 }
            }}
            style={{
                width: '100%',
                maxWidth: '800px',
                margin: 'auto',
                padding: '20px 0'
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label={<span style={{ fontSize: '22px', fontWeight: '600' }}>Họ và tên</span>}
                name="name"
                rules={[
                    {
                        type: 'string',
                        message: 'Vui lòng nhập tên hợp lệ',
                    },
                ]}
            >
                <Input
                    placeholder='Họ và tên'
                    style={{
                        height: '45px',
                        fontSize: '18px',
                        borderRadius: '8px',
                        padding: '8px 16px'
                    }}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: '22px', fontWeight: '600' }}>Số điện thoại</span>}
                name="sdt"
                rules={[
                    {
                        type: 'string',
                        message: 'Vui lòng nhập số điện thoại hợp lệ',
                    },
                ]}
            >
                <Input
                    placeholder='Số điện thoại'
                    style={{
                        height: '45px',
                        fontSize: '18px',
                        borderRadius: '8px',
                        padding: '8px 16px'
                    }}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: '22px', fontWeight: '600' }}>Email</span>}
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'Vui lòng nhập Email hợp lệ',
                    },
                ]}
            >
                <Input
                    placeholder='Email'
                    style={{
                        height: '45px',
                        fontSize: '18px',
                        borderRadius: '8px',
                        padding: '8px 16px'
                    }}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: '22px', fontWeight: '600' }}>Ngày sinh</span>}
                name="birthday"
                rules={[
                    {
                        type: 'date',
                        message: 'Vui lòng nhập ngày sinh hợp lệ',
                    },
                ]}
            >
                <DatePicker
                    placeholder='dd/mm/yyyy'
                    format={'DD/MM/YYYY'}
                    style={{
                        height: '45px',
                        fontSize: '18px',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        width: '100%'
                    }}

                />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    xs: { offset: 0, span: 24 },
                    sm: { offset: 8, span: 16 },
                    md: { offset: 6, span: 14 }
                }}
                style={{ marginTop: '32px' }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        height: '50px',
                        fontSize: '20px',
                        fontWeight: '600',
                        padding: '0 32px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    Cập nhật thông tin
                </Button>
            </Form.Item>
        </Form>
    );
}

export default UserInfoForm;