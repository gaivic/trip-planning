import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
} from "@material-tailwind/react";
// import { GoogleMap, MarkerF, InfoWindowF, useLoadScript, Marker } from '@react-google-maps/api';
import { TrashIcon } from "@heroicons/react/24/solid";


export default function PlacesList({ schedule, activeDay, deletePlace }) {
    const [placeNames, setPlaceNames] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleDeletePlace = (index) => {
        deletePlace(activeDay, index);
    };

    useEffect(() => {
        const getPlaceNames = async () => {
            const names = [];
            for (const place of schedule[activeDay - 1]) {
                const name = await fetchPlaceName(place);
                names.push(name);
            }
            setPlaceNames(names);
        };

        getPlaceNames();
    }, [activeDay, schedule]);

    const fetchPlaceName = (placeId) => {
        return new Promise((resolve, reject) => {
            const service = new window.google.maps.places.PlacesService(document.createElement("div"));
            const request = {
                placeId: placeId,
                fields: ["name"],
            };

            service.getDetails(request, (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve(place.name);
                } else {
                    reject();
                }
            });
        });
    };

    return (
        <Card className="w-full shadow-none">
            <List>
                {placeNames.length > 0 ? (
                placeNames.map((placeName, index) => (
                    <ListItem
                    key={index}
                    className="py-4 pr-1 pl-4 bg-cyan-100 hover:bg-cyan-200"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    >
                    <div className='text-lg'> {placeName}</div>
                    {hoveredIndex === index && (
                        <ListItemSuffix>
                        <IconButton
                            color="gray"
                            onClick={() => handleDeletePlace(index)}
                            ripple="dark"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </IconButton>
                        </ListItemSuffix>
                    )}
                    </ListItem>
                ))
                ) : (
                <ListItem className="py-4 pr-1 pl-4">
                    <div className="text-lg text-gray-500 text-center">Add some places to this day!</div>
                </ListItem>
                )}
            </List>
        </Card>
    );
}
