import mongoose from 'mongoose';
import config from '../../config/environment';
import { log } from '../../libs/logger';

export const mongoDBConnection = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(config.mongo.uri, config.mongo.options).then(() => {
        console.log('MongoDB Connected!!!');
        return Promise.resolve({});
    });
    mongoose.connection.on('error', err => {
        log.error(err);
        console.log('Error:::', err);
    });
};

export const mongoHealthCheck = () =>
    new Promise(function (resolve, _reject) {

        setTimeout(function () {
            const mongooseState = mongoose.connection.readyState;
            if (mongooseState === 1) {
                resolve();
            } else {
                // eslint-disable-next-line no-lonely-if
                if (mongooseState) {
                    mongoose.connection.on('error', err => {
                        console.log('error is ', err.message);
                        _reject(new Error(err));
                    });
                } else {
                    mongoose.connect(config.mongo.uri, config.mongo.options).then(
                        () => {
                            console.log('mongo connected');
                            resolve();
                        },
                        err => {
                            //error
                            _reject(new Error(err));
                        }
                    );
                }
            }
        }, 1);
    });
