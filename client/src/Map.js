import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Пример данных ресурсов
const resources = [
    { id: 1, name: 'Resource 1', lat: 0, lng: 0 }
];


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
iconRetinaUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
});

var MAX_ZOOM = 6;
var PIC_WIDTH = 15000;
var PIC_HEIGHT = 10000;
var scale = 1 / Math.pow(2, MAX_ZOOM);

var MySimple = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(scale, PIC_WIDTH * scale / 2,
    -scale, PIC_HEIGHT * scale / 2)
});

const Map = () => {
return (
    <MapContainer
        crs={MySimple}
        center={[0, 0]}
        zoom={3}
        minZoom={0}
        maxZoom={6}
        style={{ height: '100vh', width: '100%', backgroundColor: "#BEBEBE" }}
        bounds={[[-5000, -7500], [5000, 7500]]}
    >
        <TileLayer
            url="http://localhost/static/{z}/{x}/{y}.jpg"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            noWrap={true}
        />
        {resources.map(resource => (
            <Marker key={resource.id} position={[resource.lat, resource.lng]}>
                <Popup>{resource.name}</Popup>
            </Marker>
        ))}
    </MapContainer>
);
}

export default Map;
