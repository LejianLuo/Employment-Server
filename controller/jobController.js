 
 import { Job } from "../model/jobModel.js";
 
 //list all jobs
export const listJobs = (req, res) =>{
    Job.find()
    .then(job => {
      res.send(job);
    }).catch(err => {
      res.status(400).send({
        message: err.message || "Something happened trying to get all Properties."
      });
    });
  };

  export const searchJobs = (req, res) =>{
    Job.find({title: { $regex: req.body.title, $options: 'i' },type: { $regex: req.body.type, $options: 'i' },city: { $regex: req.body.city, $options: 'i' },
    industry: { $regex: req.body.industry, $options: 'i' },salary:{$gte: req.body.salary}})
    .then(job => {
      res.send(job);
    }).catch(err => {
      res.status(400).send({
        message: err.message || "Something happened trying to get all Properties."
      });
    });
  };