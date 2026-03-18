import fastify from 'fastify';

const server = fastify();

server.get('/ping', async (Request, reply) => {
    return { message: 'pong' }
});

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    };
    console.log(`Server listening at ${address}`);
})