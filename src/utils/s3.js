'use strict';

import fs from 'fs';
import moment from 'moment';
import AWS from 'aws-sdk';
import config from '../config/environment';
import path from 'path';

export const imageUpload = (file, imageFolderName, s3Image) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file.path, async (err, data) => {
            if (err) return reject(err);
            const filename = file.originalFilename.split('.').slice(0, -1).join('.');
            const folderPath = s3Image.key ? `${s3Image.key}/${imageFolderName}` : `${imageFolderName}`;
            const s3BucketObj = {
                Bucket: config.s3FileUpload.bucket,
                Body: data,
                Key: `${folderPath}/${moment().year()}/${moment().month()}/${moment().valueOf()}-${filename.replace(/\s/g, '')}${path.extname(
                    file.originalFilename
                )}`
            };
            s3upload(s3BucketObj, async (s3UploadErr, resp) => {
                if (s3UploadErr) return reject(err);
                resolve(resp);
            });
        });
    });
};

export const UploadFile = (file, folderPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file.path, async (err, data) => {
            if (err) return reject(err);
            const s3BucketObj = {
                Bucket: config.s3FileUpload.bucket,
                Body: data,
                Key: folderPath
            };
            s3upload(s3BucketObj, async (s3UploadErr, resp) => {
                if (s3UploadErr) return reject(err);
                resolve(resp);
            });
        });
    });
};

export const s3 = new AWS.S3({
    accessKeyId: config.s3FileUpload.keyId,
    secretAccessKey: config.s3FileUpload.secret,
    region: config.s3FileUpload.region
});

export const s3upload = (paramsObj, cb) => {
    console.log('config.s3FileUpload.keyId :: ', config.s3FileUpload.keyId, config.s3FileUpload.secret, config.s3FileUpload.region)
    paramsObj['CacheControl'] = 'max-age=31536000';
    // paramsObj.ACL = 'public-read';
    s3.upload(paramsObj, (err, data) => {
        if (err) {
            console.log('err', err);
            cb(err, null);
        }
        cb(null, data);
    });
};
