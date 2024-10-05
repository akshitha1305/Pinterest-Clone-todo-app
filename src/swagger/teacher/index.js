const application = ['application/json', 'multipart/form-data'];
const en = require('../../../src/config/locales/en.json');

module.exports = {
    '/teacher/create': {
        post: {
            tags: ['teacher'],
            summary: 'Add a teacher ',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            full_name: { type: 'string' },
                            type: { type: 'number', enum: [1, 2] },
                            dob: { type: 'date'},
                            gender:{ type: 'string'},
                            qualification: { type: 'string' },
                            phone_number: { type: 'string'},
                            image: { type: 'string' },
                            experience: { type: 'string'},
                            salary_month: { type: 'string' },
                            ctc: { type: 'string'},
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
    '/teacher/get': {
        get: {
            tags: ['teacher'],
            summary: 'Get all teacher Details',
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
                {
                    name: 'emp_id',
                    in: 'query',
                    type: 'string'
                },
                {
                    name: 'full_name',
                    in: 'query',
                    type: 'string'
                },
                {
                    name: 'type',
                    in: 'query',
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
    '/teacher/get/{id}': {
        get: {
            tags: ['teacher'],
            summary: 'Get all teacher by id Details',
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
    '/teacher/get': {
        get: {
            tags: ['teacher'],
            summary: 'Get all teacher Details',
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
                {
                    name: 'emp_id',
                    in: 'query',
                    type: 'string'
                },
                {
                    name: 'full_name',
                    in: 'query',
                    type: 'string'
                },
                {
                    name: 'type',
                    in: 'query',
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
    '/teacher/get/filter': {
        get: {
            tags: ['teacher'],
            summary: 'Get all teachers by filter Details',
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
                {
                    name: 'emp_id',
                    in: 'query',
                    type: 'string'
                },
                {
                    name: 'full_name',
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
    '/teacher/get/{id}': {
        get: {
            tags: ['teacher'],
            summary: 'Get all teacher by id Details',
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
    '/teacher/update/{id}': {
        put: {
            tags: ['teacher'],
            summary: 'Update teacher',
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
                            emp_id: { type: 'string'},
                            full_name: { type: 'string' },
                            type: { type: 'string' },
                            dob: { type: 'date'},
                            gender:{ type: 'string'},
                            qualification: { type: 'string' },
                            phone_number: { type: 'string'},
                            image: { type: 'string' },
                            experience: { type: 'string'},
                            salary_month: { type: 'string' },
                            ctc: { type: 'string'},
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
    '/teacher/delete/{id}': {
        delete: {
            tags: ['teacher'],
            summary: 'Delete teacher Details',
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