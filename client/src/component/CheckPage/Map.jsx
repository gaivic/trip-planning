import React, { useState, useRef, useEffect } from 'react';
import {
    GoogleMap,
    MarkerF,
    InfoWindowF,
    useLoadScript,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api';
import { Input, Button } from "@material-tailwind/react";
import { HiSearch } from "react-icons/hi";

const mapContainerStyle = {
    // width: '100%',
    height: '100vh'
};


let directionsService;


const Map = ({ active, schedule }) => {


    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();

    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const originRef = useRef();
    const destiantionRef = useRef();


    const markers = [
        {
            address: "Address1",
            lat: 25.012622,
            lng: 121.544055
        },
        {
            address: "Address2",
            lat: 26.112622,
            lng: 122.644055
        },
        {
            address: "Address3",
            lat: 25.212622,
            lng: 121.744055
        },
    ];

    // the map onLoad will fit bound in day1 places  
    const onMapLoad = (map) => {
        setMapRef(map);
        const bounds = new window.google.maps.LatLngBounds();

        const service = new window.google.maps.places.PlacesService(map);

        const day1Places = schedule[0].map((place) => place);
        day1Places.forEach((placeId) => {
            service.getDetails({
                placeId: placeId
            }, (result, status) => {
                if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                    alert(status);
                    return;
                }

                bounds.extend(result.geometry.location);
                map.fitBounds(bounds);
            });
        });
    };


    const handleMarkerClick = (id, lat, lng, address) => {
        mapRef?.setZoom(15);
        mapRef?.panTo({ lat, lng });
        setInfoWindowData({ id, address });
        setIsOpen(true);
    };

    //function that is calling the directions service

    async function calculateRoute() {
        const directionsService = new window.google.maps.DirectionsService();

        const activeSchedule = schedule[active - 1];

        const origin = activeSchedule[0];
        const destination = activeSchedule[activeSchedule.length - 1];
        const waypoints = activeSchedule.slice(1, -1).map((place) => ({
            location: { placeId: place },
            stopover: true,
        }));

        console.log(origin, destination, waypoints);
        // call getDirection function
        getDirection(origin, destination, waypoints);
    }


    const getDirection = (originPlaceId, destinationPlaceId, waypoints) => {
        const directionsService = new window.google.maps.DirectionsService();

        const origin = { placeId: originPlaceId };
        const destination = { placeId: destinationPlaceId };

        if (waypoints.length >= 1) {
            directionsService.route(
                {
                    origin,
                    destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                    waypoints,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        //changing the state of directions to the result of direction service
                        setDirectionsResponse(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        } else {
            directionsService.route(
                {
                    origin,
                    destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        //changing the state of directions to the result of direction service
                        setDirectionsResponse(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    };

    useEffect(() => {
        calculateRoute()
    }, [active])

    return (
        <div >
            <div className="relative">
                {/* <div className="grid grid-cols-3 gap-4">
                        <div className="z-10 my-2">
                            <Autocomplete>

                                <input
                                    label="Search"
                                    icon={<i className="fas fa-search" />}
                                    className='bg-white'
                                    ref={originRef}
                                />
                            </Autocomplete>

                        </div>
                        <div className="z-10  my-2">
                            <Autocomplete>
                                <input
                                    label="Search"
                                    icon={<i className="fas fa-search" />}
                                    className='bg-white'
                                    ref={destiantionRef}
                                />
                            </Autocomplete>
                        </div>
                        <div className="z-10  my-2">
                            <Button
                                type="submit"
                                name="submit"
                                onClick={calculateRoute}
                            >
                                Search
                            </Button>

                        </div>
                    </div> */}

                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    onLoad={(map) => onMapLoad(map)}
                    onClick={() => setIsOpen(false)}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    className="z-0"
                >
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}

                    {/* {markers.map(({ address, lat, lng }, ind) => (
                            <MarkerF
                                key={ind}
                                position={{ lat, lng }}
                                onClick={() => {
                                    handleMarkerClick(ind, lat, lng, address);
                                }}
                            >
                                {isOpen && infoWindowData?.id === ind && (
                                    <InfoWindowF
                                        onCloseClick={() => {
                                            setIsOpen(false);
                                        }}
                                    >
                                        <h3>{infoWindowData.address}</h3>
                                    </InfoWindowF>
                                )}
                            </MarkerF>
                        ))} */}
                </GoogleMap>
            </div>
        </div>
    );
};

export default Map;


