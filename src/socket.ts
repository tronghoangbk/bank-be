// socket.ts
import { io } from "./app";

io.on("connection", (socket) => {
  console.log("A user connected");
  io.emit("hello", "Hello from server");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
