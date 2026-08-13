import jwt from 'jsonwebtoken';

import userRepository from '../users/userRepository.js';
import { hashPassword, comparePassword } from '../../utils/password.js';
import env from '../../config/env.js';

const authService = {
    async register({ name, email, password }) {
        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            const error = new Error('Email đã được sử dụng');
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await hashPassword(password);

        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        const { password: _, ...safeUser } = user;

        return safeUser;
    },

    async login({ email, password }) {
        // Tìm user
        const user = await userRepository.findByEmail(email);

        if (!user) {
            const error = new Error('Email hoặc mật khẩu không chính xác.');
            error.statusCode = 401;
            throw error;
        }

        // Kiểm tra password
        const isPasswordValid = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordValid) {
            const error = new Error('Email hoặc mật khẩu không chính xác.');
            error.statusCode = 401;
            throw error;
        }

        // Tạo JWT
        const accessToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            env.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        );

        // Không trả password
        const { password: _, ...safeUser } = user;

        return {
            user: safeUser,
            accessToken,
        };
    },
};

export default authService;