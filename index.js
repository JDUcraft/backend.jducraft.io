'use strict';

const Hapi=require('hapi');

const server=Hapi.server({
	    host:'localhost',
	    port:4000
});

server.route({
	method:'GET',
	path:'/',
	handler: function (request, h) {
		return {message: "Welcome to JDUCraft's Backend :)"};
	}
});

async function start() {
	try {
		await server.start();
	}
	catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log('Server running at:', server.info.uri);
};

start();
