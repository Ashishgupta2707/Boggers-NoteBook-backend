import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from "../model/user.js";
import Token from '../model/token.js';

dotenv.config();

import { request, response } from 'express';


export const signupUser = async (request, response) => {
    try {
        const salt = await bcyrpt.genSalt();
        const hashpassword = await bcyrpt.hash(request.body.password , salt);

        const user = {
            username: request.body.username,
            name: request.body.name,
            password: hashpassword
        };

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({msg:'signup successful'})
    } catch (error) {
        return response.status(500).json({msg:'Error while signup the user'})
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcyrpt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRETE_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRETE_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });


        } else {
            return response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login in user'})
    }
}