import React, { useState } from "react";
import { Typography, Form, Input, Button, message } from "antd";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      <main
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
          <Title level={2} style={{ textAlign: "center", color: "white" }}>
            Create a New Account
          </Title>
          <Form
            name="register_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ marginTop: 30 }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
                onChange={(e) => setEmail(e.target.value)}
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                onChange={(e) => setPassword(e.target.value)}
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)" }}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                size="large"
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)" }}
              />
            </Form.Item>

            {errorMessage && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errorMessage}
              </span>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" ,boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}
                loading={isRegistering}
                size="large"
              >
                {isRegistering ? "Signing Up..." : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: "center", color: "white" }}>
            <p>
              Already have an account?{" "}
              <Link to="/" style={{ color: "lightblue"}}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
