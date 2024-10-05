const application = ['application/json', 'multipart/form-data'];
const en = require('../../../src/config/locales/en.json');

module.exports = {
    '/advance/create': {
        post: {
            tags: ['advance'],
            summary: 'Add a advance ',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            emp_id: { type: 'Schema.Types.ObjectId',ref: 'Teacher'},
                            amount: { type: 'string'},
                            status: { type: 'string', enum: ['pending', 'approved', 'canceled'] },
                            comment: { type: 'string'},
                            updated_by: { type: 'string'},
                            created_by: { type: 'string'},
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
    '/advance/get': {
        get: {
            tags: ['advance'],
            summary: 'Get all advance Details',
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
    '/advance/get/{id}': {
        get: {
            tags: ['advance'],
            summary: 'Get all advance by id Details',
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
    '/advance/update/{id}': {
        put: {
            tags: ['advance'],
            summary: 'Update advance',
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
                            emp_id: { type: 'Schema.Types.ObjectId',ref: 'Teacher'},
                            amount: { type: 'string'},
                            status: { type: 'string', enum: ['pending', 'approved', 'canceled'] },
                            comment: { type: 'string'},
                            updated_by: { type: 'string'},
                            created_by: { type: 'string'},
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
    '/advance/delete/{id}': {
        delete: {
            tags: ['advance'],
            summary: 'Delete advance Details',
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