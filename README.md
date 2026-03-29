
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



# សម្រាប់មេរៀន MongoDB atlas
## Projection:

ដើម្បីកំណត់យកតែ Field ខ្លះដែលអ្នកចង់បាន ( userId, _id, name, phone, createdAt) នៅក្នុង MongoDB អ្នកត្រូវប្រើវិធីសាស្ត្រ .project()។ ការធ្វើបែបនេះហៅថា Projection ដែលវាជួយឱ្យ Database ទាញយកតែទិន្នន័យចាំបាច់ ធ្វើឱ្យ Query ដើរលឿន និងចំណេញ Memory (RAM)។
<details>
<summary>Click to expand</summary>

ខាងក្រោមនេះជាកូដដែលបានកែសម្រួល៖

```ts
export async function getCustomers(
    db: Db,
    userId: string,
): Promise<CustomerList[]> {
   return await db
    .collection<Customer>(collectionName)
    .find({ userId })
    .project<CustomerList>({
        _id: 1,        // លេខ 1 មានន័យថា យក (Include)
        userId: 1,     // យក
        name: 1,       // យក
        phone: 1,      // យក
        createdAt: 1,  // យក
        order: 0       // លេខ 0 មានន័យថា មិនយក (Exclude) - ករណីចង់បញ្ជាក់ឱ្យច្បាស់
    })
    .sort({ createdAt: -1 })
    .toArray();
}
```
ការពន្យល់បន្ថែម៖
.project({ ... }): ជាកន្លែងដែលអ្នកបញ្ជាក់ថាចង់បាន Field ណាខ្លះ។

1 គឺយក (Include)

0 គឺមិនយក (Exclude)

ស្វ័យប្រវត្តិកម្មលើ _id: ជាទូទៅ MongoDB នឹងផ្ដល់ _id មកឱ្យជានិច្ច ទោះអ្នកមិនដាក់ _id: 1 ក៏ដោយ។ ប៉ុន្តែបើអ្នកមិនចង់បាន _id ទេ អ្នកត្រូវដាក់វាជា _id: 0។

Performance: ដោយសារ Field order របស់អ្នកអាចមានផ្ទុក Array ធំៗ (Object ច្រើន) ការប្រើ .project() នឹងជួយឱ្យការទាញទិន្នន័យស្រាលជាងមុនឆ្ងាយណាស់ (Reduced Payload)។

### errorLabelSet: Set(0) {}

បញ្ហានេះកើតឡើងដោយសារច្បាប់របស់ MongoDB៖ អ្នកមិនអាចប្រើការ "យក (Inclusion/1)" និង "មិនយក (Exclusion/0)" លាយគ្នាក្នុង Projection តែមួយបានទេ (លើកលែងតែ Field _id មួយចេញ)។

នៅក្នុង Code មុន យើងបានដាក់ name: 1 (Inclusion) ហើយបែរជាដាក់ order: 0 (Exclusion) ក្នុងពេលតែមួយ ទើបវា Error។

ដំណោះស្រាយ៖
អ្នកគ្រាន់តែដាក់ឈ្មោះ Field ណាដែលអ្នក "ចង់បាន" ឱ្យទៅជា 1 គឺគ្រប់គ្រាន់ហើយ។ រាល់ Field ផ្សេងទៀតដែលអ្នកមិនបានដាក់ (ដូចជា order, address, ...) វានឹងត្រូវបានគេបោះចោល (Exclude) ដោយស្វ័យប្រវត្តិ។

សូមកែ Code របស់អ្នកទៅបែបនេះ៖

```ts
export async function getCustomers(
    db: Db,
    userId: string,
): Promise<CustomerList[]> {
   return await db
    .collection<Customer>(collectionName)
    .find({ userId })
    .project<CustomerList>({
        _id: 1,        // យក
        userId: 1,     // យក
        name: 1,       // យក
        phone: 1,      // យក
        createdAt: 1   // យក
        // ឈប់ដាក់ order: 0 នៅទីនេះ វានឹងមិនយកដោយខ្លួនឯង
    })
    .sort({ createdAt: -1 })
    .toArray();
}
```
ចំណុចត្រូវចាំអំពី MongoDB Projection៖
របៀប Inclusion (យក): បើអ្នកដាក់ field: 1 នោះ MongoDB នឹងផ្ដល់មកតែ Field នោះប៉ុណ្ណោះ (បូករួមទាំង _id)។

របៀប Exclusion (មិនយក): បើអ្នកចង់យកគ្រប់យ៉ាង លើកលែងតែ order មួយចេញ អ្នកត្រូវសរសេរតែ { order: 0 } បានហើយ (កុំដាក់លេខ 1 ឱ្យសោះ)។

ករណីពិសេស _id: _id គឺជា Field តែមួយគត់ដែលអ្នកអាចដាក់ 0 លាយជាមួយលេខ 1 ផ្សេងទៀតបាន (ឧទាហរណ៍៖ { name: 1, _id: 0 })។
</details>


