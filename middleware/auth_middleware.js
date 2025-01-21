export const authMiddleware = async (fastify, options) => {
  fastify.addHook("onRequest", async (request, reply) => {
    if (request.url.startWith("/api/auth")) {
      return;
    }
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
};
