'use strict';
import _ from 'lodash';
require('dotenv').config();

const all = {
    node_env: process.env.NODE_ENV,
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT,
    allow_origins: process.env.ALLOW_ORIGIN,
    api_url: process.env.ORIGIN_URL,
    pageNumber: process.env.PAGE_NUMBER || 1,
	pageLimit: process.env.PAGE_LIMIT || 10,
    secrets: {
        accessToken: process.env.ACCESS_TOKEN_SECRET || 'my_access_token',
        refreshToken: process.env.REFRESH_TOKEN_SECRET || 'my_refresh_token'
    },
    isTransCode: process.env.IS_TRANSCODE || 'false',
    token: {
        expiresInMinutes: 300
    },
    seedDB: false,
    jwt: {
        secret: process.env.JWT_SECRET || '2fd0c41acf32f57d2a89ba899c14e752ac38b5c12d2be8d13e67f53a8df2254a'
    },
    app_key: process.env.JWT_SECRET,
    mongo: {
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    s3FileUpload: {
        expiresInMinutes: 60 * 15,
        keyId: process.env.S3_KEY_ID,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        temp_path: process.env.S3_FOLDER,
        region: process.env.S3_REGION,
        url: process.env.S3_URL
    },
    service_name: process.env.SERVICE_NAME
};

//MERGED THE FILES EASILY TO HANDLE USING WITH CONFIG
const mergeObj = _.merge(all, require(`./${process.env.NODE_ENV}`));
export default mergeObj;
