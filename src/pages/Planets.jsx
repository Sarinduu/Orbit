import React, { useState, useEffect } from "react";
import { List, Card } from "antd";
//import 'antd/dist/antd.css';

const Planets = () => {
  const [planetData, setPlanetData] = useState([]);

  useEffect(() => {
    fetchPlanetData();
  }, []);

  const fetchPlanetData = async () => {
    try {
      const response = await fetch(
        "https://api.le-systeme-solaire.net/rest/bodies/"
      );
      const data = await response.json();
      const planets = data.bodies.filter((body) => body.isPlanet);
      console.log(planets);
      setPlanetData(planets);
    } catch (error) {
      console.error("Error fetching planet data:", error);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
    <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#1890ff", fontSize: "32px" }}>
      Planet Details
    </h1>
    <List
      grid={{ gutter: 24, column: 2 }}
      dataSource={planetData}
      renderItem={(planet) => (
        <List.Item style={{ listStyleType: "none" }}>
          <Card
            title={<h2 style={{ textAlign: "center", color: "#1890ff" }}>{planet.englishName}</h2>}
            style={{ width: "100%", border: "1px solid #e8e8e8", borderRadius: "10px"  ,boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}
          >
            <p>
              <strong>Mass:</strong> {planet.mass.massValue} {planet.mass.massExponent} kg
            </p>
            <p>
              <strong>Mean radius:</strong> {planet.meanRadius} km
            </p>
            <p>
              <strong>Semi-major axis:</strong> {planet.semimajorAxis} km
            </p>
            <p>
              <strong>Orbital period:</strong> {planet.sideralOrbit} days
            </p>
            <p>
              <strong>Rotation period:</strong> {planet.sideralRotation} days
            </p>
            <p>
              <strong>Gravity:</strong> {planet.gravity} m/s²
            </p>
            <p>
              <strong>Number of moons:</strong> {planet.moons ? planet.moons.length : 0}
            </p>
            {planet.moons && planet.moons.length > 0 && (
              <div>
                <h3 style={{ marginTop: "16px", color: "#1890ff" }}>Moons:</h3>
                <p>
                  {planet.moons.map((moon, index) => (
                    <span key={moon.id}>
                      {index > 0 && ", "}
                      <strong>{moon.moon}</strong>
                    </span>
                  ))}
                </p>
              </div>
            )}
          </Card>
        </List.Item>
      )}
    />
  </div>
  );
};

export default Planets;
