import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Starbucks } from "./models/starbucksSchema.js";

async function startCrawling(){
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.setViewport({width:1280, height: 720})
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do")
    await page.waitForTimeout(1000)
    
    for (let i = 1; i<30; i++){
        const image = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dt > a > img`,(el)=>el.src)
        const name = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dd`,el => el.textContent)
        
        console.log(image)
        console.log(name)
        
        const menu = new Starbucks({
            name: name,
            img: image
        })
        console.log(menu)
        await menu.save()
    }
    
    await browser.close()
}

mongoose.connect("mongodb://localhost:27017/starbucks")
console.log(await Starbucks.find())
startCrawling()