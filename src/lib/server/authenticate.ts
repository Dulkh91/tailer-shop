
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import type { Db } from "mongodb";
import type { JWTPayload , User} from "./models/user.model";
import {JWT_SECRET, JWT_EXPIRES_IN } from '$env/static/private'

export async function createUser(db: Db, userName: string,fullName: string, password: string) {

    const existUser = await db.collection('users').findOne({userName})

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

    const result = await db.collection('users').insertOne(user)
    return {...user, _id: result.insertedId}
}


// ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់ពេល Login
export async function logIn(db: Db, userName: string, password: string) {
    const user = await db.collection('users').findOne({userName})
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