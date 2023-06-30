import express from 'express';
const router = express.Router();
import { loadResume,saveResume } from '../controller/resumeController.js';

router.get('/loadResume/:email',loadResume);
router.post('/saveResume/',saveResume);

export {router as resumeRoutes};