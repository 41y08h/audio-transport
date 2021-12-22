import { io } from "socket.io-client";

declare global {
  interface Window {
    socket: any;
  }
}

const socket = io();
window.socket = socket;

export default socket;
