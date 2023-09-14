"use strict";

const sendEmail = require("../../mailgun.js");

module.exports = async function (fastify, _opts) {
  fastify.post("/", async function (request, reply) {
    try {
      const { to, subject, text } = request.body;
      const res = await sendEmail(to, subject, text);
      reply.send({ success: res });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error });
    }
  });
};
