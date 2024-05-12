import { NavLink, useNavigate,Link } from "react-router-dom";
import { Dropdown, Typography, Button, Menu, Modal } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { doSignOut } from "../firebase/auth";
import React, { useState, useRef } from "react";
import "./nav.css";
const { Text } = Typography;

const Navbar = () => {
  const { currentUser } = useAuth();
  const navRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();


  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const hideNavbar = () => {
    if (navRef && navRef.current) {
      navRef.current.classList.remove("responsive_nav");
    }
  };

  const handleLogout = () => {
    doSignOut().then(() => {
      navigate("/");
    });
  };

  const handleLogoutClick = () => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to logout?",
      onOk: handleLogout,
    });
  };

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <Link
        onClick={hideNavbar}
        to="/"
        style={{
          textDecoration: "none",
          zIndex: "100",
          width: "100px",
        }}
      >
        <Text
          strong
          style={{
            fontSize: "2.5rem",
            backgroundImage: "linear-gradient(135deg, #ff416c, #ffaa00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "0.5px #000000",
          }}
        >
          Orbit
        </Text>
      </Link>
      <nav ref={navRef} className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <NavLink
              onClick={hideNavbar}
              to="/apod"
              className="navbar-link"
              activeClassName="active" // Add custom class for active link
            >
              <Text className="nav-text">Apod</Text>
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              onClick={hideNavbar}
              to="/neoT"
              className="navbar-link"
              activeClassName="active" // Add custom class for active link
            >
              <Text className="nav-text">NEO Watch</Text>
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              onClick={hideNavbar}
              to="/pl"
              className="navbar-link"
              activeClassName="active" // Add custom class for active link
            >
              <Text className="nav-text">Planet Details</Text>
            </NavLink>
          </li>
        </ul>
        <div className="navbar-right">
          <div className="email">
            {currentUser ? (
              <>
                <Dropdown 
                
                  overlay={
                  
                    <Menu onClick={handleClick} style={{}}>
                      <Menu.Item key="logout" onClick={handleLogoutClick}>
                        <LogoutOutlined />
                        Logout
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                 
  
                >
                  <Button
                    type="text"
                    style={{ fontSize: "1.1rem", color: "#fff" }} // Set text color for the user button
                  >
                    {currentUser.displayName || currentUser.email}
                  </Button>
                </Dropdown>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  style={{ marginRight: "20px", fontSize: "1.1rem" }}
                  href="/"
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <MenuOutlined style={{ fontSize: "20px", color: "#fff" }} />
      </button>
    </>
  );
};

export default Navbar;

{
  /* <>
<Link
  onClick={hideNavbar}
  to="/"
  style={{
    textDecoration: "none",
    zIndex: "100",
   width:"100px"
  }}
>
  <Text
    strong
    style={{
      fontSize: "2.5rem",
      backgroundImage: "linear-gradient(135deg, #ff416c, #ffaa00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      WebkitTextStroke: "0.5px #000000",
    }}
  >
    Orbit
  </Text>
</Link>
<nav ref={navRef} className="navbar">
  <ul className="navbar-list">
    <li className="navbar-item">
      <NavLink
        onClick={hideNavbar}
        to="/apod"
        className="navbar-link"
        activeClassName="active" // Add custom class for active link
      >
        <Text className="nav-text">Apod</Text>
      </NavLink>
    </li>
    <li className="navbar-item">
      <NavLink
        onClick={hideNavbar}
        to="/neoT"
        className="navbar-link"
        activeClassName="active" // Add custom class for active link
      >
        <Text className="nav-text">NEO Watch</Text>
      </NavLink>
    </li>
    <li className="navbar-item">
      <NavLink
        onClick={hideNavbar}
        to="/pl"
        className="navbar-link"
        activeClassName="active" // Add custom class for active link
      >
        <Text className="nav-text">Planet Details</Text>
      </NavLink>
    </li>
  </ul>
  <div className="navbar-right">
    <div className="email">
      {currentUser ? (
        <>
          <Button
            type="text"
            onClick={handleClick}
            style={{ fontSize: "1.1rem", color: "#fff" }} // Set text color for the user button
          >
            {currentUser.displayName || currentUser.email}
          </Button>
          <Menu
            open={openMenu}
            onClick={handleClick}
            style={{ marginTop: "7px" }}
          >
            <Menu.Item key="logout" onClick={handleLogoutClick}>
              <LogoutOutlined />
              Logout
            </Menu.Item>
          </Menu>
        </>
      ) : (
        <>
          <Button
            type="primary"
            style={{ marginRight: "20px", fontSize: "1.1rem" }}
            href="/"
          >
            Login
          </Button>
        </>
      )}
    </div>
  </div>
</nav>
<button className="nav-btn" onClick={showNavbar}>
  <MenuOutlined style={{ fontSize: "20px", color: "#fff" }} /> 
</> */
}
