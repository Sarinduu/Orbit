import React, { useState } from 'react';
import { Typography, Form, Input, Button, message } from 'antd';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';

const { Title } = Typography;

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onFinish = async () => {
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsRegistering(false);
            }
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/home" replace={true} />;
    }

    return (
        <>
            <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div style={{ maxWidth: 400 }}>
                    <Title level={2} style={{ textAlign: 'center' }}>Create a New Account</Title>
                    <Form
                        name="register_form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        style={{ marginTop: 30 }}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email!' }]}
                        >
                            <Input placeholder="Email" size="large" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password placeholder="Password" size="large" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm Password" size="large" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Item>

                        {errorMessage && (
                            <span style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</span>
                        )}

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: '100%' }}
                                loading={isRegistering}
                                size="large"
                            >
                                {isRegistering ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{ textAlign: 'center' }}>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Register;
