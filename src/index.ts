import express from "express";
import { userModel } from "./db";
import mongoose from "mongoose";


const app = express();
app.use(express.json())


app.post('/api/v1/signup', async (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    await userModel.create({

        username: username,
        password: password

    })
    res.json({
        message: "signed up"
    })
})

app.get('/api/v1/signin', (req,res) => {
    
})

app.post('/api/v1/signin', (req,res) => {
    
})

app.get('/api/v1/content', (req,res) => {
    
})

app.get('/api/v1/signin', (req,res) => {
    
})

app.get('/api/v1/signin', (req,res) => {
    
})

app.listen(3000)