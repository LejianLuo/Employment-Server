import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:String,
    company:String,
    salary:Number,
    type:String,
    industry:String,
    city:String,
    candidates:Number,
    description:String,
    responsibilities:String,
    requirements:Array

});

export const Job = mongoose.model('Job', jobSchema);
