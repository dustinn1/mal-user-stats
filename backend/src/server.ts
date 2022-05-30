import Fastify from "fastify";
import routes from "./routes";
import cors from "@fastify/cors";

const fastify = Fastify();

fastify.register(cors, {
  origin: ["https://mal-user-stats.vercel.app", "http://localhost:3000"],
});
fastify.register(routes);

fastify.listen(process.env["PORT"] || 8000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
