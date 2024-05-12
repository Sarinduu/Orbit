import React from "react";
import { Breadcrumb, Layout, Menu, theme, Typography ,Button, Modal} from "antd";
import { Link, useNavigate,Outlet } from "react-router-dom";

import Home from "../pages/Home";
import { useAuth } from "../contexts/AuthContext";
import { doSignOut } from "../firebase/auth";
import Navbar from "./Navbar";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const colors1 = ["#ff416c", "#ffaa00"];

const LayoutPage = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();



  const handleLogout = () => {
    doSignOut().then(() => {
      navigate("/");
    });
  };

  const handleLogoutClick = () => {
    Modal.confirm({
      title: 'Logout',
      content: 'Are you sure you want to logout?',
      onOk: handleLogout,
    });
  };

  const items1 = [
    { key: '1', label: 'Apod', link: '/apod' },
    { key: '2', label: 'NEO Watch', link: '/neoT' },
    { key: '3', label: 'Planet Details', link: '/pl' },
    
  ];

  return (
    <Layout>
    

    <Header 
    style={{ backgroundColor: '#001529', padding: '0 20px', display:"flex"}}
    >
    
     <Navbar/>
    
    </Header>

      <Content>
      <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor:"#001529",
          color:"white"
        }}
      >
        Orbit ©{new Date().getFullYear()} Created by Sarindu Wijekoon
      </Footer>
    </Layout>
  );
};

export default LayoutPage;

{
  /* {currentUser && (
                <Title level={2}>
                  {" "}
                  Hello{" "}
                  {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}
                  , you are now logged in.
                </Title>
              )} */
}


{/* <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#001529",
        color: "#fff"
      }}
    >
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '5px', color: '#fff' }}>Connect with us:</p>
        <div style={{ marginBottom: '20px' }}>
          <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px', color: '#fff' }}>
            <TwitterOutlined />
          </a>
          <a href="https://facebook.com/yourfacebook" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px', color: '#fff' }}>
            <FacebookOutlined />
          </a>
          <a href="https://linkedin.com/yourlinkedin" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px', color: '#fff' }}>
            <LinkedinOutlined />
          </a>
        </div>
        <p style={{ marginBottom: '5px' }}>Orbit © {new Date().getFullYear()} Created by Sarindu Wijekoon</p>
      </div>
    </Footer> */}

    // import { TwitterOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
