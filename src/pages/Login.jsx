import React, { useState } from "react";
import { Typography, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/AuthContext";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url('/sunrise-earth-s-horizon-observed-from-outer-space.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          padding: "80px",
          borderRadius: "10px",
        }}
      >
        <Title level={2} style={{ textAlign: "center",color:"white" }}>
          Welcome Back
        </Title>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ marginTop: 30 }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",}}/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",}}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" ,boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}
              loading={isSigningIn}
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <Paragraph style={{ textAlign: "center", color:"white" }}>
          Don't have an account? <Link to={"/register"} style={{color:"lightblue"}}>Sign up</Link>
        </Paragraph>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{ flex: 1, borderBottom: "1px solid #ccc", marginRight: 10 }}
          ></div>
          <div style={{ fontSize: 14, fontWeight: "bold", color:"white" }}>OR</div>
          <div
            style={{ flex: 1, borderBottom: "1px solid #ccc", marginLeft: 10 }}
          ></div>
        </div>
        <Button
          style={{ width: "100%", marginTop: 10 }}
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
