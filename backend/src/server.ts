import Fastify from "fastify";
import routes from "./routes";

const fastify = Fastify();

fastify.register(routes);

fastify.listen(process.env["PORT"] || 8000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
