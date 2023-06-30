import mongoose from "mongoose";

const resumeSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    personal:Object,
    skills:Array,
    works:Array,
    education:Array,
   

});

export const Resume = mongoose.model('Resume', resumeSchema);
