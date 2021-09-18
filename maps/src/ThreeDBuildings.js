import React, {useState, useRef, useEffect} from 'react';
import * as mapboxgl from 'mapbox-gl';
import './ThreeDBuildings.css';

mapboxgl.accessToken = '';

const ThreeDBuildings = () => {
    const buildingsContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: buildingsContainerRef.current,
            style: "mapbox://styles/mapbox/light-v10",
            center: [-74.0066, 40.7135],
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            antialias: true
          });

          map.addControl(new mapboxgl.NavigationControl(), "top-right");

          map.on('load', () => {
            const layers = map.getStyle().layers;
            const labelLayerId = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout['text-field']
            ).id;
            
            map.addLayer(
            {
                'id': 'add-3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            },labelLayerId);
        });

        return () => map.remove();
     }, []);

    return(
        <div>
            <div className="buildings_container" ref={buildingsContainerRef}/>
        </div>
    );
}

export default ThreeDBuildings;