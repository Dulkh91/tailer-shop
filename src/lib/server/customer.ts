import type { Db } from "mongodb";
import type { Customer, CreateCustomer } from "./models/customer.model";
import { ObjectId as MongoObjectId } from "mongodb";


export async function createCustomer(
    db: Db,
    userId: string,
    customerData: CreateCustomer
):Promise<Customer> {
    const customer: Omit<Customer, "_id"> = {
        userId,
        name: customerData.name,
        phone: customerData.phone,
        order: customerData.order,
        createdAt: new Date()
    }
    const result = await db
    .collection('tailer_customer')
    .insertOne(customer)
    return {...customer, _id: result.insertedId}
}

export async function  getCustomers(
    db: Db,
    userId: string,
): Promise<Customer[]>{
   return await db
    .collection<Customer>('tailer_customer')
    .find({userId})
    .sort({createdAt: -1})
    .toArray()
}

export async function customerDetail(
    db: Db,
    customerId: string,
    userId: string
):Promise<Customer | null> {
    return await db
    .collection<Customer>('tailer_customer')
    .findOne({
        _id: new MongoObjectId(customerId),
        userId
    })
}

export async function customerSearching(
    db: Db,
    userId: string,
    query: string
):Promise<Customer[]>{
    return await db
    .collection<Customer>('tailer_customer')
    .find({
        userId,
        $or:[
            {name: {$regex: query, $options: "i" }},
            {phone: {$regex: query}}
        ]
    })
    .sort({createdAt: -1})
    .toArray()
}
