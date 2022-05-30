import Fastify from "fastify";
import routes from "./routes";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: ["https://mal-user-stats.vercel.app", "http://localhost:3000"],
});
fastify.register(routes);

fastify.listen(process.env["PORT"] || 8000, "0.0.0.0", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is now listening on ${address}`);
});
