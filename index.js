import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { jobRoutes} from './routes/jobRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { resumeRoutes } from './routes/resumeRoutes.js';

const app = express();
const mongoURI = process.env.DATABASE_URI;

app.use(cors({
    origin: ['http://localhost:3000','https://employment-client.vercel.app','https://employment-client-production.up.railway.app'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
// connect to database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() =>{
  console.log("Connecterd succesfully to database.");
}).catch(err =>{
  console.log(err);
});

// use routes
app.use(jobRoutes);
app.use(userRoutes);
app.use(resumeRoutes);
//INDEX MESSAGE
app.get('/', (req, res) => {
  res.json({"welcome": "this is the main page"});
});

// start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server started on port 4000");
});

