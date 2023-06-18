import React, { useEffect } from 'react'
import { Button, List, ListItem, Card } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import TripInfo from './TripInfo'
import PlaceList from './PlaceList';
import { updateSchedule } from '../../api/posts';


const TripPlan = ({ active, onDayClick, post ,schedule}) => {

    const handleDayClick = (day) => {
        onDayClick(day);
        // Additional logic if needed
    };

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: active === index ? "blue" : "blue-gray",
        onClick: () => handleDayClick(index),
        className: "rounded-2xl w-1/4 p-4",
    });


    const next = () => {
        if (active === schedule.length) return;
        handleDayClick(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        handleDayClick(active - 1);
    };



    return (
        <div>
            <div className='relative'>
                <div className="absolute top-0 right-0 z-10 m-4">
                    <Button size='md' color="cyan" onClick={() => { updateSchedule({post, schedule})}}>
                        Save
                    </Button>
                </div>
                <TripInfo post={post}/>
            </div>
            <div className='p-4'>
                <div className="flex items-center gap-3 overflow-x-auto">
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-2 rounded-full"
                        onClick={prev}
                        disabled={active === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                    </Button>
                    <div className="flex items-center gap-3">
                        {schedule.map((day, index) => (
                            <Button {...getItemProps(index + 1)} key={index}>
                                Day {index + 1}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-2 rounded-full"
                        onClick={next}
                        disabled={active === schedule.length}
                    >
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>
                <PlaceList schedule={schedule} activeDay={active} />
            </div>
        </div>
    );
}

export default TripPlan;



