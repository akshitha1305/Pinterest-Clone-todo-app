'use strict';

import path from 'path';
import express from 'express';
import http from 'http';
import multer from 'multer';
import fs from 'fs';
import expressConfig from './src/config/express';
import { mongoDBConnection } from './src/db/mongodb';
import config from './src/config/environment';
import routerConfig from './routes';



const cors = require('cors');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/';
        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  

  const upload = multer({ storage: storage });

const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html');

    app.use(cors());
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.post('/api/v1/upload', upload.array('files', 10), (req, res) => {
        try {
            // Check if files are provided
            if (!req.files || req.files.length === 0) {
                return res.status(400).send({ message: 'No files uploaded.' });
            }
            
            // Log uploaded file information
            console.log('Uploaded files:', req.files);
            const uploadedFiles = []
            req.files.map(item => uploadedFiles.push(item.path));
    
            res.send({
                message: 'Images uploaded successfully!',
                files: uploadedFiles
            });
        } catch (error) {
            res.status(500).send({ message: 'An error occurred during the upload.', error: error.message });
        }
    });
    

    // Define storage for multer to specify the upload destination and filename
const server = http.createServer(app);
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});

mongoDBConnection();
expressConfig(app);
routerConfig(app);

const startServer = () => {
    server.listen(config.port, config.ip, () => {
        console.log('Express server listening on ', server.address().port);
    });
};


setImmediate(startServer);

export default app;
