import { io } from "socket.io-client";

const socket = io("https://map-challenge-websocket-server.onrender.com");

export default socket;