const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const CreateUser = async (userData) => {
    const username = userData.username;
    const password = userData.password;
    const existingUser = await findByUsername(username);
    if (existingUser) {
        throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
        username: username,
        password: hashedPassword,
        createdData: new Date(),
        updatedData: new Date(),
        deletedData: null,
        isAdmin: false,
    });
    return user.save();
}

const UpdateUser = async (id, userData) => {
    const user = await findById(id);
    if (!user) {
        throw new Error('Username does not exist');
    }
    user.username = userData.username;
    user.password = userData.password;
    user.updatedData = new Date();
    return user.save();
}

const DeleteUser = async (id) => {
    const user = await findById(id);
    if (!user) {
        throw new Error('Username does not exist');
    }
    user.deletedData = new Date();
    return user.save();
}
const GetAllUsers = async () => {
    return UserModel.find({deletedData: null});
}
const GetUserById = async (id) => {
    return UserModel.find({ id: id, deletedData: null });
}

async function findByUsername(username) {
    return UserModel.findOne({ username: username ,deletedData: null});
}
async function findById(id) {
    return UserModel.findById(id);
}

module.exports = {
    CreateUser,
    UpdateUser,
    DeleteUser,
    GetAllUsers,
    GetUserById
}