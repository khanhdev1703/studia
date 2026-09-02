import jwt from "jsonwebtoken";

import authRepository from "./auth.repository.js";

import { hashPassword, comparePassword } from "../../utils/password.js";

import AppError from "../../utils/appError.js";

import env from "../../config/env.js";

const authService = {
    async register({ name, email, password }) {
        const existingUser = await authRepository.findByEmail(email);

        if (existingUser) {
            throw new AppError(
                "Email đã được sử dụng",
                409
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = await authRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        // Không trả password về client
        const { password: _, ...safeUser } = user;

        return safeUser;
    },

    async login({ email, password }) {
        const user = await authRepository.findUserByEmail(email);

        if (!user) {
            throw new AppError(
                "Email hoặc mật khẩu không chính xác.",
                401
            );
        }

        const isPasswordValid = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new AppError(
                "Email hoặc mật khẩu không chính xác.",
                401
            );
        }

        const accessToken = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        // Không trả password về client
        const { password: _, ...safeUser } = user;

        return {
            user: safeUser,
            accessToken,
        };
    },
};

export default authService;