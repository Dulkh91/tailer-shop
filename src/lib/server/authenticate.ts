
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { ObjectId, type Db } from "mongodb";
import type { JWTPayload,UserProfile} from "./models/user.model";
import {JWT_SECRET, JWT_EXPIRES_IN, COLLECTION_AUTH_NAME} from '$env/static/private'

const auth_name = COLLECTION_AUTH_NAME

export async function  getProfile(
    db:Db,
    userId:string
):Promise<UserProfile | null>{
    const result = await db
        .collection<UserProfile>(auth_name)
        .findOne({_id: new ObjectId(userId)},{
            projection:{
                _id: 1,
                userName: 1,
                fullName: 1,
                phone: 1,
                createdAt: 1
            }
        })
    if(!result) return null

    return {
        ...result,
        _id: result._id.toString(),
        createdAt: result.createdAt
    }
}

export async function createUser(db: Db, userName: string,fullName: string, password: string) {

    const existUser = await db.collection(auth_name).findOne({userName})

    if(existUser){
        throw new Error('User នេះមានរួចហើយ')
    }
    
    const hashedPassword = await bcrypt.hash(password,10)

    const user = {
        userName,
        fullName, 
        password: hashedPassword,
        createdAt: new Date()
    }

    const result = await db.collection(auth_name).insertOne(user)
    return {...user, _id: result.insertedId}
}


// ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់ពេល Login
export async function logIn(db: Db, userName: string, password: string) {
    const user = await db.collection(auth_name).findOne({userName})
    if(!user){
        return null
    }

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
        return null
    }

    return user
}

// បង្កើត JWT Token
export function generateToken(user: any): string {
    const paylaod: JWTPayload = {
        userId: user._id.toString(),
        fullName: user.fullName,
        userName: user.userName
    } 

    return jwt.sign(paylaod, JWT_SECRET,{
        expiresIn: JWT_EXPIRES_IN
    })
}

// ផ្ទៀងផ្ទាត់ JWT Token
export function verifyToken(token: string): JWTPayload | null{
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
        return null
    }

}

