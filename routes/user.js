import express from "express";
import {handlerGetAllUser,handlerCreateUser,handlerUpdateUserById,handlerDeleteUserById,handlerGetUserById} from '../controllers/user.js'

const router=express.Router();



router.route('/').get(handlerGetAllUser).post(handlerCreateUser)


router.route('/:id')

.get(handlerGetUserById)

.patch(handlerUpdateUserById)


.delete(handlerDeleteUserById);

export default router;