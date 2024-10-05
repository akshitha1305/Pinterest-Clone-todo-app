import AWS from 'aws-sdk';
import config from '../config/environment';
import { generatePath } from '../api/upload/upload.controller';
import { resourceModel } from '../config/resource';

export const moveToBucket = async (fileName, userStorageDetails, videoURL, contentInfo = null) => {
    return new Promise((resolve, reject) => {
        AWS.config.update({
            accessKeyId: config.s3TempFileUpload.temp_keyId,
            secretAccessKey: config.s3TempFileUpload.temp_secret
        });
        const s3 = new AWS.S3();
        const srcPath = `/${config.s3TempFileUpload.temp_bucket}/${fileName}`;
        const generatedFileName = generatePath(fileName, userStorageDetails, contentInfo);
        const params = {
            Bucket: userStorageDetails.storage.bucket_name,
            CopySource: srcPath,
            Key: generatedFileName
        };

        // Copy source to channel storage

        s3.copyObject(params, (copyError, data) => {
            if (copyError) {
                reject(copyError);
            } else {
                data.CopyObjectResult.filename = generatedFileName;

                // Delete source from temp storage

                const deleteParam = {
                    Bucket: config.s3TempFileUpload.temp_bucket,
                    Key: fileName
                };

                s3.deleteObject(deleteParam, deleteError => {
                    if (deleteError) {
                        reject(deleteError);
                    } else {
                        resolve(data);
                    }
                });
            }
        });
    });
};

export const channelTempStorage = (channelId, { storage_limit, channel_storage_size, temp_storage_size }) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        if (channelId) {
            await resourceModel.channel.updateOne(
                {
                    _id: channelId
                },
                {
                    storage_access: {
                        storage_limit,
                        channel_storage_size,
                        temp_storage_size
                    }
                }
            );

            resolve();
        } else {
            reject('Channel Id missing');
        }
    });
};

export const copyBucket = async (fileName, userStorageDetails, contentInfo = null) => {
    const AwsConfig = {
        accessKeyId: config.s3TempFileUpload.temp_keyId,
        accessSecretKey: config.s3TempFileUpload.temp_secret
    };
    AWS.config.update(AwsConfig);
    return new Promise((resolve, reject) => {
        const client = new AWS.S3();
        const srcPath = `/${config.s3TempFileUpload.temp_bucket}/${fileName}`;
        const generatedFileName = generatePath(fileName, userStorageDetails, contentInfo);
        const params = {
            Bucket: userStorageDetails.storage.bucket_name,
            CopySource: srcPath,
            Key: generatedFileName
        };

        client.copyObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
};

export const moveChannelLogo = async (files) => {
    return new Promise((resolve, reject) => {    
        AWS.config.update({
            accessKeyId: config.s3TempFileUpload.temp_keyId,
            secretAccessKey: config.s3TempFileUpload.temp_secret
        });
        const s3 = new AWS.S3();
        const AWS_BUCKET = files.storage.bucket_name;
        const copyParams = {
          Key: `${files.newPath}`,
          Bucket: AWS_BUCKET,
          CopySource: encodeURI(`${AWS_BUCKET}/${files.oldPath}`)
        }
        s3.copyObject(copyParams, (copyError, data) => {
            if (copyError) {
                reject(copyError);
            } else {
                data.CopyObjectResult.filename = `${files.newPath}`;

                // Delete source from temp storage
                const deleteParam = {
                    Key: files.oldPath,
                    Bucket: AWS_BUCKET
                }
                s3.deleteObject(deleteParam, deleteError => {
                    if (deleteError) {
                        reject(deleteError);
                    } else {
                        resolve(data);
                    }
                });
            }
        });
    });
};
