import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { user } from "../types/types";

function MapView({ users }: { users: user[] }) {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "50vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {users.map((user) =>
        user.location.latitude && user.location.longitude ? (
          <Marker
            key={user.id}
            position={[user.location.latitude, user.location.longitude]}
          >
            <Popup>
              {user.location.latitude}, {user.location.longitude}
            </Popup>
          </Marker>
        ) : null,
      )}
    </MapContainer>
  );
}

export default MapView;
