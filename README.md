
# ដំណើរកូដ
1.) env 

2.) lib/server/db/client.ts
វាភ្ជាប់ជាមួយ mongodb atlas 

3.) src/hooks.server.ts
បើក project ដំបូងវាដំណើរការមុនគេ រួចហើយហៅ file client.ts






## DB Collection: 


Example: Filter by name
```ts
export async function getCustomersByName(
  db: Db,
  userId: string,
  name: string
): Promise<Customer[]> {
  return await db
    .collection<Customer>("tailer_customer")
    .find({ userId, name: { $regex: name, $options: "i" } }) // case-insensitive search
    .sort({ createdAt: -1 })
    .toArray();
}
```
👉 នៅទីនេះ name: { $regex: name, $options: "i" } អនុញ្ញាតឲ្យអ្នកស្វែងរកឈ្មោះដោយប្រើ substring (partial match) និងមិនគិត case sensitivity។

Example: Filter by phone
```ts
export async function getCustomersByPhone(
  db: Db,
  userId: string,
  phone: string
): Promise<Customer[]> {
  return await db
    .collection<Customer>("tailer_customer")
    .find({ userId, phone: { $regex: phone } }) // partial match on phone number
    .sort({ createdAt: -1 })
    .toArray();
}
```
👉 ប្រសិនបើអ្នកចង់ filter ត្រឹមត្រូវ (exact match) អាចប្រើ { userId, phone } ដោយមិនប្រើ $regex។

Example: Combined filter (name OR phone)
```ts
export async function searchCustomers(
  db: Db,
  userId: string,
  keyword: string
): Promise<Customer[]> {
  return await db
    .collection<Customer>("tailer_customer")
    .find({
      userId,
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { phone: { $regex: keyword } }
      ]
    })
    .sort({ createdAt: -1 })
    .toArray();
}
```
👉 នេះអាចប្រើ keyword មួយសម្រាប់ស្វែងរកទាំងឈ្មោះ និងលេខទូរស័ព្ទ។

💡 ដូច្នេះអ្នកអាចប្រើ $regex សម្រាប់ partial search ឬប្រើ exact match តាមតម្រូវការ។