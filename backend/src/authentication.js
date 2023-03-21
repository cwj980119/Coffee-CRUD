import { Token } from "../models/tokenSchema.js";


/**
 * 토큰 생성
 * @returns 
 */
function createToken(){
    const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(
        6,
        '0'
    )
    return result
}
/**
 * 전화번호 있는지 확인
 * @param {String} phone 
 * @returns boolean
 */
async function isPhoneExist(phone){
    const result = await Token.findOne({phone: phone})
    if(result !== null) return true
    else return false
}


/**
 * 인증 토큰 전달
 */
export async function Authentication(phone){
    // 토큰 생성1
    const tokenNumber = createToken();
    // 휴대폰 전송 가정
    console.log(`번호: ${phone}, 토큰: ${tokenNumber}`)

    if(await isPhoneExist(phone)){
        console.log("토큰 업데이트")
        await Token.updateOne({phone: phone},{token: tokenNumber})
    }
    
    else{
        console.log("토큰 생성")
        const token = new Token({
            token: tokenNumber,
            phone: phone,
            isAuth: false
        })
        
        await token.save()
    }
    return
}

/**
 * 토큰 인증 확인
 */
export async function Verification(token, phone){
    const result = await Token.findOne({phone: phone})
    if(result === null || result.token !== token) return false;
    else {
        await Token.updateOne({phone: phone, token: token},{isAuth: true})
        return true;
    }
}