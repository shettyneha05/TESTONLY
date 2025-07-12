import express from 'express';
import { 
  login, 
  register, 
  getUsers, 
  deleteUser, 
  me
} from '../controllers/authControllers.js';
import authenticate from '../middleware/auth.js';
const router = express.Router();


// POST -----/api/auth/register
router.post('/register', register);

// POST--- /api/auth/login
router.post('/login', login);

// GET -- /api/auth/users
router.get('/users', getUsers);

// DELETE -- /api/auth/users/:id
router.delete('/users/:id', deleteUser);

router.get('/me',authenticate, me);

export default router;
