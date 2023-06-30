import express from 'express';
const router = express.Router();
import { listJobs,searchJobs } from "../controller/jobController.js";


router.get('/job/',listJobs);
router.post('/search/',searchJobs);

export {router as jobRoutes};