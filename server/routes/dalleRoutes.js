import express from 'express';
import * as dotenv from 'dotenv';
import {Configuration, OpenAIApi} from 'openai'

dotenv.config();

const router = express.Router(); // new instance of router

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router
.route('/')
.get((req,res) => {
    res.send("Hello from DALL-E api");
})
.post(async (req,res) => { // needs to be async since it will take some time 
    try {
        const { prompt } = req.body; //going to come from front end 
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error?.response.data.error.message);
        console.log(process.env.OPENAI_API_KEY)
    }
})



export default router;