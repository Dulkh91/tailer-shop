import { MongoClient, Db } from "mongodb";
import {MONGODB_URI,DB_NAME} from '$env/static/private'

let client: MongoClient
let db: Db

export async function connectToDatabase() {
    if(!client){
        client = new MongoClient(MONGODB_URI)
        await client.connect()
        db =client.db(DB_NAME)
    }
    return db
}

export function getDB(){
    if(!db){
        throw new Error('Database not connected. Call connectToDatabase first.')
    }
    return db
}