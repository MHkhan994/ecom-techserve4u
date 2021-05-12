import React,{useState} from 'react';
import axios from 'axios';
import { Form, Input, Alert } from 'antd';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';
import Cookies from "js-cookie";
import {notificationFunc} from '../global/notification'
import Link from 'next/link'
import GoogleAuth from '../auth/GoogleAuth';


const LoginForm = () => {
  const [error, setError] = useState(null)
  const onFinish = (values) => {
    axios.post('/user/signin', values)
      .then(res => {
        if (res.status === 200) {
          Cookies.set("myshop_auth2", res.data.token);
          notificationFunc("success", "login success")
          setTimeout(() => {
            window.location.pathname = '/'
          }, 1000);

        }
      })
      .catch(err => {
        setError(err && err.response && err.response.data);
        console.log(err && err.response && err.response.data);
      })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onCloseAlert = () => {
    setError(null)
  }

  return (
    <div className="user_login_container">
      <p>Login</p>
      <div className='mb-3'>
        {
          error && error.message && <Alert
            message={error.message}
            type="error"
            closable
            onClose={onCloseAlert}
          />
        }
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="mobile"
          validateStatus={error && error.mobile ? "error" : "succcess"}
          help={error && error.mobile ? error.mobile : null}
        >
          <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="01*********" />
        </Form.Item>
        <Form.Item
          name="password"
          validateStatus={error && error.password ? "error" : "succcess"}
          help={error && error.password ? error.password : null}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>


        <div className='g_auth'>
          <button type="primary" htmlType="submit" className="primary_btn mb-2">
            Log in
        </button>
        <div className='g_auth'>
            <GoogleAuth />
          </div>
          <span className='register'> Dont't have an account ? <Link href="/auth/register"><a>register now!</a></Link></span>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm