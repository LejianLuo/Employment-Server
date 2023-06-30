import {Resume} from '../model/resumeModel.js';


export const loadResume = (req, res) =>{
    Resume.findOne({email:req.params.email})
    .then(resume => {
      res.send(resume);
    }).catch(err => {
      res.status(403).json({message: err.message });
    });
  };

  
export const saveResume = (req, res) =>{
    
    // Create a resume
    const resume = new Resume({
        email: req.body.email, 
        personal:req.body.personal,
        skills:req.body.skills,
        works:req.body.works,
        education:req.body.education
    });
    //Save data

    resume.save()
        .then(data => {
            res.json({ message: 'save successful'});
        }).catch(err => {
            Resume.findOneAndUpdate({email:req.body.email},req.body).then(data => {
                res.json({ message: 'update successful'});
            }).catch(err => {
                res.status(403).json({message: 'failed to save' });
            });
        });
  };
