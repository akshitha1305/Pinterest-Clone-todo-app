const application = ['application/json', 'multipart/form-data'];
import globalPath from '../swagger/paths';
import globalTags from '../swagger/tags';

export const swaggerUI = {
	swagger: '2.0',
	info: {
		version: '1.0.0',
		title: 'Api services',
		description: 'SPR_API',
		license: {
			name: 'SPR',
			url: 'SPR@2024'
		}
	},
	servers: {
		url: process.env.ORIGIN_URL
	},
	basePath: '/api/v1',
	tags: globalTags,
	schemes: ['http', 'https'],
	consumes: application,
	produces: application,
	components: {
		securitySchemes: {
			BearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			}
		}
	},
	securityDefinitions: {
		Bearer: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header'
		}
	},
	security: [
		{
			Bearer: []
		}
	],
	paths: globalPath,
	definitions: {}
};
