"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const websockets_1 = __importDefault(require("./src/websockets"));
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";
const server = app_1.default.listen(port, () => {
    if (process.send) {
        console.log(`⚡️[app]: Server is running at http://${host}:${port}`);
    }
    else {
        console.error("Not working att all");
    }
});
const websocketServer = (0, websockets_1.default)();
server.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
        websocketServer.emit("connection", websocket, request);
    });
});
