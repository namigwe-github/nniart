import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router(); //router application


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.route('/').get(async (req,res) => {
    try {
        const posts = await Post.find({});
        //console.log(posts)
        res.status(200).json({success:true, data:posts});
    } catch (error) {
        res.status(500).json({success:false, message:error});
    }
}).post(async (req,res) => { //actual practice 
    try {
        const {name, prompt, photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        console.log("this is the TEST")
        console.log(photoUrl);
    
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })//create a new post in database 
    
        res.status(201).json({success:true, data:newPost});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error});
    }
});

export default router;


