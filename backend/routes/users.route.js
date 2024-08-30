import express from 'express';
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, logoutUser, registerUser, updateUser, updateUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').post(registerUser).get(getUsers);
router.route('/login').post(authUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

export default router;