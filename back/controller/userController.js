const userService = require('../services/userService');
const response = require('../util/response');

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        await userService.CreateUser(userData);
        res.status(200).json(response.success(null));
    } catch (error) {
        res.status(200).json(response.error(error.message));
    }
}
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = req.body;
        await userService.UpdateUser(id, userData);
        res.status(200).json(response.success(null));
    } catch (error) {
        res.status(200).json(response.error(error.message));
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await userService.DeleteUser(id);
        res.status(200).json(response.success(null));
    } catch (error) {
        res.status(200).json(response.error(error.message));
    }
}
const getAllUsers = async (req, res) => {
    try {
        const result = await userService.GetAllUsers();
        res.status(200).json(response.success(result));
    } catch (error) {
        res.status(200).json(response.error(error.message));
    }
}
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await userService.GetUserById(id);
        res.status(200).json(response.success(result));
    } catch (error) {
        res.status(200).json(response.error(error.message));
    }
}
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
}