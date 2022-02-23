import Fastify from "fastify";
const fastify =
  Fastify(/* {
  logger: true,
} */);

fastify.get("/", function (_request, reply) {
  reply.send({ hello: "world" });
});

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
