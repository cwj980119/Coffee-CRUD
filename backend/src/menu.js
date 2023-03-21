import { Starbucks } from "../models/starbucksSchema.js";


/**
 * DB에서 메뉴목록 받기
 * @returns 
 */
export async function getMenu(){
    return await Starbucks.find()
}