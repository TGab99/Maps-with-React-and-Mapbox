import React, {useRef, useState, useEffect} from 'react';
import * as mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = '';

const ThreeDBuildings = () => {
    const buildingsContainerRef = useRef(null);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [zoom, setZoom] = useState(5);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: buildingsContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [latitude, longitude],
            zoom: zoom
        });

        return({});
    })

    return(
        <div>
            <div className="buildings_container" ref={buildingsContainerRef}/>
        </div>
    );
}

export default ThreeDBuildings;