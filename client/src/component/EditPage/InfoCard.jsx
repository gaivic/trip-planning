import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    IconButton
} from "@material-tailwind/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Rating } from 'flowbite-react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { IoMdClose } from "react-icons/io";






export default function InfoCard({ name, rating, photos, placeId, onClose, addTripToSchedule, active }) {

    const swiperRef = useRef(null);
    const [roundedRating, setRoundedRating] = useState(Math.round(rating));

    // to let the new location photo start from first
    useEffect(() => {
        const rounded = Math.round(rating);
        setRoundedRating(rounded);
        console.log(roundedRating);
    }, [name]);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(0);
        }
    }, [photos]);




    const firstPhoto = photos && photos.length > 0 ? photos[0].getUrl() : '';
    const secondPhoto = photos && photos.length > 1 ? photos[1].getUrl() : '';
    const thirdPhoto = photos && photos.length > 2 ? photos[2].getUrl() : '';
    const forthPhoto = photos && photos.length > 3 ? photos[3].getUrl() : '';



    console.log(firstPhoto, secondPhoto, thirdPhoto)


    return (
        <Card className="w-72 overflow-hidden rounded-none">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
            >
                <div className='relative'>
                    <Swiper navigation modules={[Navigation]} onSwiper={(swiper) => (swiperRef.current = swiper)} >
                        {firstPhoto && <SwiperSlide>
                            <img
                                src={firstPhoto}
                                alt="First Photo"
                                className="w-full h-auto aspect-[3/2] object-cover"
                            />
                        </SwiperSlide>}
                        {secondPhoto && <SwiperSlide>
                            <img
                                src={secondPhoto}
                                alt="Second Photo"
                                className="w-full h-auto aspect-[3/2] object-cover"
                            />
                        </SwiperSlide>}
                        {thirdPhoto && <SwiperSlide>
                            <img
                                src={thirdPhoto}
                                alt="Third Photo"
                                className="w-full h-auto aspect-[3/2] object-cover"
                            />
                        </SwiperSlide>}
                        {forthPhoto && <SwiperSlide>
                            <img
                                src={forthPhoto}
                                alt="Third Photo"
                                className="w-full h-auto aspect-[3/2] object-cover"
                            />
                        </SwiperSlide>}
                    </Swiper>
                    <div className="absolute top-2 left-2 text-white hover:text-gray-700 z-10 text-2xl font-bold cursor-pointer" onClick={onClose} >
                        <IoMdClose />
                    </div>

                </div>
                {/* {firstPhotoUrl && <img src={firstPhotoUrl} alt="First Photo" className="w-full h-auto aspect-[3/2] object-cover" />} */}
            </CardHeader>
            <CardBody className='mb-0'>
                <Typography variant="h4" color="blue-gray" className="text-base m-0 font-bold">
                    {name}

                    <div className="mt-1 font-normal text-sm flex items-center">
                        <Rating size="md">
                            <Rating.Star className='text-yellow-600 ' />
                            <p className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                                {rating}
                            </p>
                            <a
                                href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
                                className="text-blue-500 hover:text-blue-700 underline cursor-pointer font-normal text-sm ml-8"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View on Google Maps
                            </a>
                        </Rating>
                    </div>


                    {/* Buttons */}
                    <Button size="sm" onClick={() => addTripToSchedule(active - 1, placeId)} className='w-full mt-3'>Add to day {active}</Button>
                </Typography>
            </CardBody>

        </Card>
    );
}