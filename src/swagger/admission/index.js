const application = ['application/json', 'multipart/form-data'];
const en = require('../../../src/config/locales/en.json');

module.exports = {
    '/admission/create': {
        post: {
            tags: ['admission'],
            summary: 'Add a admission',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            joining_date: { type: 'string' },
                            form_no: { type: 'string' },
                            student_id_no: { type: 'string' },
                            class: { type: 'Schema.Types.ObjectId',ref: 'Class'},
                            first_language: { type: 'string' },
                            student_fullname: { type: 'string' },
                            gender: { type: 'string' },
                            religion: { type: 'string' },
                            caste: { type: 'string' },
                            dob: { type: 'string' },
                            tc_no: { type: 'string' },
                            student_aadhar_no: { type: 'string' },
                            email: { type: 'string' },
                            father_name: { type: 'string' },
                            mother_name: { type: 'string' },
                            father_mobile_no: { type: 'string' },
                            father_aadhar_no: { type: 'string' },
                            mother_mobile_no: { type: 'string' },
                            mother_aadhar_no: { type: 'string' },
                            communication_address: { type: 'string' },
                            net_tution_fee: { type: 'Schema.Types.ObjectId',ref: 'Fees'},
                            transport_kms: { type: 'number'},
                            transport_total_kms: { type: 'number'},
                            total_fee: { type: 'number'},
                            total_fee_in_words: { type: 'string' },
                            parent_signature: { type: 'string' },
                            accountent_signature: { type: 'string' },
                            principle_signature: { type: 'string' },
                            name_previous_school_attended: {
                                type: 'object',
                                properties: {
                                    year: { type: 'string' },
                                    class: { type: 'string' },
                                    name_of_school: { type: 'string' },
                                    place: { type: 'string' },
                                    medium_instruction: { type: 'string' }
                                }
                            },
                            father_edu_qualification: { type: 'string' },
                            father_occupation: { type: 'string' },
                            father_annual_income: { type: 'string' },
                            mother_edu_qualification: { type: 'string' },
                            mother_occupation: { type: 'string' },
                            mother_annual_income: { type: 'string' },
                            guardian_edu_qualification: { type: 'string' },
                            guardian_occupation: { type: 'string' },
                            guardian_annual_income: { type: 'string' },
                            bro_sis_are_studying: { type: 'boolean' },
                            personal_identification_of_student_marks: { type: 'string' },
                            parents_are_employed_in_spr: { type: 'boolean' },
                            emp_id: { type: 'string' },
                            declaration: { type: 'string'}
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
    '/admission/get': {
        get: {
            tags: ['admission'],
            summary: 'Get all admission Details',
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
    '/admission/filter': {
        get: {
            tags: ['account'],
            summary: 'Get all account filter Details',
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
                    name: 'student_id',
                    in: 'query',
                    type: 'string'
                },
                {
                    name: 'student_fullname',
                    in: 'query',
                    type: 'string'
                },
                {
                    name: 'class_id',
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
    '/admission/get/{id}': {
        get: {
            tags: ['admission'],
            summary: 'Get all admission by id Details',
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
    '/admission/update/{id}': {
        put: {
            tags: ['admission'],
            summary: 'Update admission',
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
                            joining_date: { type: 'string' },
                            form_no: { type: 'string' },
                            student_id_no: { type: 'string' },
                            class: { type: 'Schema.Types.ObjectId',ref: 'Class'},
                            first_language: { type: 'string' },
                            student_fullname: { type: 'string' },
                            gender: { type: 'string' },
                            religion: { type: 'string' },
                            caste: { type: 'string' },
                            dob: { type: 'string' },
                            tc_no: { type: 'string' },
                            student_aadhar_no: { type: 'string' },
                            email: { type: 'string' },
                            father_name: { type: 'string' },
                            mother_name: { type: 'string' },
                            father_mobile_no: { type: 'string' },
                            father_aadhar_no: { type: 'string' },
                            mother_mobile_no: { type: 'string' },
                            mother_aadhar_no: { type: 'string' },
                            communication_address: { type: 'string' },
                            net_tution_fee: { type: 'Schema.Types.ObjectId',ref: 'Fees'},
                            transport_kms: { type: 'number'},
                            transport_total_kms: { type: 'number'},
                            total_fee: { type: 'number'},
                            total_fee_in_words: { type: 'string' },
                            parent_signature: { type: 'string' },
                            accountent_signature: { type: 'string' },
                            principle_signature: { type: 'string' },
                            name_previous_school_attended: {
                                type: 'object',
                                properties: {
                                    year: { type: 'string' },
                                    class: { type: 'string' },
                                    name_of_school: { type: 'string' },
                                    place: { type: 'string' },
                                    medium_instruction: { type: 'string' }
                                }
                            },
                            father_edu_qualification: { type: 'string' },
                            father_occupation: { type: 'string' },
                            father_annual_income: { type: 'string' },
                            mother_edu_qualification: { type: 'string' },
                            mother_occupation: { type: 'string' },
                            mother_annual_income: { type: 'string' },
                            guardian_edu_qualification: { type: 'string' },
                            guardian_occupation: { type: 'string' },
                            guardian_annual_income: { type: 'string' },
                            bro_sis_are_studying: { type: 'boolean' },
                            personal_identification_of_student_marks: { type: 'string' },
                            parents_are_employed_in_spr: { type: 'boolean' },
                            emp_id: { type: 'string' },
                            declaration: {
                                type: 'object',
                                properties: {
                                    mr_or_ms: { type: 'string' },
                                    father: { type: 'string' }
                                }
                            }
                        }
                    }
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
    '/admission/delete/{id}': {
        delete: {
            tags: ['admission'],
            summary: 'Delete admission Details',
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
