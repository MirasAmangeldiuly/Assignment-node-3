const authServices = require('../services/authService');
const response = require('../util/response');


const register = async (req, res) => {
    try {
        const userData = req.body;
        await authServices.Register(userData);
        res.status(200).json(response.success(null));
    } catch (error) {
        res.status(200).json(response.error(error.message));
    }
}

const login = async (req, res) => {
    try {
        const userData = req.body;
        const token = await authServices.Login(userData);
        res.status(200).json(response.success(token));
    } catch (error) {
        res.status(200).json(response.error(error.message));
    }
}

module.exports = {
    register,
    login
}