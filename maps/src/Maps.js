import React, {useRef, useState} from 'react';
import * as mapboxgl from 'mapbox-gl';
import './Maps.css';

mapboxgl.accessToken = '';

const Maps = () => {
    const mapContainerRef = useRef(null);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [zoom, setZoom] = useState(5);

    function successLocation(position){
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
    }

    function errorLocation(){
        setLongitude(12.9716);
        setLatitude(77.5946);
    }

    return(
        <div>
            <div className="map_container" ref={mapContainerRef}/>
        </div>
    );
}

export default Maps;