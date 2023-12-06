// socket.ts

io.on("connection", (socket: any) => {
  console.log("A user connected", socket.id);
  io.emit("hello", "Hello from server");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
