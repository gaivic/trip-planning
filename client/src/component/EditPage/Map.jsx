import React, { useState, useRef, useEffect } from 'react';
import {
    GoogleMap,
    MarkerF,
    InfoWindowF,
    useLoadScript,
    Autocomplete,
    DirectionsRenderer,
    InfoBoxF
} from '@react-google-maps/api';
import { Input, Button, } from "@material-tailwind/react";

import { HiSearch } from "react-icons/hi";
import axios from 'axios';
import InfoCard from './InfoCard';


const mapContainerStyle = {
    // width: '100%',
    height: '100vh'
};


let directionsService;


const Map = ({ active, schedule, addTripToSchedule, country }) => {


    const [mapRef, setMapRef] = useState();

    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);

    const [markerPosition, setMarkerPosition] = useState(null);

    const [placeData, setPlaceData] = useState(null);


    // for autocomplete	
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const autocompleteRef = useRef(null);


    // After click the place, get lat,lng,placeid, use this data to focus on the place and open infocard	
    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place && place.place_id && place.geometry && place.geometry.location) {
                const { place_id, geometry: { location } } = place;
                console.log(place_id);
                console.log(location.lat());
                console.log(location.lng());
                if (mapRef) {
                    const { lat, lng } = location;
                    mapRef.panTo({ lat: lat(), lng: lng() });
                    fetchPlaceDetails(place_id)
                        .then((data) => {
                            setPlaceData({ ...data, placeId: place_id });
                        })
                        .catch((error) => {
                            console.error('Error fetching place details:', error);
                        });
                    setMarkerPosition({
                        lat: location.lat(),
                        lng: location.lng(),
                    });

                }
            }
        }
    };


    const handleInfoBoxClose = () => {
        // Handle the close event
        console.log('InfoBox closed!');

        // Perform additional actions, such as updating state or resetting values
        setMarkerPosition(null); // Clear the marker position when InfoBox is closed
    };


    // After click on poi, fetch a place detail 
    const fetchPlaceDetails = (placeId) => {
        return new Promise((resolve, reject) => {
            const service = new window.google.maps.places.PlacesService(document.createElement("div"));
            const request = {
                placeId: placeId,
                fields: ['name', 'rating', 'photos'],
            };

            service.getDetails(request, (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve({
                        name: place.name,
                        rating: place.rating,
                        photos: place.photos,
                    });
                    console.log(place);
                } else {
                    reject(new Error('Error fetching place details'));
                }
            });
        });
    };

    // add the click event for clicking a poi, and prevent default infowindow
    // the map onLoad will fit bound in day1 places  
    const onMapLoad = (map) => {
        setMapRef(map);
        map.addListener('click', function (event) {
            // If the event is a POI
            if (event.placeId) {

                // Call event.stop() on the event to prevent the default info window from showing.
                event.stop();
                map.panTo(event.latLng);

                // do any other stuff you want to do
                console.log('You clicked on place:' + event.placeId + ', location: ' + event.latLng);

                fetchPlaceDetails(event.placeId)
                    .then((data) => {
                        setPlaceData({ ...data, placeId: event.placeId });
                    })
                    .catch((error) => {
                        console.error('Error fetching place details:', error);
                    });
                // setMarkerPosition for showing custom window
                setMarkerPosition({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                });
                // console.log(placeData);
            } else {
                // setPlaceData(null);
                // setMarkerPosition(null);
            }
        })


        // make map view bound
        const bounds = new window.google.maps.LatLngBounds();
        const service = new window.google.maps.places.PlacesService(map);

        if (schedule[0].length > 0) {
            const day1Places = schedule[0].map((place) => place);
            day1Places.forEach((placeId) => {
                service.getDetails(
                    {
                        placeId: placeId,
                    },
                    (result, status) => {
                        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                            alert(status);
                            return;
                        }

                        bounds.extend(result.geometry.location);
                        map.fitBounds(bounds);
                    }
                );
            });
        } else if (country) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: country }, (results, status) => {
                if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
                    const location = results[0].geometry.location;
                    bounds.extend(location);
                    map.fitBounds(bounds);
                    const maxZoom = 6; // Set your desired maximum zoom level
                    const zoom = map.getZoom();
                    if (zoom > maxZoom) {
                        map.setZoom(maxZoom);
                    }
                } else {
                    console.log('Geocoding failed:', status);
                }
            });
        }
    };

    const handleInfoCardClose = () => {
        setMarkerPosition(null);
    };

    //function that is calling the directions service

    async function calculateRoute() {
        const directionsService = new window.google.maps.DirectionsService();

        const activeSchedule = schedule[active - 1];
        if (activeSchedule.length === 0) {
            setDirectionsResponse(null); // Clear the directions response
            return;
        }
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
        calculateRoute();
        setMarkerPosition(null);
        console.log('schedule has change, should get a new route!')
    }, [active, schedule])

    return (
        <div >
            <div className="relative">

                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    onLoad={(map) => onMapLoad(map)}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        disableDoubleClickZoom: true
                    }}
                    className="z-0"
                >
                    <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={() => handlePlaceChanged()}>
                        <div className="relative">
                            <input
                                className="bg-blue-gray-50 border-2 border-gray-400 border-spacing-1 w-3/5 h-12 px-4 py-2 rounded-full shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 absolute left-1/2 -translate-x-1/2 top-8 placeholder-black placeholder-opacity-50"
                                placeholder="Search and add loaction"
                            />
                        </div>
                    </Autocomplete>
                    {markerPosition && (
                        <MarkerF
                            position={markerPosition}
                            onClick={() => console.log('Marker clicked!')}
                        >
                            {placeData && <InfoBoxF
                                position={markerPosition}
                                options={{
                                    closeBoxURL: "",
                                    enableEventPropagation: true,
                                    pixelOffset: new window.google.maps.Size(-140, -390),
                                    disableAutoPan: true,
                                    // closeBoxMargin: "10px 2px 2px 2px",
                                    // isHidden: !showInfoBox,
                                    // visible: showInfoBox,
                                    boxStyle: {
                                        boxShadow: "2px 2px 2px 2px rgb(0, 0, 0, 0.3)", // Add the boxShadow property
                                        borderRadius: "10px", // Add the borderRadius property
                                    }
                                }}

                            >
                                {/* <div className="bg-white p-5 shadow-xl rounded-lg">
                                    Custom InfoBox Content
                                </div> */}
                                <InfoCard {...placeData} onClose={handleInfoBoxClose} addTripToSchedule={addTripToSchedule} active={active} />
                            </InfoBoxF>}
                        </MarkerF>
                    )}
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}

                </GoogleMap>
            </div>
        </div>
    );
};

export default Map;


