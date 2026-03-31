import type { Db } from "mongodb";
import type { Customer, CreateCustomer, CustomerList } from "./models/customer.model";
import { ObjectId as MongoObjectId } from "mongodb";

const collectionName = 'tailer_customer'

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
    .collection(collectionName)
    .insertOne(customer)
    return {...customer, _id: result.insertedId}
}

export async function  getCustomers(
    db: Db,
    userId: string,
): Promise<CustomerList[]>{
   return await db
    .collection<Customer>(collectionName)
    .find({userId})
    .project<CustomerList>({
        userId: 1,
        name: 1,
        phone: 1,
        createdAt: 1,
        // order: 0,
    })
    .sort({createdAt: -1})
    .toArray()
}

export async function customerDetail(
    db: Db,
    customerId: string,
    userId: string
):Promise<Customer | null> {
    return await db
    .collection<Customer>(collectionName)
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
    .collection<Customer>(collectionName)
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


export async function deleteCustomer(
    db:Db,
    customerId: string,
    userId: string
):Promise<boolean> {
    const result = await db.collection(collectionName).deleteOne({
        _id: new MongoObjectId(customerId),
        userId
    })
    
    return result.deletedCount > 0;
}