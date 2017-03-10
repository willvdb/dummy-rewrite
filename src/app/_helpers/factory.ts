import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

const createFactory = function(backend: MockBackend, options: BaseRequestOptions) {
	// configure fake backend
	backend.connections.subscribe((connection: MockConnection) => {
		let users = {
			'test': {
				username: 'test',
				password: 'test'
			},
			'dev': {
				username: 'dev',
				password: 'admin'
			}
		}

		let products = [
			{
				id: 1,
				internalName: 'garcinia'
			},
			{
				id: 2,
				internalName: 'skin-stuff'
			},
			{
				id: 3,
				internalName: 'eye-stuff'
			}
		]

		// wrap in timeout to simulate server api call
		setTimeout(() => {

			// fake authenticate api end point
			if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
				// get parameters from post request
				let params = JSON.parse(connection.request.getBody());

				// check if user exists
				if (users[params.username]){
					let testUser = users[params.username]
					//check if params are correct
					if (params.username === testUser.username && params.password === testUser.password) {
						connection.mockRespond(new Response(
							new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
						));
					} else {
						connection.mockRespond(new Response(
							new ResponseOptions({ status: 200 })
						));
					}
				} else {
					connection.mockRespond(new Response(
						new ResponseOptions({ status: 200 })
					));
				}
			}

			// fake users api end point
			if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
				// check for fake auth token in header and return test users if valid, this security is implemented server side
				// in a real application
				if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
					connection.mockRespond(new Response(
						new ResponseOptions({ status: 200, body: Object.keys(users).map(function (key) { return users[key]; }) })
					));
				} else {
					// return 401 not authorised if token is null or invalid
					connection.mockRespond(new Response(
						new ResponseOptions({ status: 401 })
					));
				}
			}

			// fake products api end point
			if (connection.request.url.endsWith('/api/products') && connection.request.method === RequestMethod.Get) {
				// check for fake auth token in header and return test users if valid, this security is implemented server side
				// in a real application
				if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
					connection.mockRespond(new Response(
						new ResponseOptions({ status: 200, body: products })
					));
				} else {
					// return 401 not authorised if token is null or invalid
					connection.mockRespond(new Response(
						new ResponseOptions({ status: 401 })
					));
				}
			}

		}, 500);

	});

	return new Http(backend, options);
}

export const TestFactory = createFactory;
