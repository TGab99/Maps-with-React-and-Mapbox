import React, {useRef, useState, useEffect} from 'react';
import * as mapboxgl from 'mapbox-gl';
import './Maps.css';

mapboxgl.accessToken = '';

const Maps = () => {
    const mapContainerRef = useRef(null);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [zoom, setZoom] = useState(5);

    navigator.geolocation.getCurrentPosition(successPosition, errorPosition, {
        enableHighAccuracy: true,
    });

    function successPosition(position){
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
    }

    function errorPosition(){
        setLongitude(12.9716);
        setLatitude(77.5946);
    }

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [latitude, longitude],
            zoom: zoom
        });
    }, []);

    return(
        <div>
            <div className="map_container" ref={mapContainerRef}/>
        </div>
    );
}

export default Maps;