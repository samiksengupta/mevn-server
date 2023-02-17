'use strict';
const { Model, DataTypes } = require('sequelize');
const { hashPassword, comparePassword, getSequelizeInstance } = require('../helpers');

class User extends Model {

    static classMethod() {
        console.log("This is a class level method");
    }

    static async authenticate(username, password) {
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        if (user) {
            if (await comparePassword(password, user.password)) {
                return user;
            }
        }
        return false;
    }
}

User.init({
    name: DataTypes.STRING,
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
}, {
    sequelize: getSequelizeInstance(),
    modelName: 'User',
    scopes: {
        withoutSecrets: {
            attributes: { exclude: ['password', 'refreshToken'] },
        }
    },
});

User.beforeCreate(async (user, options) => {
    user.password = await hashPassword(user.password);
});

module.exports = User;