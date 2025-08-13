import fastify from 'fastify';
import { taskRoutes } from './routes/tasks.routes';

const server = fastify({ logger: true });


server.register(taskRoutes, { prefix: '/api' });

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();