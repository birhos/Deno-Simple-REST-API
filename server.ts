import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./src/routes/routes.ts";

const port = 3000;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Sunucu ${port} port'unda çalışıyor`);
await app.listen({ port });

/*
  deno run --allow-net server.ts
  
  http://localhost:3000/api/v1/posts (GET)
  http://localhost:3000/api/v1/posts/9a09807f-5967-4a9e-8c1d-3af689d2f156 (GET)
*/
