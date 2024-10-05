import { responseHandler, sendRsp } from '../../utils/response';
import { resourceModel } from '../../config/resource';
import mongoose from 'mongoose';
import {signInMethod,signUpMethod} from '../authorization/index';
import config from '../../config/environment';
import bcrypt from 'bcrypt';


export const create = async (req, res) => {
    try {
        req.body.model = 'account_Model';
        const accountResponse = await signUpMethod(req, res);
        return sendRsp(res, 201, { message: 'account created successfully' }, accountResponse, {});
    } catch(error) {
        return sendRsp(res, 500, error, {}, error);
    }
}

export const login = async (req, res) => {
    try {
        req.body.model = 'account_Model';
        const response = await signInMethod(req, res);
        return sendRsp(res, 200, 'Login Successful', response, {});
    } catch(error) {
        return sendRsp(res, 500, error, {}, error);
    }
}

export const verifyEmail = async (req, res) => {
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
  }

  const existingaccount = await resourceModel.account_Model.findOne({ email });

  if (!existingaccount) {
      return res.status(404).json({ error: 'account not found with this email' });
  }

  // You can implement your email verification logic here
  // For example, you might send an email with a verification link
  // and update the account's record in the database once the link is clicked
  // This example assumes that the account's record has a field like 'isEmailVerified'

  existingaccount.isEmailVerified = true;
  await existingaccount.save();
  return res.status(200).json({message: 'Email verification successful',account: existingaccount });
};


//   try {
//       const { identifier } = req.body;

//       // Find account by email or phone number
//       const account = await resourceModel.account_Model.findOne({ $or: [{ email: identifier }, { phone_number: identifier }] });
//       if (!account) {
//           return res.status(401).json({ message: 'Invalid credentials' });
//       }
//       // No password verification or token generation, just return account object
//       res.json({ account });
//   } catch (error) {
//       console.error('Login failed', error);
//       res.status(500).json({ message: 'Login failed' });
//   }
// };

export const updateAccount = async (req, res) => {
    try {
        const id = req.params.id; // Assuming the Mongoose ID is passed in the request parameters
        if (req.body?.password) {
          req.body['password'] = req.body['password'] ? await bcrypt.hash(req.body['password'], 10) : req.body['password'];
          console.log('req.body', req.body);
        }
        const accountresponce = await resourceModel.account_Model.findOneAndUpdate({ _id: id },req.body,{ new: true });

        if (!accountresponce) {
            return sendRsp(res, 404, req.trans('account_not_found'), {});
        }

        return sendRsp(res, 200, req.trans('account_updated'), accountresponce, {});
    } catch (error) {
        return sendRsp(res, 500, req.trans('error_updating_account'), {}, error);
    }
};


export const getAllAccountDetails = async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || config.pageNumber;
        const limit = parseInt(req.query.limit, 10) || config.pageLimit;
        const skip = limit * page - limit;
        const sort = {
          _id: -1
        };
        req.options = {
          limit,
          skip,
          sort
        };
        const accountes = await resourceModel.account_Model.find({ is_active: true, is_archive: false }, {}, req.options).lean();
        const accountesCount = await resourceModel.account_Model.countDocuments({ is_active: true, is_archive: false });
        const pages = Math.ceil(accountesCount / req.options.limit);
		    const response = responseHandler(accountes, accountesCount, page, pages);
        return sendRsp(res, 200, req.trans('account_fetched_successfully'), response, {});
    } catch (error) {
        return sendRsp(res, 500, req.trans('error_updating_account'), {}, error);
    }
};

export const getAccountDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundApplicant = await resourceModel.account_Model.findOne({ _id: id });

    if (foundApplicant) {
      return sendRsp(res, 200, req.trans('account_fetched_successfully'), { foundApplicant });
    } else {
      return sendRsp(res, 404, req.trans('account_not_found'));
    }
  } catch (error) {
    console.error(error);
    return sendRsp(res, 500, req.trans('something_wrong'), {}, error);
  }
}

  


  export const deleteAccount = async (req, res) => {
      const objectId = req.params.id;
    
      try {
        const result = await resourceModel.account_Model.findOneAndUpdate({ _id: mongoose.Types.ObjectId(objectId) }, { is_active: false, is_archive: true });
    
        if (result.deletedCount === 1) {
          return sendRsp(res, 200, req.trans('account_deleted_successfully'), {result});
        } else {
          res.status(404).json({ success: false, message: 'account_not_found' });
        }
      } catch (error) {
        console.error(error);
        return sendRsp(res, 500, req.trans('something_wrong'), {}, error);
      }
    }


export const logout = async (req, res) => {
  const { authorization } = req.headers;
  const headerToken = authorization.split(' ');
  const token = headerToken[1];
  try {
    const user = await resourceModel.account_Model.findOne({ access_token: token }).lean();
    if (!user) {
      return sendRsp(res, 404, req.trans('account_not_found'), {});
    }
    user.access_token = '';
    await user.save();
    return sendRsp(res, 200, req.trans('logout_successful'), {});
  } catch (error) {
    return sendRsp(res, 500, req.trans('something_wrong'), {}, error);
  }
}