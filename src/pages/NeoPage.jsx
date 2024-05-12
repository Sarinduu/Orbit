import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin, Alert, Tabs, Table, Pagination } from 'antd';

const { TabPane } = Tabs;

const NeoPage = () => {
    const [loadingFeed, setLoadingFeed] = useState(true);
    const [loadingLookup, setLoadingLookup] = useState(true);
    const [loadingBrowse, setLoadingBrowse] = useState(true);
    const [errorFeed, setErrorFeed] = useState(null);
    const [errorLookup, setErrorLookup] = useState(null);
    const [errorBrowse, setErrorBrowse] = useState(null);
    const [feedData, setFeedData] = useState(null);
    const [lookupData, setLookupData] = useState(null);
    const [browseData, setBrowseData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchFeedData = async () => {
            try {
                const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=sHcBcNRbFfNJ7j0s4yFe8fpQv9kd8h9QfDW4j9i9');
                setFeedData(response.data);
            } catch (error) {
                setErrorFeed(error);
            } finally {
                setLoadingFeed(false);
            }
        };

        const fetchLookupData = async () => {
            try {
                const response = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=sHcBcNRbFfNJ7j0s4yFe8fpQv9kd8h9QfDW4j9i9');
                setLookupData(response.data);
            } catch (error) {
                setErrorLookup(error);
            } finally {
                setLoadingLookup(false);
            }
        };

        const fetchBrowseData = async (page) => {
            try {
                const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?page=${page}&size=10&api_key=sHcBcNRbFfNJ7j0s4yFe8fpQv9kd8h9QfDW4j9i9`);
                setBrowseData(response.data);
                setTotalPages(response.data.page.total_pages);
            } catch (error) {
                setErrorBrowse(error);
            } finally {
                setLoadingBrowse(false);
            }
        };

        fetchFeedData();
        fetchLookupData();
        fetchBrowseData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>NASA Near Earth Object Web Service</h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Feed" key="1">
                    {loadingFeed && <Spin size="large" style={{ marginTop: '20px' }} />}
                    {errorFeed && <Alert message="Error" description={errorFeed.message} type="error" style={{ marginTop: '20px' }} />}
                    {feedData && (
                        <div>
                            <h2>Feed Data</h2>
                            <p>
                                Total Number of Near Earth Objects Today: {feedData.element_count}<br />
                                Links: {feedData.links.self}
                            </p>
                        </div>
                    )}
                </TabPane>
                <TabPane tab="Lookup" key="2">
                    {loadingLookup && <Spin size="large" style={{ marginTop: '20px' }} />}
                    {errorLookup && <Alert message="Error" description={errorLookup.message} type="error" style={{ marginTop: '20px' }} />}
                    {lookupData && (
                        <div>
                            <h2>Lookup Data</h2>
                            <p>
                                ID: {lookupData.neo_reference_id}<br />
                                Name: {lookupData.name}<br />
                                Links: {lookupData.links.self}
                            </p>
                        </div>
                    )}
                </TabPane>
                <TabPane tab="Browse" key="3">
                    {loadingBrowse && <Spin size="large" style={{ marginTop: '20px' }} />}
                    {errorBrowse && <Alert message="Error" description={errorBrowse.message} type="error" style={{ marginTop: '20px' }} />}
                    {browseData && (
                        <div>
                            <h2>Browse Data</h2>
                            <Table
                                columns={[
                                    { title: 'ID', dataIndex: 'id', key: 'id' },
                                    { title: 'Name', dataIndex: 'name', key: 'name' },
                                    { title: 'Nasa JPL URL', dataIndex: 'nasa_jpl_url', key: 'nasa_jpl_url' },
                                ]}
                                dataSource={browseData.near_earth_objects}
                                pagination={false}
                            />
                            <Pagination
                                current={currentPage}
                                total={totalPages * 10}
                                onChange={handlePageChange}
                                style={{ marginTop: '20px' }}
                            />
                        </div>
                    )}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default NeoPage;
