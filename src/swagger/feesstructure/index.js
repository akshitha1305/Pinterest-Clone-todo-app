const application = ['application/json', 'multipart/form-data'];
const en = require('../../../src/config/locales/en.json');

module.exports = {
    '/feessturcture/create': {
        post: {
            tags: ['feessturcture'],
            summary: 'Add a feessturcture ',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            class_label: { type: 'string'},
                            class_list: { type: 'array' },
                            fee_amount: { type: 'number' },
                            one_time_amount:{ type: 'number'},
                            term_one_amount: { type: 'number' },
                            term_one_month: { type: 'string'},
                            term_two_amount: { type: 'number' },
                            term_two_month: { type: 'string'},
                            term_three_amount: { type: 'number' },
                            term_three_month: { type: 'string'},
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
    '/feessturcture/get': {
        get: {
            tags: ['feessturcture'],
            summary: 'Get all feessturcture Details',
            parameters: [
                {
                    name: 'page',
                    in: 'query',
                    required: false,
                    type: 'string'
                },
                {
                    name: 'limit',
                    in: 'query',
                    required: false,
                    type: 'string'
                },
                {
                    name: 'class_label',
                    in: 'query',
                    required: false,
                    type: 'string'
                },
                {
                    name: 'fee_type',
                    in: 'query',
                    required: false,
                    type: 'string'
                }
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
    '/feessturcture/get/{id}': {
        get: {
            tags: ['feessturcture'],
            summary: 'Get all feessturcture by id Details',
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
    '/feessturcture/update/{id}': {
        put: {
            tags: ['feessturcture'],
            summary: 'Update feessturcture',
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
                            class_label: { type: 'string'},
                            class_list: { type: 'string' },
                            fee_amount: { type: 'number' },
                            one_time_fee: { type: 'boolean'},
                            one_time_amount:{ type: 'number'},
                            term_one_amount: { type: 'number' },
                            term_one_month: { type: 'string'},
                            term_two_amount: { type: 'number' },
                            term_two_month: { type: 'string'},
                            term_three_amount: { type: 'number' },
                            term_three_month: { type: 'string'},
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
    '/feessturcture/delete/{id}': {
        delete: {
            tags: ['feessturcture'],
            summary: 'Delete feessturcture Details',
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