import Hapi from 'hapi';
import { Strategy as GitHubStrategy } from 'passport-github';
import HapiPassport from 'hapi-passport';

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 4000,
});

const url = 'https://backend.jducraft.io/';

const githubLogin = HapiPassport(new GitHubStrategy(
    {
        clientID: '53b50b618e51c0a31333',
        clientSecret: '5b5e7f147555b3d596b118350bd64dbc7b8ebc64',
        callbackURL: `${url}hotspot-analyzer/auth`,
        scope: ['repo'],
    },
    (accessToken, refreshToken, profile, verified) =>
        (err, user) =>
            verified(err, user),
), { scope: 'repo' });


server.route({
    method: 'GET',
    path: '/hotspot-analyzer/auth',
    handler: githubLogin({
        successRedirect: `${url}hotspot-analyzer/auth/success`,
        errorRedirect: `${url}hotspot-analyzer/auth/error`,
        failRedirect: `${url}hotspot-analyzer/auth/failed`,
    }),
});

server.route({
    method: 'GET',
    path: '/',
    handler(request, reply) {
        reply({
            message: 'Welcome to JDUCraft\'s Backend :)',
            availablePath: [
                { path: '/hotspot-analyzer', description: 'Backend for the hotspot analyzer. You can check out my github: JDUcraft' },
            ],
        });
    },
});

server.route({
    method: 'POST',
    path: '/hotspot-analyzer/event',
    handler(request, reply) {
        reply({
            message: 'OK',
        });
    },
});

server.route({
    method: 'GET',
    path: '/hotspot-analyzer',
    handler(request, reply) {
        reply({
            availablePaths: [
                { path: '/auth', description: 'Authenticate through Github OAuth2 Strategy' },
            ],
        });
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
