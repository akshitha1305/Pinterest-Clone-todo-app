import fs from 'fs';

export const isFileCheck = (DIR, DIR_NAME) => {
    return new Promise((resolve, reject) => {
        fs.access(`${DIR}/${DIR_NAME}`, fs.F_OK, err => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject({
                        fsError: 'No Such File (or) Directory'
                    });
                }
            }
            resolve();
        });
    });
};

export const isFileDIRCheck = path => {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.F_OK, err => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject({
                        file: false
                    });
                }
            }
            resolve({
                file: true
            });
        });
    });
};

export const removeFileDIR = async filePath => {
    fs.access(filePath, fs.F_OK, err => {
        if (err) {
            return;
        }
        fs.unlink(filePath, unLinkErr => {
            if (unLinkErr) {
                console.log('Error on unlink file', unLinkErr);
            }
            console.log(`${filePath} is Unlinked`);
        });
    });
    fs.access(`${filePath}.META`, fs.F_OK, fAccessErr => {
        if (fAccessErr) {
            return;
        }
        fs.unlink(`${filePath}.META`, accessUnlinkErr => {
            if (accessUnlinkErr) {
                console.log('Error on unlink file', accessUnlinkErr);
            }
            console.log(`${filePath} is Unlinked`);
        });
    });
};
