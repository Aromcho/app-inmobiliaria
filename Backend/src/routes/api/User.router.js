import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    addFavorite,
    removeFavorite,
    getUserFavorites
} from '../../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:uid', getUserById);
userRouter.put('/:uid', updateUser);
userRouter.delete('/:uid', deleteUser);

userRouter.post('/:userId/favorites', addFavorite);  
userRouter.delete('/:userId/favorites/:propertyId', removeFavorite);
userRouter.get('/:userId/favorites', getUserFavorites);


export default userRouter;
