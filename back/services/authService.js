const BCrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const Register = async (userData) => {
     const username = userData.username;
     const existingUser = await findUser(username);
     if (existingUser) {
         throw new Error('Username already exists');
     }
     console.log('userData.password', userData.password);
     const password = await BCrypt.hash(userData.password, 10);
     const adminUserName = "admin";
     const user = new UserModel({
         username: username,
         password: password,
         isAdmin: adminUserName === username,
         createdData: new Date(),
         updatedData: new Date(),
         deletedData: null,
     });
        return user.save();
}

const Login = async (userData) => {
    const username = userData.username;
    const existingUser = await findUser(username);
    if (!existingUser) {
        throw new Error('Username does not exist');
    }
    const password = userData.password;
    const isPasswordCorrect = BCrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        throw new Error('Password is incorrect');
    }
    return jwt.sign({ username: username, isAdmin: existingUser.isAdmin}, env.SECRET_KEY, { expiresIn: '1h'});
}

const findUser = (username) => {
    return UserModel.findOne({ username: username });
}

module.exports = {
    Register,
    Login
}