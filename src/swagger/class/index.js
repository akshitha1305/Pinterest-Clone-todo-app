const application = ['application/json', 'multipart/form-data'];
const en = require('../../../src/config/locales/en.json');

module.exports = {
    '/class/create': {
        post: {
            tags: ['class'],
            summary: 'Add a class ',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            class: { type: 'string'},
                            section: { type: 'string' },
                        },
                    },
                },
            ],
            produces: application,
            responses: {
                200: {
                    description: en.fetch_success,
                    schema: {
                        properties: {
                            statusCode: { type: 'string' },
                            message: { type: 'string' },
                            status: { type: 'string' },
                            response: { type: 'object' },
                            error: { type: 'boolean', default: false }
                        }
                    }
                },
                401: {
                    description: en.something_went_wrong
                },
                500: {
                    description: en.something_went_wrong
                }
            }
        },
    },
    '/class/get': {
        get: {
            tags: ['class'],
            summary: 'Get all class Details',
            produces: application,
            responses: {
                200: {
                    description: en.fetch_success,
                    schema: {
                        properties: {
                            statusCode: { type: 'string' },
                            message: { type: 'string' },
                            status: { type: 'string' },
                            response: { type: 'object' },
                            error: { type: 'boolean', default: false }
                        }
                    }
                },
                401: {
                    description: en.something_went_wrong
                },
                500: {
                    description: en.something_went_wrong
                }
            }
        },
    },
    '/class/get/{id}': {
        get: {
            tags: ['class'],
            summary: 'Get all class by id Details',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    type: 'string'
                },
            ],
            produces: application,
            responses: {
                200: {
                    description: en.fetch_success,
                    schema: {
                        properties: {
                            statusCode: {
                                type: 'string'
                            },
                            message: {
                                type: 'string'
                            },
                            status: {
                                type: 'string'
                            },
                            response: {
                                type: 'object'
                            },
                            error: {
                                type: 'boolean',
                                default: false
                            }
                        }
                    }
                },
                401: {
                    description: en.something_went_wrong
                },
                500: {
                    description: en.something_went_wrong
                }
            }
        },
    },
    '/class/update/{id}': {
        put: {
            tags: ['class'],
            summary: 'Update class',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    type: 'string'
                },
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            class: { type: 'string'},
                            section: { type: 'string' },
                        }
                    },
                },
            ],
            produces: application,
            responses: {
                200: {
                    description: en.fetch_success,
                    schema: {
                        properties: {
                            statusCode: { type: 'string' },
                            message: { type: 'string' },
                            status: { type: 'string' },
                            response: { type: 'object' },
                            error: { type: 'boolean', default: false }
                        }
                    }
                },
                401: {
                    description: en.something_went_wrong
                },
                500: {
                    description: en.something_went_wrong
                }
            }
        },
    },
    '/class/delete/{id}': {
        delete: {
            tags: ['class'],
            summary: 'Delete class Details',
            produces: application,
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    type: 'string'
                },
            ],
            responses: {
                200: {
                    description: en.fetch_success,
                    schema: {
                        properties: {
                            statusCode: { type: 'string' },
                            message: { type: 'string' },
                            status: { type: 'string' },
                            response: { type: 'object' },
                            error: { type: 'boolean', default: false }
                        }
                    }
                },
                401: {
                    description: en.something_went_wrong
                },
                500: {
                    description: en.something_went_wrong
                }
            }
        },
    },
};