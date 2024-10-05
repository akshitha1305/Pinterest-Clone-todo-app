'use strict';

import sharp from 'sharp';
import imagemin from 'imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';

export const imageCompressor = async (buffer, type = 'jpg') => {
    let pluginsObj;
    if (type === 'webp') {
        pluginsObj = {
            plugins: [converttowebp, imageminWebp({ quality: 60 })]
        };
    } else {
        pluginsObj = {
            plugins: [converttoJpg, mozjpeg({ quality: 60 })]
        };
    }
    return new Promise((resolve, reject) => {
        imagemin
            .buffer(buffer, pluginsObj)
            .then(bufferResult => {
                return resolve(bufferResult);
            })
            .catch(err => reject(err));
    });
};

export const converttoJpg = async input => {
    return new Promise((resolve, reject) => {
        sharp(input)
            .jpeg()
            .sharpen()
            .toBuffer()
            .then(buffer => resolve(buffer))
            .catch(err => reject(err));
    });
};

export const converttowebp = async input => {
    return new Promise((resolve, reject) => {
        sharp(input)
            .webp()
            .sharpen()
            .toBuffer()
            .then(buffer => resolve(buffer))
            .catch(err => reject(err));
    });
};
