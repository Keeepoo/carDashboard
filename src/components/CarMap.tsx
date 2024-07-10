import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Car {
    id: number;
    name: string;
    model: string;
    latitude: number;
    longitude: number;
}

interface CarMapProps {
    cars: Car[];
}

const CarMap: React.FC<CarMapProps> = ({ cars }) => {
    const position: [number, number] = [55.751244, 37.618423]; 

    return (
        <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {cars.map(car => (
                <Marker key={car.id} position={[car.latitude, car.longitude]}>
                    <Popup>
                        {car.name} {car.model}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default CarMap;

