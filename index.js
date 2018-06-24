import Hapi from 'hapi';

const server = Hapi.server({
    host: 'localhost',
    port: 4000,
});

server.route({
    method: 'GET',
    path: '/',
    handler() {
        return {
            message: 'Welcome to JDUCraft\'s Backend :)',
            availableRoutes: [
                '/hotspot-analyzer',
            ],
        };
    },
});

server.route({
    method: 'GET',
    path: '/hotspot-analyzer',
    handler() {
        return {
            message: 'Authentication Service',
        };
    },
});

async function start() {
    try {
        await server.start();
    } catch (err) {
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
}

start();
