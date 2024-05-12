import React, { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Button,
  Descriptions,
  Pagination,
  Card,
  Row,
  Col,
  Typography,
  Flex,
} from "antd";
import axios from "axios";

const API_KEY = "sHcBcNRbFfNJ7j0s4yFe8fpQv9kd8h9QfDW4j9i9";
const { Title, Paragraph } = Typography;

const NeoTable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedNeo, setSelectedNeo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}&page=${currentPage}`
      );
      setData(response.data.near_earth_objects);
      setTotalItems(response.data.page.total_elements);
    } catch (error) {
      console.error("Error fetching NEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Absolute Magnitude",
      dataIndex: "absolute_magnitude_h",
      key: "absolute_magnitude_h",
    },
    {
      title: "Close Approach Date",
      dataIndex: "close_approach_data",
      key: "close_approach_data",
      render: (text, record) => (
        <span>
          {text && text.length > 0 ? text[0].close_approach_date : "-"}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "nasa_jpl_url",
      key: "nasa_jpl_url",
      render: (text, record) => (
        <Button type="link" onClick={() => handleNeoLookup(record.id)}>
          More Info
        </Button>
      ),
    },
  ];

  const handleNeoLookup = async (neoId) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${neoId}?api_key=${API_KEY}`
      );
      setSelectedNeo(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching NEO lookup data:", error);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ width: "100%" }}>
        <Title level={2}>NEO Watch: Tracking Near-Earth Objects</Title>
      </div>

      <div style={{ width: "100%" }}>
        <Paragraph>
          Welcome to NEO Watch, your platform for tracking Near-Earth Objects
          (NEOs). Here, you can browse the overall Asteroid data-set provided by
          NASA's Asteroids - NeoWs API. NEOs are celestial objects such as
          asteroids or comets with orbits that come close to Earth's orbit.
          Explore the data to learn more about these fascinating objects.
        </Paragraph>
      </div>

      <Flex vertical style={{}}>
        <Table
          loading={loading}
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={false}
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={20}
          total={totalItems}
          onChange={onPageChange}
          showSizeChanger={false}
          style={{ textAlign: "end", margin: "20px 0" }}
        />
      </Flex>
      <Modal
        title="NEO Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        className="neo-modal"
      >
        {selectedNeo && (
          <div className="neo-details">
            <Row gutter={[16, 16]} justify="start">
              <Col span={24}>
                <b>ID:</b> {selectedNeo.neo_reference_id}
              </Col>
              <Col span={24}>
                <b>Name:</b> {selectedNeo.name}
              </Col>
              <Col span={24}>
                <b>Absolute Magnitude:</b> {selectedNeo.absolute_magnitude_h}
              </Col>
              <Col span={24}>
                <b>Estimated Diameter (m):</b>
                {selectedNeo.estimated_diameter &&
                  selectedNeo.estimated_diameter.meters &&
                  `${selectedNeo.estimated_diameter.meters.estimated_diameter_min} - ${selectedNeo.estimated_diameter.meters.estimated_diameter_max}`}
              </Col>
              <Col span={24}>
                <b>Potentially Hazardous:</b>{" "}
                {selectedNeo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
              </Col>
              <Col span={24}>
                <b>Sentry Object:</b>{" "}
                {selectedNeo.is_sentry_object ? "Yes" : "No"}
              </Col>
              <Col span={24}>
                <b>Close Approach Date:</b>
                {selectedNeo.close_approach_data &&
                  selectedNeo.close_approach_data[0] &&
                  selectedNeo.close_approach_data[0].close_approach_date}
              </Col>
              <Col span={24}>
                <b>Miss Distance (Astronomical Units):</b>
                {selectedNeo.close_approach_data &&
                  selectedNeo.close_approach_data[0] &&
                  selectedNeo.close_approach_data[0].miss_distance &&
                  selectedNeo.close_approach_data[0].miss_distance.astronomical}
              </Col>
              <Col span={24}>
                <b>Relative Velocity (km/h):</b>
                {selectedNeo.close_approach_data &&
                  selectedNeo.close_approach_data[0] &&
                  selectedNeo.close_approach_data[0].relative_velocity &&
                  selectedNeo.close_approach_data[0].relative_velocity
                    .kilometers_per_hour}
              </Col>
              <Col span={24}>
                <b>Orbiting Body:</b>
                {selectedNeo.close_approach_data &&
                  selectedNeo.close_approach_data[0] &&
                  selectedNeo.close_approach_data[0].orbiting_body}
              </Col>
              <Col span={24}>
                <b>Orbit Determination Date:</b>
                {selectedNeo.orbital_data &&
                  selectedNeo.orbital_data.orbit_determination_date}
              </Col>
              <Col span={24}>
                <b>Orbit Uncertainty:</b>
                {selectedNeo.orbital_data &&
                  selectedNeo.orbital_data.orbit_uncertainty}
              </Col>
              <Col span={24}>
                <b>Minimum Orbit Intersection:</b>
                {selectedNeo.orbital_data &&
                  selectedNeo.orbital_data.minimum_orbit_intersection}
              </Col>
              <Col span={24}>
                <b>Jupiter Tisserand Invariant:</b>
                {selectedNeo.orbital_data &&
                  selectedNeo.orbital_data.jupiter_tisserand_invariant}
              </Col>
              {/* Add more Col components for additional details */}
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NeoTable;

//const API_KEY = "sHcBcNRbFfNJ7j0s4yFe8fpQv9kd8h9QfDW4j9i9";
{
  /* <Modal
        title="NEO Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        className="neo-modal"
      >
        {selectedNeo && (
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="ID">
              {selectedNeo.neo_reference_id}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {selectedNeo.name}
            </Descriptions.Item>
            <Descriptions.Item label="Absolute Magnitude">
              {selectedNeo.absolute_magnitude_h}
            </Descriptions.Item>
            <Descriptions.Item label="Estimated Diameter (m)">
              {selectedNeo.estimated_diameter &&
                selectedNeo.estimated_diameter.meters &&
                `${selectedNeo.estimated_diameter.meters.estimated_diameter_min} - ${selectedNeo.estimated_diameter.meters.estimated_diameter_max}`}
            </Descriptions.Item>
            <Descriptions.Item label="Potentially Hazardous">
              {selectedNeo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Sentry Object">
              {selectedNeo.is_sentry_object ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Close Approach Date">
              {selectedNeo.close_approach_data &&
                selectedNeo.close_approach_data[0] &&
                selectedNeo.close_approach_data[0].close_approach_date}
            </Descriptions.Item>
            <Descriptions.Item label="Miss Distance (Astronomical Units)">
              {selectedNeo.close_approach_data &&
                selectedNeo.close_approach_data[0] &&
                selectedNeo.close_approach_data[0].miss_distance &&
                selectedNeo.close_approach_data[0].miss_distance.astronomical}
            </Descriptions.Item>
            <Descriptions.Item label="Relative Velocity (km/h)">
              {selectedNeo.close_approach_data &&
                selectedNeo.close_approach_data[0] &&
                selectedNeo.close_approach_data[0].relative_velocity &&
                selectedNeo.close_approach_data[0].relative_velocity
                  .kilometers_per_hour}
            </Descriptions.Item>
            <Descriptions.Item label="Orbiting Body">
              {selectedNeo.close_approach_data &&
                selectedNeo.close_approach_data[0] &&
                selectedNeo.close_approach_data[0].orbiting_body}
            </Descriptions.Item>
            <Descriptions.Item label="Orbit Determination Date">
              {selectedNeo.orbital_data &&
                selectedNeo.orbital_data.orbit_determination_date}
            </Descriptions.Item>
            <Descriptions.Item label="Orbit Uncertainty">
              {selectedNeo.orbital_data &&
                selectedNeo.orbital_data.orbit_uncertainty}
            </Descriptions.Item>
            <Descriptions.Item label="Minimum Orbit Intersection">
              {selectedNeo.orbital_data &&
                selectedNeo.orbital_data.minimum_orbit_intersection}
            </Descriptions.Item>
            <Descriptions.Item label="Jupiter Tisserand Invariant">
              {selectedNeo.orbital_data &&
                selectedNeo.orbital_data.jupiter_tisserand_invariant}
            </Descriptions.Item>
            
          </Descriptions>
        )}
      </Modal> */
}
