'use strict';
import compose from 'composable-middleware';
import { sendRsp } from '../utils/response';
import { log } from '../libs/logger';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import { resourceModel } from '../config/resource';


export const isAuth = (accessedBy) => {
    return compose().use(async (req, res, next) => {
        try {
            if (req.query.authorization) {
                req.headers.authorization = req.query.authorization;
            }
            if (!req.headers.authorization) {
                return sendRsp(res, 501, req.trans('bad_gateway'));
            }
            const accessToken = await headerCheck(req.headers.authorization);
            const jwtPayload = await jwtVerify(accessToken);
            if (!jwtPayload) return sendRsp(res, 401, req.trans('jwt_token_expired'));
            const userDetails = jwtPayload;
            const userRoleDetails = await resourceModel.account_Model
                .findOne({ _id: userDetails._id, access_token: accessToken })
                .lean();
            
            if(userRoleDetails) {
                if (req.method === 'POST') {
                    req.body.created_by = userDetails._id;
                }
                if (req.method === 'PUT') {
                    req.body.updated_by = userDetails._id;
                }
                req.header.user = userDetails;
                next();
            } else {
                return sendRsp(res, 403, req.trans('unauthorized'));
            }
        } catch (error) {
            if (error.status) {
                return sendRsp(res, error.status, req.trans('jwt_token_expired'));
            }
            return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
        }
    });
};


const headerCheck = async header => {
    try {
        const headerToken = header.split(' ');
        return headerToken[1];
    } catch (error) {
        return Promise.reject(error);
    }
};

const jwtVerify = async token => {
    return jwt.verify(token, config.jwt.secret, (err, verifiedJwt) => {
        if (err) {
            log.error(err);
            return Promise.reject({
                status: 401
            });
        }
        return verifiedJwt;
    });
};

const isAuthUser = async (username, accessToken) => {
    const users = await resourceModel.user_device.findOne({ username, access_token: accessToken }).lean();
    if (!users) return Promise.resolve(false);
    return Promise.resolve(true);
};

