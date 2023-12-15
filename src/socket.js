"use strict";
// socket.ts
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});
