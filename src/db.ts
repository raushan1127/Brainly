import  { model,Schema } from "mongoose";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

mongoose.connect('mongodb+srv://kumarraushan2615:Raushan8100.@cluster0.zuwxq.mongodb.net/brainly')



const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

const contentSchema = new Schema ({
    title : String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: [{type: mongoose.Types.ObjectId, ref: 'user', required: true}]
})







export const userModel = model("user", userSchema)
export const contentModel = model('content', contentSchema);