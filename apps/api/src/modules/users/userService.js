import userRepository from './userRepository.js';

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
        const existingUser = await userRepository.findByEmail(data.email);

        if (existingUser) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }

        return userRepository.create(data);
    },
};

export default userService;