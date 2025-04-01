import express from "express";
import { linkModel, userModel } from "./db";
import  Jwt  from "jsonwebtoken";
import { contentModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils"


const app = express();
app.use(express.json())

app.post('/api/v1/signup', async (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    try 
    {
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
            message: 'Please signin first'
        })
    }

})

app.post('/api/v1/content',userMiddleware, async (req,res) => {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    //@ts-ignore
    const userId = req.userId
     await contentModel.create({
        link: link,
        title: title,
        type: type ,
        userId: userId,
        tag: []
     })
     res.json({
        message: " content added"
     })

    
})

app.get('/api/v1/content', userMiddleware, async (req,res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
        }).populate("userId", "username")
        res.json({
            content: content
        })
    })


app.get('/api/v1/brain/share', userMiddleware, async (req,res) => {

    const share = req.body.share;

    if(share) 
        {
        const existinglink = await linkModel.findOne({
            //@ts-ignore
            userId: req.userId
        })
         
        if(existinglink) {
            res.json({
             hash: existinglink.hash
            })
            return
        }

        const hash = random(10);
        await linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.json({
            hash: hash
        })
    }
    else{
        await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        })
    }

    
})

app.get('/api/v1/brain/:shareLink', async (req,res) => {

    const hash = req.params.shareLink;

    const link =  await linkModel.findOne({
        hash: hash
    })

    if(!link){
        res.status(411).json({
            message: "sorry incorrect input"
        })
        return;
    }

    const content = await contentModel.find({
        userId: link.userId
    })

    const user = await userModel.find({
        _id: link.userId
    })

    if(!user){
        res.status(411).json({
            message: "user not found"
        })

        return;
     }

     res.json({
        username: "username",
        content: content
     })
    
})

app.listen(3000)