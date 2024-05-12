import React, { useState } from 'react';
import { Typography, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../contexts/AuthContext';

const { Title, Paragraph } = Typography;

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const onFinish = async (values) => {
        setIsSigningIn(true);
        try {
            await doSignInWithEmailAndPassword(values.email, values.password);
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsSigningIn(false);
        }
    };

    const onGoogleSignIn = async () => {
        setIsSigningIn(true);
        try {
            await doSignInWithGoogle();
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsSigningIn(false);
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ maxWidth: 400 }}>
                <Title level={2} style={{ textAlign: 'center' }}>Welcome Back</Title>
                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ marginTop: 30 }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                            loading={isSigningIn}
                            size="large"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
                <Paragraph style={{ textAlign: 'center' }}>
                   Don't have an account?   <Link to={'/register'}>Sign up</Link>
                </Paragraph>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ flex: 1, borderBottom: '1px solid #ccc', marginRight: 10 }}></div>
                    <div style={{ fontSize: 14, fontWeight: 'bold' }}>OR</div>
                    <div style={{ flex: 1, borderBottom: '1px solid #ccc', marginLeft: 10 }}></div>
                </div>
                <Button
                    style={{ width: '100%', marginTop: 10 }}
                    loading={isSigningIn}
                    onClick={onGoogleSignIn}
                    size="large"
                    icon={<GoogleOutlined />}
                >
                    Continue with Google
                </Button>
            </div>
        </div>
    );
};

export default Login;


// style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}