'use strict';

import { serve, setup } from 'swagger-ui-express';
import { swaggerUI } from './src/config/swagger';

import account from './src/api/account'



export default app => {
    app.get('/api/v1/check', function (req, res) {
		res.send('Welcome to Picsart API');
	});
    app.use('/api/v1/account',account)
   
    app.use('/api/v1/spr_api', serve, setup(swaggerUI));
};
