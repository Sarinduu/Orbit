import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin, Alert } from 'antd';

const SolarSystemPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [celestialData, setCelestialData] = useState(null);

    useEffect(() => {
        const fetchCelestialData = async () => {
            try {
                const response = await axios.get('https://ssd-api.jpl.nasa.gov/fireball.api');
                setCelestialData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCelestialData();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Solar System Dynamics</h1>
            {loading && <Spin size="large" style={{ marginTop: '20px' }} />}
            {error && <Alert message="Error" description={error.message} type="error" style={{ marginTop: '20px' }} />}
            {celestialData && (
                <div>
                    <h2>Celestial Bodies</h2>
                    <ul>
                        {celestialData.map((celestialBody, index) => (
                            <li key={index}>
                                <strong>Name:</strong> {celestialBody.name} <br />
                                <strong>Velocity:</strong> {celestialBody.velocity} <br />
                                <strong>Distance:</strong> {celestialBody.distance}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SolarSystemPage;
