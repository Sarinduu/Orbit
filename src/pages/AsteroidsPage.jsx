import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin, Alert } from 'antd';

const AsteroidsPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [asteroidsData, setAsteroidsData] = useState(null);

    useEffect(() => {
        const fetchAsteroidsData = async () => {
            try {
                const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=sHcBcNRbFfNJ7j0s4yFe8fpQv9kd8h9QfDW4j9i9');
                // DEMO_KEY is used here, replace it with your own NASA API key
                setAsteroidsData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAsteroidsData();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Asteroids Near Earth</h1>
            {loading && <Spin size="large" style={{ marginTop: '20px' }} />}
            {error && <Alert message="Error" description={error.message} type="error" style={{ marginTop: '20px' }} />}
            {asteroidsData && (
                <div>
                    <h2>Today's Asteroids</h2>
                    <ul>
                        {Object.keys(asteroidsData.near_earth_objects).map((date) => (
                            <li key={date}>
                                <h3>{date}</h3>
                                <ul>
                                    {asteroidsData.near_earth_objects[date].map((asteroid) => (
                                        <li key={asteroid.id}>
                                            <strong>Name:</strong> {asteroid.name} <br />
                                            <strong>Estimated Diameter (meters):</strong> {asteroid.estimated_diameter.meters.estimated_diameter_min} - {asteroid.estimated_diameter.meters.estimated_diameter_max} <br />
                                            <strong>Miss Distance (kilometers):</strong> {asteroid.close_approach_data[0].miss_distance.kilometers}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AsteroidsPage;
