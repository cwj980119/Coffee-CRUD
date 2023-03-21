import axios from "axios"
import cheerio from "cheerio"
import { User } from "../models/userSchema.js"

/**
 * 선호 사이트의 og를 cheerio를 이용해 스크랩
 * @param {*} prefer 
 * @returns 
 */
export async function getOG(prefer) {
    const web = await axios.get(prefer)

    const $ = await cheerio.load(web.data)
    let title, description, image
    $("meta").each((_, el) => {
        if ($(el).attr("property")) {
            if ($(el).attr("property").split(":")[1] === "title") {
                title = $(el).attr("content")
            }
            else if ($(el).attr("property").split(":")[1] === "description") {
                description = $(el).attr("content")
            }
            else if ($(el).attr("property").split(":")[1] === "image") {
                image = $(el).attr("content")
            }
        }
    })
    return {title, description, image}
}


/**
 * DB에 회원 정보 저장
 * @param {*} body 
 * @returns 
 */
export async function SignUp(body){
    let {title, description, image} = await getOG(body.prefer);

    // 주민등록번호 가리기
    const personal = body.personal.split("-")[0] + "-*******"

    
    const user = new User({
        name: body.name,
        email: body.email,
        personal: personal,
        prefer: body.prefer,
        pwd: body.pwd,
        phone: body.phone,
        og: {
            title: title,
            description: description,
            image: image
        }
    })

    return await user.save()
}