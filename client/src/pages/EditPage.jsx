// import React, { useState } from 'react'
import TripPlan from '../component/EditPage/TripPlan';
import Map from '../component/EditPage/Map';

import React, { useState, useEffect } from 'react';
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


function EditPage() {
    const location = useLocation();
    const { post } = location.state; // Accessing the passed state data
    const [sizes, setSizes] = useState(['43%', '57%']);
    const [active, setActive] = useState(1); // Initialize with a default value
    const [schedule, setSchedule] = useState(post.schedule);
    console.log(post);

    useEffect(() => {
        console.log(schedule);
    }, [schedule])

    const addTripToSchedule = (index, placeId) => {
        setSchedule((schedule) => {
            const updatedSchedule = [...schedule];
            updatedSchedule[index].push(placeId);
            return updatedSchedule;
        });
    };

    const deletePlace = (day, index) => {
        setSchedule((prevSchedule) => {
          const updatedSchedule = [...prevSchedule];
          updatedSchedule[day - 1].splice(index, 1);
          return updatedSchedule;
        });
      };

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
                    <TripPlan active={active} onDayClick={handleDayClick} deletePlace={deletePlace} post={post} schedule={schedule}/>
                </Pane>
                <Pane>
                    <Map active={active} schedule={schedule} addTripToSchedule={addTripToSchedule} country={post.location}/>
                </Pane>
            </SplitPane>
        </div>
    );
}

export default EditPage;


