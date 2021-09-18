import React, {useState, useRef, useEffect} from 'react';
import * as mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import './Maps.css';

mapboxgl.accessToken = '';

const Maps = () => {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [zoom, setZoom] = useState(5);
    const mapContainerRef = useRef(null);

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
            style: "mapbox://styles/mapbox/streets-v11",
            center: [latitude, longitude],
            zoom: zoom,
          });

          map.addControl(new mapboxgl.NavigationControl(), "top-right");

          map.on("move", () => {
              setLongitude(map.getCenter().longitude);
              setLatitude(map.getCenter().latitude);
              setZoom(map.getZoom().toFixed(2));
          });

          const directions = new MapboxDirections({
              accessToken: mapboxgl.accessToken,
              unit: 'metric'
          });

          map.addControl(directions, "top-left");

        return () => map.remove();
     }, []);

    return(
        <div>
            <div className="map_container" ref={mapContainerRef}/>
        </div>
    );
}

export default Maps;