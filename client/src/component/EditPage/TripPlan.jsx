import React, { useEffect } from 'react'
import { Button, List, ListItem, Card } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import TripInfo from './TripInfo'
import PlaceList from './PlaceList';
import { updateSchedule, updatePublished } from '../../api/posts';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdUpload } from "react-icons/md";


const TripPlan = ({ active, onDayClick, post, schedule, deletePlace, dragUpdateSchedule }) => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/'); // Replace '/home' with the actual URL of your home page
    };

    const handleDayClick = (day) => {
        onDayClick(day);
        // Additional logic if needed
    };

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: active === index ? "cyan" : "blue-gray",
        onClick: () => handleDayClick(index),
        className: "rounded-2xl my-2",
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
                <div className="absolute top-0 left-0 z-10 m-4">
                    <button className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md opacity-90"
                        onClick={() => {
                            updateSchedule({ post, schedule });
                            goToHomePage();
                        }}>
                        <IoMdArrowRoundBack className='h-4 w-5 m-0' />
                        Home
                    </button>
                </div>
                <div className="absolute top-0 right-0 z-10 m-4">
                    <button className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md opacity-90"
                        onClick={() => {
                            updatePublished({ post, published: true });
                        }}>
                        <MdUpload className='text-md inline-block' />                        
                        <span className="ml-1">publish</span>
                    </button>
                </div>
                <div className="absolute bottom-7 right-7 z-10">
                    <Button size='sm'  className='bg-green-300' onClick={() => { updateSchedule({ post, schedule }) }}>
                        save
                    </Button>
                </div>
                <div className="relative">
                    <TripInfo post={post} />
                </div>
            </div>

            <div className='p-4'>
                <div className="flex items-center justify-between gap-3 border border-gray-400 rounded-full w-full">
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center justify-center gap-2 rounded-full"
                        onClick={prev}
                        disabled={active === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                    </Button>
                    <div className="flex items-center gap-3 overflow-x-auto ">
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
                <PlaceList schedule={schedule} activeDay={active} dragUpdateSchedule={dragUpdateSchedule} deletePlace={deletePlace} />
            </div>
        </div>
    );
}

export default TripPlan;



