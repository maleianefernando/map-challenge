import { useEffect, useState } from "react";
import type { user } from "./types/types";
import socket from "./utils/socket";
import MapView from "./components/map-view";

function App() {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // listen for updated list
    socket.on("usersUpdate", (data) => {
      setUsers(data);
    });

    //Ask for location
    navigator.geolocation.watchPosition(
      (position) => {
        socket.emit("updateLocation", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Erro de localização:", error);
      },
      { enableHighAccuracy: true },
    );

    return () => {
      socket.off("usersUpdate");
    };
  }, []);

  useEffect(() => {
    socket.on("usersUpdate", (data) => {
      if (data.length == users.length) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    });
  }, [users]);

  return (
    <div className="min-w-screen min-h-screen p-6">
      {loading ? (
        <>Aguarde ...</>
      ) : (
        <>
          <div className="border border-slate-600 rounded-md space-y-4">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="border-b border-slate-600 p-4 last:border-0 rounded-md"
              >
                <p>
                  <strong>ID:</strong> {`Utilizador ${index + 1}`}
                </p>
                <p>
                  <strong>Latitude:</strong> {user.location.latitude}
                </p>
                <p>
                  <strong>Longitude:</strong> {user.location.longitude}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      <MapView users={users} />
    </div>
  );
}

export default App;
