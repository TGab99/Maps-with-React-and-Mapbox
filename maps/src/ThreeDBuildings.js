import React, {useRef, useState} from 'react';

const ThreeDBuildings = () => {
    const buildingsContainerRef = useRef(null);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [zoom, setZoom] = useState(5);

    return(
        <div>
            <div className="buildings_container" ref={buildingsContainerRef}/>
        </div>
    );
}

export default ThreeDBuildings;