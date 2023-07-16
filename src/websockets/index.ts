import socket from "./socket";

export default () => {
  socket.on("connection", (connection, request) => {
    connection.on("message", (buffer) => {
      const bufferString = buffer.toString();
      const formatedPayload = JSON.parse(bufferString);

      const response = {
        message: "Hell yeah, we have received your request here 🤩",
        request: formatedPayload,
      };

      connection.send(JSON.stringify(response));
    });

    connection.on("open", () => {
      console.log("Connection opened");
    });

    connection.on("close", () => {
      console.log("Connection closed");
    });

    connection.on("error", () => {
      console.log("Connection error");
    });
  });

  return socket;
};
