const express = require('express');
const { 
  login, 
  register, 
  getUsers, 
  deleteUser 
} = require('../controllers/authControllers');
const router = express.Router();

// POST -----/api/auth/register
router.post('/register', register);

// POST--- /api/auth/login
router.post('/login', login);

// GET -- /api/auth/users
router.get('/users', getUsers);

// DELETE -- /api/auth/users/:id
router.delete('/users/:id', deleteUser);

module.exports = router;
