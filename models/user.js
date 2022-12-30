'use strict';
const { Model, DataTypes } = require('sequelize');
const { hashPassword, comparePassword, sequelizeInstance } = require('../helpers');

class User extends Model {

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

    toJSON() {
        const user = Object.assign({}, this.dataValues);
        delete user.password;
        return user
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
    sequelizeInstance,
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

module.exports.User;