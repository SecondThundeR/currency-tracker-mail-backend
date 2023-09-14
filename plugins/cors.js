"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, _opts) {
  fastify.register(require("@fastify/cors"));
});
