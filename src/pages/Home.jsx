import React, { useEffect } from "react";
import { TinyColor } from "@ctrl/tinycolor";

import {
  Typography,
  Button,
  ConfigProvider,
  Card,
  Image,
  Flex,
  Col,
  Row,
  Space,
} from "antd";
import "./home.css"; // Import CSS file for additional styling
import { useAuth } from "../contexts/AuthContext";
import { RocketOutlined } from "@ant-design/icons"; // Import the SpaceManOutlined icon from Ant Design
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import Test from "./Test";

const { Title, Paragraph } = Typography;

const colors1 = ["#ff416c", "#ffaa00"];




const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // Scroll to the section with boxes when "Get Started" button is clicked
    document
      .getElementById("main-content1")
      .scrollIntoView({ behavior: "smooth" });
  };

  // const handleGetStartedClick = () => {
  //   // Get the target element
  //   const targetElement = document.getElementById("main-content1");
  
  //   // Calculate the distance to scroll
  //   const scrollDistance = targetElement.getBoundingClientRect().top;
  
  //   // Set the duration of the scroll animation and the update interval
  //   const duration = 100; // Duration of the scroll animation in milliseconds
  //   const interval = 0.5; // Update interval in milliseconds
  
  //   // Calculate the step size for each update
  //   const step = scrollDistance / (duration / interval);
  
  //   // Define a function to perform the smooth scroll
  //   const smoothScroll = (currentStep, accumulatedScroll) => {
  //     const newScroll = accumulatedScroll + currentStep;
  //     window.scrollTo(0, newScroll);
  
  //     // Check if the scroll animation is complete
  //     if (newScroll < scrollDistance) {
  //       setTimeout(() => {
  //         smoothScroll(currentStep, newScroll);
  //       }, interval);
  //     }
  //   };
  
  //   // Start the smooth scroll animation
  //   smoothScroll(step, 0);
  // };

  const handleNavigate = () => {
    navigate("/apod");
  };
  const handleNavigate1 = () => {
    navigate("/neoT");
  };
  const handleNavigate2 = () => {
    navigate("/pl");
  };

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".scroll-animation");
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.8) {
          section.classList.add("animate");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Background Image Section */}
      <div
        className="full-height-section background-section scroll-animation"
        style={{
          backgroundImage: `url('/spaceship-orbits-dark-galaxy-glowing-blue-comet-generated-by-ai.jpg')`,
        }} // Replace with the path to your background image
      >
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "60%",
            //borderRadius:"10px",
            //backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent background color
            //backdropFilter: "blur(5px)",
          }}
        >
          <Title
          
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#ffffff",
              fontSize: "40px",         
            }}
          
          >
            Embark on a Galactic Voyage with{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${colors1.join(", ")})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "0.5px #000000", // Add text stroke for the border
              }}
            >
              Orbit
            </span>
          </Title>
          <Paragraph
            style={{
              fontSize: 18,
              maxWidth: 600,
              color: "#ffffff",
              padding:"10px",
              borderRadius:"10px",
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background color
              backdropFilter: "blur(8px)",
            }}
          >
            Set off on an epic journey through the cosmos with Orbit. Launch
            into the infinite expanse, unraveling fascinating facts,
            breathtaking images, and the latest updates in space exploration.
          </Paragraph>
          {/* <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            className="gradient-button"
            style={{ marginTop: 20 }}
          >
            Explore Now
          </Button> */}

          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(135deg, ${colors1.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                    colors1
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                    colors1
                  ).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => {
                handleGetStartedClick();
              }}
            >
              Explore Now
            </Button>
          </ConfigProvider>
        </div>

        <div className="erathbox">
          <Test />
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="main-content">
        {/* Section 1 */}
        <div
          className="full-height-section scroll-animation"
          id="main-content1"
        >
          <Card className="apodcard">
            <Space>
              <Row xs={24} sm={12}>
                <Col
                  xs={24}
                  sm={10}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={"/Reflections_APOD1200.jpg"}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </Col>
                <Col xs={24} sm={14}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <div
                      className="content"
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {/* {currentUser && (
                <Title level={2}>
                  {" "}
                  Hello{" "}
                  {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}
                  , you are now logged in.
                </Title>
              )} */}

                      <Title level={2}>Explore the Cosmos Daily</Title>
                      <Paragraph>
                        Discover the wonders of the universe one day at a time
                        with the Astronomy Picture of the Day (APOD). Each day
                        brings a new captivating image along with an intriguing
                        explanation by professional astronomers. Immerse
                        yourself in the beauty and grandeur of space
                        exploration.
                      </Paragraph>

                      <ConfigProvider
                        theme={{
                          components: {
                            Button: {
                              colorPrimary: `linear-gradient(135deg, ${colors1.join(
                                ", "
                              )})`,
                              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                                colors1
                              ).join(", ")})`,
                              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                                colors1
                              ).join(", ")})`,
                              lineWidth: 0,
                            },
                          },
                        }}
                      >
                        <Button type="primary" onClick={handleNavigate}>
                          View Today's APOD
                        </Button>
                      </ConfigProvider>
                    </div>
                  </div>
                </Col>
              </Row>
            </Space>
          </Card>
        </div>

        {/* Section 2 */}
        <div className="full-height-section scroll-animation">
          <Card className="apodcard">
            <Space>
              <Row xs={24} sm={12}>
                <Col
                  xs={24}
                  sm={10}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={"/asteroids.jpg"}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </Col>
                <Col xs={24} sm={14}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <div
                      className="content"
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {/* {currentUser && (
                <Title level={2}>
                  {" "}
                  Hello{" "}
                  {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}
                  , you are now logged in.
                </Title>
              )} */}

                      <Title level={2}>Explore Near-Earth Objects</Title>
                      <Paragraph>
                        Delve into the realm of near-Earth objects (NEOs) with
                        the NeoWs (Near Earth Object Web Service) API. Discover
                        fascinating insights into asteroids that come close to
                        Earth's orbit. With NeoWs, you can retrieve data about
                        the orbits, sizes, and trajectories of these celestial
                        bodies.
                      </Paragraph>

                      <ConfigProvider
                        theme={{
                          components: {
                            Button: {
                              colorPrimary: `linear-gradient(135deg, ${colors1.join(
                                ", "
                              )})`,
                              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                                colors1
                              ).join(", ")})`,
                              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                                colors1
                              ).join(", ")})`,
                              lineWidth: 0,
                            },
                          },
                        }}
                      >
                        <Button type="primary" onClick={handleNavigate1}>
                          Explore NEOs
                        </Button>
                      </ConfigProvider>
                    </div>
                  </div>
                </Col>
              </Row>
            </Space>
          </Card>
        </div>

        {/* Section 3 */}
        <div className="full-height-section scroll-animation">
          <Card className="apodcard">
            <Space>
              <Row xs={24} sm={12}>
                <Col
                  xs={24}
                  sm={10}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={
                      "/-methode-times-prod-web-bin-51ff14ce-b07d-11e7-8f75-2b6f1159f66f.jpg"
                    }
                    style={{
                      maxWidth: "100%",
                      maxHeight: "500px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </Col>
                <Col xs={24} sm={14}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <div
                      className="content"
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {/* {currentUser && (
                <Title level={2}>
                  {" "}
                  Hello{" "}
                  {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}
                  , you are now logged in.
                </Title>
              )} */}

                      <Title level={2}>Explore Solar System Bodies</Title>
                      <Paragraph>
                        Embark on a journey through the vastness of our solar
                        system with the Solar System Bodies API. Uncover
                        captivating details about planets, moons, asteroids, and
                        more as you delve into their orbits, compositions, and
                        fascinating characteristics. With this API, you can
                        unravel the mysteries of celestial bodies that populate
                        our cosmic neighborhood.
                      </Paragraph>

                      <ConfigProvider
                        theme={{
                          components: {
                            Button: {
                              colorPrimary: `linear-gradient(135deg, ${colors1.join(
                                ", "
                              )})`,
                              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                                colors1
                              ).join(", ")})`,
                              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                                colors1
                              ).join(", ")})`,
                              lineWidth: 0,
                            },
                          },
                        }}
                      >
                        <Button type="primary" onClick={handleNavigate2}>
                          Explore Solar System
                        </Button>
                      </ConfigProvider>
                    </div>
                  </div>
                </Col>
              </Row>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
