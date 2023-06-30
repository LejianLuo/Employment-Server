import { User } from "../model/userModel.js";
import jwt from 'jsonwebtoken';



export const login=async (req,res)=>{
    
    try {
      const { email, password } = req.body;
      // Check if user exists in the database
      const user = await User.findOne({ email });
      if(!user)
        throw new Error('User Not Found');
      // Check if password is correct
      const isMatch = await user.comparePassword(password,user);
      if(!isMatch)
        throw new Error('Wrong Password');


      // Generate JWT token
      const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
      // Return success message and token
      res.cookie('token',token,{ path:'/',domain: 'employment-client-production.up.railway.app',
      sameSite: 'none',
      secure: true,
      httpOnly: true,})
      res.json({ message: 'Login successful',email });

  
    } catch (err) {
      res.status(403).json({ message: err.toString() });
    }

}
//validate JWT token and send back the decoded email, if jwt invalid, wipe cookie
export const verifyUsername=(req,res)=>{
    try{
        const email=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
        res.json({ message: 'Verify successful',email:email.userId });

    }catch(err){
        res.clearCookie('token');
        res.status(401).json({message: 'Please login'})
    }
}


export const createUser = (req, res) =>{

    // Create a User
    const user = new User({
        email: req.body.email, 
        password: req.body.password
    });
    //Save data
    user.save()
        .then(data => {
            res.json({ message: 'Registration successful'});
        }).catch(err => {
            res.status(403).json({message: 'User already exist' });
        });
  };

  
  export const sendApplication=(req,res)=>{
      const { email, application } = req.body;
      User.findOne({email})
      .then(user=>{
        user.applications.push(application);
        user.save();
        res.send(user.applications);
        })
      .catch(err=>res.status(403).json({message:err.message}));
        
  }

  export const loadApplications=(req,res)=>{
      const user=User.findOne({email:req.params.email})
      .then(user=>res.send(user.applications))
      .catch(err=>res.status(403).json({message:err.message}));
  }

  export const deleteApplication=(req,res)=>{
      const { email, application } = req.body;
      const user=User.findOne({email})
      .then(user=>{
        const result=user.applications.filter(app=>app._id !==application._id)
        user.applications=[...result];
        user.save();
        res.send(user.applications);
      })
      .catch(err=>res.status(403).json({message:err.message}));
  }