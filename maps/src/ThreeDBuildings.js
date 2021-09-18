import React, {useRef, useState, useEffect} from 'react';
import * as mapboxgl from 'mapbox-gl';
import './ThreeDBuildings.css';

mapboxgl.accessToken = '';

const ThreeDBuildings = () => {
    const buildingsContainerRef = useRef(null);
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
            container: buildingsContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [latitude, longitude],
            zoom: zoom
        });

        return() => map.remove();
    })

    return(
        <div>
            <div className="buildings_container" ref={buildingsContainerRef}/>
        </div>
    );
}

export default ThreeDBuildings;