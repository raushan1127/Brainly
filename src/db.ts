import  { model,Schema } from "mongoose";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

mongoose.connect('mongodb+srv://kumarraushan2615:Raushan8100.@cluster0.zuwxq.mongodb.net/brainly')



const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})








export const userModel = model("user", userSchema)
