import dotenv from "dotenv";
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { sendEmail } from './mailgun.js';

dotenv.config();

const fastify = Fastify({
  logger: true
})

fastify.register(import("@fastify/formbody"));
fastify.register(cors);

fastify.post('/sendEmail', async (request, reply) => {
  try {
    const { to, subject, text } = request.body;
    const res = await sendEmail(to, subject, text);
    reply.send({ success: res });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error });
  }
});

fastify.listen({
  port: 4000
}, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server listening on ${address}`);
});
