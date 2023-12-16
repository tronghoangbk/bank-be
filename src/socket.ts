// socket.ts
import { Account } from "./models/account.model";

io.on("connection", (socket: any) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
