// import React, { useState } from 'react'
import TripPlan from '../component/CheckPage/TripPlan';
import Map from '../component/CheckPage/Map';


import React, { useState } from 'react';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { useLocation } from 'react-router-dom';


function style(color) {
    return {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color
    };
}


function CheckPage() {
    const location = useLocation();
    const {post} = location.state; // Accessing the passed state data
    const [sizes, setSizes] = useState(['43%', '57%']);
    const [active, setActive] = useState(1); // Initialize with a default value


    const handleDayClick = (day) => {
        setActive(day);
        console.log(post);
    };

    return (
        <div style={{ height: '100vh' }}>
            <SplitPane
                sizes={sizes}
                onChange={setSizes}
                resizerSize={4}
                sashRender={() => (
                    <SashContent style={{ backgroundColor: "rgba(143,143,143)" }} />
                )}
            >
                <Pane minSize='35%' maxSize='54%'>
                    <TripPlan active={active} onDayClick={handleDayClick} post={post} />
                </Pane>
                <Pane>
                    <Map active={active} schedule={post.schedule} />
                </Pane>
            </SplitPane>
        </div>
    );
}

export default CheckPage;


