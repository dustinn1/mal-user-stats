import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { readFileSync } from "fs";
import { getStats } from "./stats";
import { fileExists } from "./utils/fileExists";

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
    "/generate/new",
    { schema: generateBodyJsonschema },
    async (
      request: FastifyRequest<{
        Body: { username: string };
      }>,
      reply: FastifyReply
    ) => {
      reply.send({ code: 200, message: "generating" });
      await getStats(request.body.username);
    }
  );

  fastify.post(
    "/generate/status",
    { schema: generateBodyJsonschema },
    async (
      request: FastifyRequest<{
        Body: { username: string };
      }>,
      reply: FastifyReply
    ) => {
      if (
        await fileExists(
          "src/temp_data/" + request.body.username + "_anime.json"
        )
      ) {
        reply.send({ code: 200, message: "stats has been generated" });
      } else {
        reply.send({ code: 404, message: "stats has not been generated" });
      }
    }
  );

  fastify.post(
    "/generate/fetch",
    { schema: generateBodyJsonschema },
    async (
      request: FastifyRequest<{
        Body: { username: string; type: string };
      }>,
      reply: FastifyReply
    ) => {
      if (
        await fileExists(
          "src/temp_data/" + request.body.username + "_anime.json"
        )
      ) {
        reply.send(
          JSON.parse(
            readFileSync(
              "src/temp_data/" + request.body.username + "_anime.json",
              "utf-8"
            )
          )
        );
      } else {
        reply.send("stats has not been generated");
      }
    }
  );
}
