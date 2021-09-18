import React, {useRef} from 'react';

const ThreeDBuildings = () => {
    const buildingsContainerRef = useRef(null);

    return(
        <div>
            <div className="buildings_container" ref={buildingsContainerRef}/>
        </div>
    );
}

export default ThreeDBuildings;