'use strict'
import { resourceModel } from '../../config/resource';
import config from '../../config/environment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const signInMethod = async (req, res) => {
    const { email, phone_number, password } = req.body;

    let user;
    if (email) {
        user = await resourceModel.account_Model.findOne({ email });
    } else if (phone_number) {
        user = await resourceModel.account_Model.findOne({ phone_number });
    } else {
        throw 'Email or phone number is required';
    }

    if (!user) {
        throw 'User not found';
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw 'Invalid password';
    }

    user['password'] = '';
    console.log('user', user);
    const tokenPayload = {
        _id: user._id,
        role: user.role,
        status: user.status,
        full_name: user.full_name
    }

    const token = jwt.sign(tokenPayload, config.jwt.secret, { expiresIn: '36d' }); //jwt.sign(({ ...user }), config.jwt.secret, { expiresIn: '10h' });
    await resourceModel.account_Model.updateOne({ _id: user._id }, { access_token: token });
    return { token, user };
};


export const signUpMethod = async (req, res) => {
    const { name, email,password, re_password } = req.body;
    if (password !== re_password) {
        throw 'Passwords do not match';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw 'Invalid email format';
    }

    const existingEmployee = await resourceModel.account_Model.findOne({ email });

    if (existingEmployee) {
        throw 'User with this email already exists';
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword', hashedPassword);
    const newUser = new resourceModel.account_Model({
        name,
        email,
        password: hashedPassword,
        re_password
    });
    await newUser.save();
    req.body.sharePassword ? (newUser['password'] = password) : '';
    return newUser;
};

