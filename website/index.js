import { server } from "./server/index.js";


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});