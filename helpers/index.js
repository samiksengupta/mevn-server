const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const { ENV } = require('../config/server');
const db = require('../config/db')[ENV];
const server = require("../config/server");

module.exports = {
    handleBadRequestResponse: (res, message = 'Bad Request') => {
        res.status(400).json({
            message: message
        });
    },

    handleUnauthorizedResponse: (res, message = 'Unauthorized') => {
        res.status(401).json({
            message: message
        });
    },

    handleNotFoundResponse: (res, message = 'Resource does not exist') => {
        res.status(404).json({
            message: message
        });
    },

    handleServerErrorResponse: (res, error) => {
        if (server.ENV === 'production') error = undefined;
        const defaultMessage = 'A server error occured';
        switch (typeof error) {
            case 'object': error.message = error.message || defaultMessage; break;
            case 'string': error = { message: error }
            default: error = { message: defaultMessage }
        }
        res.status(500).send(error);
    },

    hashPassword: async (raw) => {
        return await bcrypt.hash(raw, 10);
    },

    comparePassword: async (raw, hash) => {
        return await bcrypt.compare(raw, hash);
    },

    generateAccessToken: (user) => {
        const jitter = parseInt(Math.random() * 120);
        const lifespan = +server.JWT_LIFESPAN + jitter;
        return jwt.sign({
            id: user.id,
            role: user.role
        }, server.JWT_SECRET, {
            expiresIn: `${lifespan}s`
        });
    },

    verifyAccessToken: async (token) => {
        return await jwt.verify(token, server.JWT_SECRET, (err, payload) => {
            if (err) return false;
            return payload;
        });
    },

    decodeAccessToken: (token) => {
        return jwt.decode(token);
    },

    generateRefreshToken: (user) => {
        return require('crypto').randomBytes(32).toString('hex');
    },

    randomItem: array => {
        return array[Math.floor(Math.random() * array.length)];
    },

    slugify: (string, appendTimestamp = false) => {
        const slug = string.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
        if (appendTimestamp) {
            slug = `${slug}-${Date.now()}`;
        }
        return slug;
    },

    getSequelizeInstance: () => new Sequelize(db.database, db.username, db.password, {
        dialect: db.dialect,
        host: db.host
    })
};