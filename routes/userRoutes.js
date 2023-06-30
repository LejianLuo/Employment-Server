import express from 'express';
const router = express.Router();
import { login,createUser,verifyUsername,loadApplications,sendApplication,deleteApplication} from '../controller/userController.js';

router.get('/verifyUsername/',verifyUsername);
router.post('/register/',createUser);
router.post('/login',login);

router.get('/loadApplications/:email',loadApplications);
router.post('/send/',sendApplication);
router.post('/withdraw/',deleteApplication)

export {router as userRoutes};