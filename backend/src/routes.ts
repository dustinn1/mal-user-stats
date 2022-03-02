import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getStats } from "./stats";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("*", async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(404).send("Not Found");
  });

  const generateBodyJsonschema = {
    body: {
      type: "object",
      required: ["username"],
      properties: {
        username: { type: "string" },
      },
    },
  };

  fastify.post(
    "/generate",
    { schema: generateBodyJsonschema },
    async (
      request: FastifyRequest<{
        Body: { username: string };
      }>,
      reply: FastifyReply
    ) => {
      return reply.send(await getStats(request.body.username, "anime"));
    }
  );
}
