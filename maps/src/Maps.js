import React, {useRef} from 'react';
import './Maps.css';

const Maps = () => {
    const mapContainerRef = useRef(null);

    return(
        <div>
            <div className="map_container" ref={mapContainerRef}/>
        </div>
    );
}

export default Maps;