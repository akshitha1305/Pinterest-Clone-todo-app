const application = ['application/json', 'multipart/form-data'];
const en = require('../../../src/config/locales/en.json');

module.exports = {
    '/account/create': {
        post: {
            tags: ['account'],
            summary: 'Add a account ',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            full_name: { type: 'string' },
                            email: { type: 'string' },
                            dob: { type: 'date'},
                            role: { type: 'number',enum: [1, 2]},
                            status:{ type: 'number'},
                            username: { type: 'string' },
                            phone_number: { type: 'string'},
                            password: { type: 'string' },
                            re_password: { type: 'string'}
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
    '/account/login': {
        post: {
            tags: ['account'],
            summary: 'login a account ',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            emailOrphone_number: { type: 'string' },
                            password: { type: 'string' }
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
    '/account/verify': {
        post: {
            tags: ['account'],
            summary: 'verify email ',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            email: { type: 'string' },
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
    '/account/get': {
        get: {
            tags: ['account'],
            summary: 'Get all account Details',
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
    '/account/get/{id}': {
        get: {
            tags: ['account'],
            summary: 'Get all account by id Details',
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
    '/account/update/{id}': {
        put: {
            tags: ['account'],
            summary: 'Update account',
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
                            full_name: { type: 'string' },
                            email: { type: 'string' },
                            dob: { type: 'date'},
                            role: { type: 'string',enum: ['Admin','Accountent']},
                            status:{ type: 'string'},
                            username: { type: 'string' },
                            phone_number: { type: 'string'},
                            password: { type: 'string' },
                            re_password: { type: 'string'}
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
    '/account/delete/{id}': {
        delete: {
            tags: ['account'],
            summary: 'Delete account Details',
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