'use strict';

const { hashPassword } = require("../helpers");

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                name: 'Admin',
                username: 'admin',
                password: await hashPassword('123456'),
                isAdmin: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'User',
                username: 'user',
                password: await hashPassword('123456'),
                isAdmin: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};