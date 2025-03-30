import express from "express";
import { userModel } from "./db";
import mongoose from "mongoose";
import  Jwt  from "jsonwebtoken";
import { contentModel } from "./db";
import { JWT_PASSWORD } from "../config";
import { userMiddleware } from "./middleware";



const app = express();
app.use(express.json())


app.post('/api/v1/signup', async (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    try{
        await userModel.create({

            username: username,
            password: password
    
        })
        res.json({
            message: "signed up"
        })
    }

    catch(e){
        res.status(411).json(
            {
                message: "User already exist "
            }
        )
    }

    
})

app.post('/api/v1/signin', async (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    try {
        const Isuser = await userModel.findOne({
            username: username,
            password: password
        })
    
        if(Isuser) {
            const token = Jwt.sign({
                id: Isuser._id
            },JWT_PASSWORD)
          res.json({
            token
          })
        }
        else {
            res.status(411).json({
                message: "Incorrect user crendentials"
            })
        }
    } 
    catch(e){
        res.json({
            message: 'Please signup first'
        })
    }

})

app.post('/api/v1/content',userMiddleware, async (req,res) => {
    const link = req.body.link;
    const title = req.body.title;

    
})

app.get('/api/v1/content', (req,res) => {
    
})

app.get('/api/v1/signin', (req,res) => {
    
})

app.get('/api/v1/signin', (req,res) => {
    
})

app.listen(3000)