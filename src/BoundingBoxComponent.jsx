import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoundingBoxComponent = ({ geoserverUrl, layerName }) => {
    const [boundingBox, setBoundingBox] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    const fetchBoundingBox = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${geoserverUrl}?service=WMS&version=1.3.0&request=GetCapabilities`);
            const bbox = extractBoundingBox(response.data, layerName);
            setBoundingBox(bbox);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No Response:', error.request);
            } else {
                // Something else happened while setting up the request
                console.error('Error:', error.message);
            }
            setError('Network Error: Unable to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    fetchBoundingBox();
}, [geoserverUrl, layerName]);

    const extractBoundingBox = (data, layerName) => {
        if (data && data.Capability && data.Capability.Layer) {
            const layer = data.Capability.Layer.find(layer => layer.Name === layerName);
            if (layer && layer.EX_GeographicBoundingBox) {
                return layer.EX_GeographicBoundingBox;
            }
        }
        throw new Error(`Bounding box information not found for layer '${layerName}'.`);
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {boundingBox && (
                <div>
                    <h2>Bounding Box Coordinates:</h2>
                    <p>Min X (Longitude): {boundingBox.west}</p>
                    <p>Min Y (Latitude): {boundingBox.south}</p>
                    <p>Max X (Longitude): {boundingBox.east}</p>
                    <p>Max Y (Latitude): {boundingBox.north}</p>
                </div>
            )}
        </div>
    );
};

export default BoundingBoxComponent;
