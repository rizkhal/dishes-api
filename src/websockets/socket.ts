import WebSocket from "ws";

const socket = new WebSocket.Server({
  noServer: true,
  path: "/sockets",
});

export default socket;
