import { useEffect, useState } from "react";
import type { user } from "./types/types";
import socket from "./utils/socket";
import MapView from "./components/map-view";

function App() {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    // listen for updated list
    socket.on("usersUpdate", (data) => {
      setUsers(data);
      setLoading(true);
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
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Permissão de localização não concedida.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError("Localização indisponível.");
        } else if (error.code === error.TIMEOUT) {
          setLocationError("Tempo de espera excedido.");
        }
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
      }
    });
  }, [users]);

  return (
    <div className="min-w-screen min-h-screen p-6">
      <div className="border-b border-blue-300 bg-blue-100 p-4 last:border-0 rounded-md mb-6">
        <span className="text-slate-500 text-sm"> A demora no processamento dos resultados e causada pela latência do servidor que fica adormecido após registar inatividade. Podendo levar até 60 segundos para reestabelecer a conexão com o servidor.</span>
      </div>
      <>
        <div className="border border-blue-300 rounded-md space-y-4 mb-6 p-4">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="border border-blue-100 bg-sky-50 p-4 rounded-md m-1"
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

          {loading && (
            <div className="border-b border-slate-600 p-4 last:border-0 rounded-md">
              <span className="animate-ping text-slate-500">
                {" "}
                A procurar ...{" "}
              </span>
            </div>
          )}

          {locationError.length > 0 && (
            <div className="border-b border-red-300 bg-red-100 p-4 last:border-0 rounded-md mt-6">
              <span className="text-slate-500"> {locationError} </span>
            </div>
          )}
        </div>
      </>
      <MapView users={users} />
    </div>
  );
}

export default App;
