import express  from "express";
import passport from "passport";
import UserValidation from "components/user/controllers/UserValidation";
import UserController from "components/user/controllers/UserController";

const router = express.Router();

router.post('/', UserValidation.userValidate, UserController.register)
router.post('/login/',UserValidation.userLoginValidate, UserController.login)
router.get('/', UserController.userLists)
router.get('/:id/', 
           passport.authenticate('jwt', {session:false}), 
           UserController.details)
router.patch('/:id', 
            passport.authenticate('jwt', {session:false}),            
            UserValidation.userUpdateValidate, UserController.userUpdate)
router.delete('/:id', 
            passport.authenticate('jwt', {session:false}),
            UserController.userDelete)

export default router;