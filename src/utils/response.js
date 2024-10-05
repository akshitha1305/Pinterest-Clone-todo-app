//UNIQUE RESPONSE CONFIGURATION
import { log } from '../libs/logger';

export const sendRsp = (res, statusCode, message, response = {}, errMsg = {}) => {
    let errorType = false;
    let status = 'success';
    if (statusCode !== 200 && statusCode !== 201) {
        errorType = true;
        status = 'error';
    }
    if (statusCode === 500) {
        console.log('Error:::');
        log.error('error', errMsg);
    }
    const responceParam = {
        statusCode,
        message,
        status,
        response,
        error: errorType
    }

    if(errorType) responceParam.errMsg = errMsg.stack;

    res.status(statusCode).send(responceParam);
};

export const responseHandler = (data, count, page, totalPage) => {
    return {
        data,
        total: count,
        recordsPerPage: data.length,
        currentPage: page || 1,
        totalPages: totalPage,
        previous: page > 1 ? page - 1 : null,
        next: page <= totalPage - 1 ? page + 1 : null
    };
};
