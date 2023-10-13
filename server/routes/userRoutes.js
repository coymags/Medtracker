const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/users', userController.getAllUsers);

// CREATE a new user
router.post('/users', userController.createUser);

// UPDATE a user by ID
router.put('/users/:id', userController.updateUser);

// DELETE a user by ID
router.delete('/users/:id',  userController.deleteUser);

module.exports = router;
