import {
    hashPassword,
    comparePassword,
} from '../../utils/password.js';

import userRepository from './user.repository.js';

const removePassword = (user) => {
    if (!user) {
        return user;
    }

    const { password: _, ...safeUser } = user;

    return safeUser;
};

const userService = {
    async getUserById(id) {
        const user = await userRepository.findById(id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        return removePassword(user);
    },

    async getUserByEmail(email) {
        const user = await userRepository.findByEmail(email);

        return removePassword(user);
    },

    async getAllUsers() {
        const users = await userRepository.findAll();

        return users.map(removePassword);
    },

    async createUser(data) {
        const existingUser =
            await userRepository.findByEmail(data.email);

        if (existingUser) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }

        return userRepository.create(data);
    },

    async updateProfile(id, data) {
        const user = await userRepository.findById(id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const name = data.name?.trim();

        if (!name) {
            const error = new Error(
                'Name cannot be empty'
            );
            error.statusCode = 400;
            throw error;
        }

        if (name.length < 2) {
            const error = new Error(
                'Name must be at least 2 characters'
            );
            error.statusCode = 400;
            throw error;
        }

        const updatedUser =
            await userRepository.updateProfile(id, {
                name,
            });

        return removePassword(updatedUser);
    },

    async updatePassword(
        id,
        { currentPassword, newPassword }
    ) {
        if (!currentPassword) {
            const error = new Error(
                'Current password is required'
            );
            error.statusCode = 400;
            throw error;
        }

        if (!newPassword) {
            const error = new Error(
                'New password is required'
            );
            error.statusCode = 400;
            throw error;
        }

        if (newPassword.length < 6) {
            const error = new Error(
                'New password must be at least 6 characters'
            );
            error.statusCode = 400;
            throw error;
        }

        if (currentPassword === newPassword) {
            const error = new Error(
                'New password must be different from current password'
            );
            error.statusCode = 400;
            throw error;
        }

        const user = await userRepository.findById(id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid =
            await comparePassword(
                currentPassword,
                user.password
            );

        if (!isPasswordValid) {
            const error = new Error(
                'Current password is incorrect'
            );
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword =
            await hashPassword(newPassword);

        await userRepository.updatePassword(
            id,
            hashedPassword
        );
    },
};

export default userService;