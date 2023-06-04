import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const SimpleMap = ({ center }) => {

    // console.log(center);
    return (
        <MapContainer
            center={L.latLng(center) || [51, -0.09]}
            zoom={center ? 4 : 1}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            {center && <Marker position={L.latLng(center)} />}
        </MapContainer>
    );
};

export default SimpleMap;