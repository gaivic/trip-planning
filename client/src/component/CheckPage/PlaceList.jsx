import React, { useState, useEffect } from 'react';
import {
    Chip,
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
} from "@material-tailwind/react";
// import { GoogleMap, MarkerF, InfoWindowF, useLoadScript, Marker } from '@react-google-maps/api';
import { TrashIcon } from "@heroicons/react/24/solid";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



export default function PlacesList({ schedule, activeDay, dragUpdateSchedule, deletePlace }) {
    const [placeNames, setPlaceNames] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleDeletePlace = (index) => {
        deletePlace(activeDay, index);
    };

    useEffect(() => {
        const getPlaceNames = async () => {
            const names = [];
            for (const place of schedule[activeDay - 1]) {
                const placeData = await fetchPlaceName(place);
                names.push(placeData);
            }
            setPlaceNames(names);
        };
        console.log()
        getPlaceNames(placeNames);
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
                    resolve({ id: placeId, placename: place.name });
                } else {
                    reject();
                }
            });
        });
    };

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(placeNames);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setPlaceNames(items);

        console.log(items);
        console.log(activeDay);

        dragUpdateSchedule(activeDay, items);
    }

    return (
        <Card className="w-full shadow-none">
                <div className="h-128 overflow-y-auto">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="place">
                            {(provided) => (
                                <List {...provided.droppableProps} ref={provided.innerRef} className='gap-y-4'>
                                    {placeNames.map((place, index) => (
                                        <Draggable key={place.id} draggableId={place.id} index={index}>
                                            {(provided) => (
                                                <ListItem
                                                    className="py-4 pr-1 pl-4 bg-cyan-50 hover:bg-cyan-200 rounded-md "	                                                {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    onMouseEnter={() => setHoveredIndex(index)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                >
                                                    <div className="text-lg flex items-center gap-4">
                                                        <Chip size="lg" value={String.fromCharCode(65 + index)} className='rounded-full bg-cyan-400' />
                                                        <span>{place.placename}</span>
                                                    </div>
                                                </ListItem>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </List>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
        </Card>
    );
}
