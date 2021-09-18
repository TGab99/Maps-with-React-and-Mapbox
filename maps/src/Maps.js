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
            <form className="menu">
                <input id="satellite-v9" type="radio" name="rtoggle" value="satellite"/>
                <label for="satellite-v9">satellite</label>
                <input id="light-v10" type="radio" name="rtoggle" value="light"/>
                <label for="light-v10">light</label>
                <input id="dark-v10" type="radio" name="rtoggle" value="dark"/>
                <label for="dark-v10">dark</label>
                <input id="streets-v10" type="radio" name="rtoggle" value="streets"/>
                <label for="streets-v10">streets</label>
                <input id="outdoors-v10" type="radio" name="rtoggle" value="outdoors"/>
                <label for="outdoors-v10">outdoors</label>
            </form>
        </div>
    );
}

export default Maps;