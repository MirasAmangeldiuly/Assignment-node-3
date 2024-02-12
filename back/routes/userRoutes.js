const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')


router.post('/user/create', authMiddleware, adminMiddleware, userController.createUser);
router.get('/user/getAll',authMiddleware, adminMiddleware, userController.getAllUsers);
router.get('/user/getById/:id',authMiddleware, adminMiddleware, userController.getUserById);
router.put('/user/update/:id',authMiddleware, adminMiddleware, userController.updateUser);
router.delete('/user/delete/:id',authMiddleware, adminMiddleware, userController.deleteUser);
module.exports = router;