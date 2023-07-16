import app from "./src/app";
import websockets from "./src/websockets";

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

const server = app.listen(port, () => {
  if (process.send) {
    console.log(`⚡️[app]: Server is running at http://${host}:${port}`);
  } else {
    console.error("Not working att all");
  }
});

const websocketServer = websockets();

server.on("upgrade", (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (websocket) => {
    websocketServer.emit("connection", websocket, request);
  });
});
