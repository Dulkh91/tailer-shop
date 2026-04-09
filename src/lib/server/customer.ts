import type { Db } from "mongodb";
import type { Customer, CreateCustomer, CustomerList, CustomerPaginatedResult} from "./models/customer.model";
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
    const cleanQuery = query.trim().replace(/\s+/g, '');

    return await db
    .collection<Customer>(collectionName)
    .find({
        userId,
        $or:[
            {name: {$regex: cleanQuery.split('').join('\\s*'), // អនុញ្ញាតឲ្យមាន space នៅចន្លោះ
                $options: "i" }},
            {phone: {$regex: cleanQuery}}
        ]
    })
    .sort({createdAt: -1})
    .toArray()
}


export async function updateCustomer(
    db: Db,
    customerId: string,
    userId: string,
    customerUpdate: CreateCustomer
):Promise<Customer | null> {
    const result = await db
    .collection<Customer>(collectionName)
    .findOneAndUpdate({
        _id: new MongoObjectId(customerId),
        userId
    },
    {
        $set:{
            ...customerUpdate,

        }
    },
    {returnDocument: 'after'}
    )
    return result
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


// export async function paginations(
//     db: Db,
//     userId: string,
//     page: number,
//     pageSize: number
// ):Promise<CustomerPaginatedResult> {
//     const database = db.collection<Customer>(collectionName)
//     const totalItem = await database.countDocuments({userId})
//     const customers = await database
//     .find({userId})
//     .skip((page - 1)* pageSize)
//     .limit(pageSize)
//     .toArray();
//     return {
//         customers,
//         totalItem,
//         totalPage: Math.ceil(totalItem / pageSize),
//         page,
//         pageSize,
//    }
   
// } 

