const application = ['application/json', 'multipart/form-data'];
const en = require('../../../src/config/locales/en.json');

module.exports = {
    '/attendence/create': {
        post: {
            tags: ['attendence'],
            summary: 'Add a attendence ',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            emp_id: { type: 'Schema.Types.ObjectId',ref: 'Teacher'},
                            date: { type: 'date'},
                            effort: { type: 'string',enum: ['25','50','75','100']},
                            type: { type: 'string',enum: ['duty','leave','sickleave']},
                            comment:{ type: 'string'},
                            created_by: { type: 'string' },
                            updated_by: { type: 'string'}
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
    '/attendence/get': {
        get: {
            tags: ['attendence'],
            summary: 'Get all attendence Details',
                    parameters: [
                        {
                            name: 'page',
                            in: 'query',
                            type: 'string'
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            type: 'string'
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
    '/attendence/get/{id}': {
        get: {
            tags: ['attendence'],
            summary: 'Get all attendence by id Details',
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
    '/attendence/update/{id}': {
        put: {
            tags: ['attendence'],
            summary: 'Update attendence',
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
                            date: { type: 'date'},
                            effort: { type: 'string',enum: ['25','50','75','100']},
                            type: { type: 'string',enum: ['duty','leave','sickleave']},
                            comment:{ type: 'string'},
                            created_by: { type: 'string' },
                            updated_by: { type: 'string'}
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
    '/attendence/delete/{id}': {
        delete: {
            tags: ['attendence'],
            summary: 'Delete attendence Details',
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