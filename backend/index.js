import express from 'express'
import mongoose from 'mongoose'
import * as cheerio from 'cheerio'
import axios from 'axios'
import cors from 'cors'
import { Starbucks } from './models/starbucksSchema.js'
import { Token } from './models/tokenSchema.js'
import { User } from './models/userSchema.js'
import { getOG, SignUp } from './src/signUp.js'
import { Authentication, Verification } from './src/authentication.js'
import { getMenu } from './src/menu.js'

const app = express()
app.use(express.json())
app.use(cors())

app.post("/user", async (req,res)=>{
    const check = await Token.findOne({phone: req.body.phone})
    if(check === null || check.isAuth !== true) {
        res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다.")
    }
    else {
        const result = await SignUp(req.body)
        res.send(result._id)
    }
})

app.get("/users",async (req,res)=>{
    const result = await User.find()
    res.send(result);
})

app.post("/tokens/phone", async (req,res)=>{
    await Authentication(req.body.phone)
    res.send("핸드폰으로 인증 문자가 전송되었습니다!")
})

app.patch("/tokens/phone", async (req, res)=>{
    const token = req.body.token
    const phone = req.body.phone
    const result = await Verification(token, phone)
    res.send(result)
})

app.get('/starbucks', async (req,res)=>{
    res.send(await getMenu())
})

mongoose.connect("mongodb://my-database:27017/starbucks")
// mongoose.connect("mongodb://localhost/27017/starbucks")

app.listen(3000, ()=>{
    console.log("서버가 시작되었습니다.");
})