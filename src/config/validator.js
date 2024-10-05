import { sendRsp } from '../utils/response';
const { Validator } = require('node-input-validator');
import compose from 'composable-middleware';
import { log } from '../libs/logger';

/**
 * Validation Middleware Function.
 */

export const validation = validate => {
    return compose().use(async (req, res, next) => {
        try {
            const validationRules = new Validator(req.body, validate);
            const matched = await validationRules.check();
            if (!matched) {
                const errors = validationRules.errors;
                console.log('Validation Errors:', errors); // Log errors object
                const validationErrors = {};
                for (let key in errors) {
                    validationErrors[key] = errors[key].map(error => error.message);
                }
                return sendRsp(res, 422, { errors: validationErrors });
            }
            next();
        } catch (error) {
            log.error('Error during validation:', error);
            return sendRsp(res, 500, req.trans('fetch_failed'));
        }
    });
};
