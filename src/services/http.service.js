import request from 'request-promise';

export const httpCall = ({ body, headers, method, url }) => {
    return new Promise((resolve, reject) => {
        request({
            method,
            url,
            body: JSON.stringify(body),
            headers
        })
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });
    });
};
