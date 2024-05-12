import React, { useState, useEffect } from "react";
import {
  Typography,
  Spin,
  Card,
  Alert,
  Button,
  DatePicker,
  Image,
  Flex,
  Col,
  Row,
  Space,
  Skeleton
} from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;

const Apod = () => {
  const [loading, setLoading] = useState(false);
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchAPOD = async (date) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=sHcBcNRbFfNJ7j0s4yFe8fpQv9kd8h9QfDW4j9i9&date=${date}`
      );
      setApodData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAPOD(date.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    // Fetch APOD for today's date when the component mounts
    const currentDate = new Date();
    setSelectedDate(currentDate);
    fetchAPOD(currentDate.toISOString().split("T")[0]);
  }, []);

  return (
    <div>
      <Flex vertical align="center" style={{ padding: "20px", minHeight:"100vh"}}>

        <div style={{ width: "100%" }}>
          <Title level={2}>NASA Astronomy Picture of the Day (APOD)</Title>
        </div>

        <div style={{ width: "100%" }}>
          <DatePicker
            onChange={handleDateChange}
            defaultValue={selectedDate}
            format="YYYY-MM-DD"
            style={{ marginBottom: "20px" }}
          />
        </div>
        
        {/* {loading && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "10",
            }}
          >
            <Spin size="large" />
          </div>
        )} */}

        {error && (
          <Alert
            message="Error"
            description={error.message}
            type="error"
            style={{ marginBottom: "20px", width: "100%" }}
          />
        )}

        {apodData && (
          <Card
            title={apodData.title}
            extra={
              <Button
                onClick={() => fetchAPOD(selectedDate.format("YYYY-MM-DD"))}
              >
                Reload
              </Button>
            }
            loading={loading}
            bordered={false}
            style={{
              width: "100%",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
           
            <Space>
              <Row>
                <Col xs={24} sm={10} style={{display:"flex", justifyContent:"center"}}>
              
                  <Image
                    src={apodData.url}
                    alt={apodData.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "500px",
                      borderRadius: "10px",
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
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
                    <Paragraph style={{ width: "80%", textAlign:"left"}}>
                      {apodData.explanation}
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </Space>
           
          </Card>
        )}


      </Flex>
    </div>
  );
};

export default Apod;
