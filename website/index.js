import { server } from "./server/index.js";

server.listen(parseInt(process.env["IBODY_HTTP_PORT"]), () => {
  const address = server.address();
  console.log(`server running at http://localhost:${address.port}`);
});