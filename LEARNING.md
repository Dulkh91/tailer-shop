
# ដំណើរកូដ
1.) env 

2.) lib/server/db/client.ts
វាភ្ជាប់ជាមួយ mongodb atlas 

3.) src/hooks.server.ts
បើក project ដំបូងវាដំណើរការមុនគេ រួចហើយហៅ file client.ts

# ធ្វើ data dictionary:
ដោយ data របស់យើងគឺជា couple ដូចនេះយើងអាចធ្វើជា dictionar type បាន

```ts
<script lang="ts">
    import { clothLabels, pantLabels } from '$lib/utile/cusomterDict';
    import type{GarmentOrder} from '$lib/server/models/customer.model'
    import Icon from '@iconify/svelte';

    let { data }: PageProps = $props();

    const customer = data.customer
    
    const clothOrders: GarmentOrder[] = customer?.order.filter((o:GarmentOrder)=> o.type === 'Cloth')?? [];
    const pantOrders: GarmentOrder[] = customer?.order.filter((o:GarmentOrder)=> o.type === 'Pant')?? []

</script>
<div class=" bg-gray-50 mx-2 p-2 ">
    
    {#if clothOrders.length > 0}
        <div class=" mt-4">
            <h1 class=" bg-amber-300 w-26 text-end p-1.5 rounded-t-md flex items-center gap-2">
                <Icon icon="ph:shirt-folded-fill" width="24" height="24" />
                កាត់អាវ
            </h1>
            {#each clothOrders as order  (order)}
                <ul class=" bg-amber-300 p-2">
                    {#each Object.entries(order.measurements) as [key,value] (key)}
                        <li>{clothLabels[key] || key}: {value}</li>
                    {/each}
                </ul>
            {/each}
        </div>
    {/if}  
</div>
```

## ភាពខុសគ្នា '$app/stores' និង $props()
### 1. import { page } from '$app/stores'
👉 នេះគឺជា store (readable store) global របស់ SvelteKit

📌 អ្វីដែលវាផ្តល់ឲ្យ?

page មាន info ពាក់ព័ន្ធនឹង current page ដូចជា៖

- url → URL បច្ចុប្បន្ន
- params → route params (ឧ. /blog/[id])
- data → data ពី load()
- status, error

Example:
```ts
import { page } from '$app/stores';

$: console.log($page.url.pathname);
```
ត្រូវប្រើ $page ដើម្បី subscribe

📌 **ប្រើពេលណា?**
- នៅក្នុង component ណាមួយ (global access)
- មិនចាំបាច់ pass props
- ពេលចង់បាន URL ឬ params ឬ data ពីគ្រប់ទីកន្លែង

### 2. let { data }: PageProps = $props();
👉 នេះគឺជា props ដែល page ទទួលពី load function

📌 **មកពីណា?**

មកពី +page.ts ឬ +page.server.ts
```ts
// +page.ts
export function load() {
  return {
    user: { name: 'John' }
  };
}
```

```svelte
<script lang="ts">
  let { data }: PageProps = $props();
</script>

<p>{data.user.name}</p>
```

**ប្រើពេលណា?**
- នៅក្នុង page component តែប៉ុណ្ណោះ
- ដើម្បីទទួល data ដែល load() return
**🔥 ចំណុចខុសគ្នាសំខាន់**
| Feature  | `$page store`     | `$props().data`          |
| -------- | ----------------- | ------------------------ |
| ប្រភេទ   | Store (reactive)  | Props                    |
| ប្រើទីណា | គ្រប់ component   | តែ page component        |
| មកពីណា   | SvelteKit runtime | `load()` function        |
| Reactive | ✅                 | ❌ (static unless reload) |
| Access   | `$page.data`      | `data`                   |


**យល់ឲ្យងាយ**
- $page = global state របស់ page
- data from $props() = data ដែល inject ចូល page
**⚠️ ចំណាំសំខាន់**

👉 page.data និង data ពិតជា ដូចគ្នា (source តែមួយ)
ប៉ុន្តែ:
```ts
$page.data === data // true (conceptually)
```
តែ:

- $page → reactive (auto update)
- data → easier to use (cleaner)
✅ Best Practice

✔ នៅក្នុង +page.svelte
👉 ប្រើ:
```ts
let { data } = $props();
```
✔ នៅក្នុង component ផ្សេង
👉 ប្រើ:
```ts
import { page } from '$app/stores';
```


- +page.ts for Client + Server ⚠️ careful
- +page.server.ts for Server only ✅ safer


## ការប្រើប្រាស់ Cache-Contro
ដើម្បីកុំឱ្យ Server រត់ម្តងទៀតរាល់ពេលដែលអ្នកចុច Back អ្នកអាចប្រាប់ Browser ឱ្យរក្សាទុកទិន្នន័យនោះក្នុង Cache មួយរយៈ។

នៅក្នុង +page.server.ts របស់អ្នក៖
```ts
export const load = (async ({ locals, setHeaders }) => {
    // ... code ទាញទិន្នន័យ ...

    // ប្រាប់ Browser ឱ្យចាំទិន្នន័យនេះរយៈពេល 60 វិនាទី
    // ពេលអ្នកចុច Back ក្នុងអំឡុងពេលនេះ វានឹងមិនទៅហៅ Server ទៀតទេ
    setHeaders({
        'cache-control': 'private, max-age=60'
    });

    return { customerData };
});
```


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


## Adapt ជាមួយ vercel
<details>
<summary>Click to expand</summary>

របៀបដំឡើង adapter:
1. ដំឡើង adapter-vercel
```bash
npm install @sveltejs/adapter-vercel
```
2. កែប្រែ svelte.config.js
```javascript
import adapter from '@sveltejs/adapter-vercel';
// import adapter from '@sveltejs/adapter-auto'; // លុបចេញ បើមាន

export default {
  kit: {
    adapter: adapter({
      // សម្រាប់ MongoDB Atlas មិនត្រូវការ config ពិសេសទេ
      runtime: 'nodejs20.x' // ប្រើ Node.js runtime
    })
  }
};
```
3. ដំឡើង MongoDB driver (បើមិនទាន់មាន)
```bash
npm install mongodb
```
ចំណុចសំខាន់សម្រាប់ MongoDB Atlas + Vercel:
✅ ការតភ្ជាប់ MongoDB (Serverless-friendly)
បង្កើត src/lib/mongodb.js:

```javascript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('MONGODB_URI is missing');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```
✅ ឧទាហរណ៍ API route (src/routes/api/users/+server.js):
```javascript
import clientPromise from '$lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('your_database_name');
    const users = await db.collection('users').find({}).limit(10).toArray();
    
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}
```
📌 ការកំណត់ Environment Variables លើ Vercel:
ចូលទៅ Vercel Dashboard → ជ្រើសរើស project

Settings → Environment Variables

បន្ថែម MONGODB_URI ជាមួយតម្លៃ connection string របស់អ្នក (ឧទា: mongodb+srv://username:password@cluster.mongodb.net/...)

⚠️ ការព្រមានសំខាន់ៗ:
Vercel Serverless Functions មិនរក្សា connection ជាអចិន្ត្រៃយ៍ទេ - ត្រូវប្រើ connection pooling និងកុំបិទ connection ក្រោយរាល់ request

បើក IP whitelist នៅលើ MongoDB Atlas → Network Access → អនុញ្ញាត 0.0.0.0/0 (សម្រាប់ Vercel dynamic IPs)

ត្រូវប្រាកដថា MongoDB driver version ត្រូវគ្នានឹង Node.js version លើ Vercel
</details>


## Pagination
pagiantion.ts
<details>
<summary>Click to expand</summary>

```ts
export function pagination<T>(items:T[], page:number, pageSize: number){
    const start = (page -1) * pageSize;
    const end = start + pageSize
    const paginatedItems = items.slice(start, end)

    return {
        page,
        pageSize,
        totalPages: Math.ceil(items.length / pageSize),
        data: paginatedItems
    }
}
```
</details>

customer-list.+page.svelte
<details>
<summary>Click to expand</summary>

```ts
<script lang="ts">
    import type { PageProps } from './$types';
    import SearchBar from '$lib/component/SearchBar.svelte';
    import Card from '$lib/component/Card.svelte';
    import CardHeader from '$lib/component/CardHeader.svelte';
    import Filter from '$lib/component/FilterIcon.svelte';
    import FilterOption from '$lib/component/FilterOption.svelte';
    import { filterCustomerByDate } from '$lib/utile/utities';
    import { pagination } from '$lib/utile/pagination';
    import { sortCustomers } from '$lib/utile/utities';
    import type { CustomerList } from '$lib/types'; // Import your CustomerList type

    let { data }: PageProps = $props();
    
    // MARK: - BASE DATA from database
    let origalData: CustomerList[] = $state(data.customerData)
    
    // MARK: - SEARCH STATE
    let isSearching = $state(false)
    let isLoading = $state(false)
    let searchResults: CustomerList[] = $state([]);

    // MARK: - SORT STATE
    let sortOrder = $state<1 | -1 | null>(null);
    let sortBy = $state<'name' | 'phone'>('name');

    // MARK: -FILTER STATE 
    let isShowFilter = $state(false)
    let selectedYear: number | null = $state(null);
    let selectedMonth: number | null = $state(null);

    // MARK: - PAGINATION STATE
    let curentPage = $state(1)
    let pageSize = 10

    // MARK: - DATA FLOW (ទិន្នន័យដំណើរការជាជំហានៗ)
    
    // Step 1: Search Data (ប្រសិនបើកំពុងស្វែងរក)
    let searchedData = $derived.by(()=>{
        if (isSearching){
            return searchResults
        }
        return origalData
    })
       

    // Step 2: Filter Data (ត្រងតាមកាលបរិច្ឆេទ)
    let filteredData = $derived.by(()=>{
        if(isShowFilter && (selectedYear !== null || selectedMonth !==null)){
            return filterCustomerByDate(
                [...searchedData],
                selectedYear,
                selectedMonth
            )
        }
        return searchedData
    })


    // Step 3: Sort Data (តម្រៀប)
    let sortedData = $derived.by(()=>{
        if(sortOrder === null){
            return  filteredData
        }
        return sortCustomers(
            [...filteredData],
            sortBy,
            sortOrder
        )
    })


    // Step 4: Pagination (បែងចែកជាទំព័រ)
    let paginatedData = $derived(()=>{
        const result = pagination(sortedData, curentPage, pageSize)
        return result.data 
    })

    let totalPages = $derived(()=>Math.ceil(sortedData.length / pageSize))

    // MARK: - EVENT HANDLERS
     function handleSearchResults(results: any[]) {
        isSearching = true
        isLoading = false
        searchResults = [...results];
        curentPage = 1
    }

    function resetToAllCustomers() {
        isSearching = false
        isLoading = false
        searchResults = []
        curentPage = 1
    }

    function handleSearching(searching: boolean){
        isLoading = searching
        if(!searching) return 
        isLoading = true
        
    }


    function handleSort(order: 1 | -1 | null, sortByField: 'name' | 'phone') {
        sortOrder = order;
        sortBy = sortByField;
    }

    function handleShowFilter(){
        isShowFilter = !isShowFilter
        if(!isShowFilter){
            // Clear filters when hiding
            selectedYear = null;
            selectedMonth = null;
        }
        curentPage = 1
    }

    function handleYearChange(year: number){
        selectedYear = year
        curentPage = 1    
    
    }
    function handleMonthChange(month: number){
        selectedMonth = month
        curentPage = 1  
    }

    function nextPage() {
    if (curentPage < totalPages()) curentPage++;
  }
  function prevPage() {
    if (curentPage > 1) curentPage--;
  }
   
    
</script>


<div class="mx-2 md:mx-0">
    <div class=" flex items-center">
        <SearchBar 
            onSeachComplete={handleSearchResults} 
            resetSearch={resetToAllCustomers} 
            onSeachingChange = {handleSearching}/>

        <Filter showFilter={handleShowFilter} isShowFilter={isShowFilter}/>
    </div>
    
   {#if isShowFilter}
        <FilterOption 
            dateData ={data}
            onYearChange = {handleYearChange}
            onMonthChange = {handleMonthChange}
        />
   {/if}
    
    <CardHeader onChange = {handleSort}/>
    <Card customers={paginatedData()} isLoading = {isLoading}/>


    <!-- pagination -->
     <div class="flex gap-2 mt-4">
        <button onclick={prevPage}>Prev</button>
        <span>Page {curentPage} of {totalPages()}</span>
        <button onclick={nextPage}>Next</button>
    </div>

</div>
```

</details>

## Page loadmore

pagination.ts
<details>
<summary>Click to expand</summary>


```ts
export function loadMore<T>(items: T[], page: number, pageSize: number) {
  const end = page * pageSize;
  return items.slice(0, end);
}
```
</details>

customer-list.+page.svelte
<details>
<summary>Click to expand</summary>

```ts
<script lang="ts">
    
    import { loadMore } from '$lib/utile/pagination';

    // Step 4: Pagination (បែងចែកជាទំព័រ)
    let paginatedData = $derived.by(()=>{
        const result = loadMore(sortedData, curentPage, pageSize)
        return result 
    })


    function handleLoadMore(){
        curentPage++ 
    }
    
</script>

 <div class="flex justify-center mt-4">
    <button 
      class="bg-blue-500 text-white px-4 py-2 rounded"
      onclick={handleLoadMore}
    >
      Load More
    </button>
</div>
```

</details>
បន្ថែមការ handle loadmore

<details>
<summary>Click to expand</summary>

```ts
function loadMores(){
        // 🚫 បើកំពុង load → មិនធ្វើអ្វីទេ
        if(isFetching) return

        // កុំអោយ load លើស data ឬអស់ហើយ
        if (paginatedData.length >= sortedData.length) return;
        isFetching = true // lock
        curentPage++;

        setTimeout(()=>{
            isFetching = false // unclock
        },300)
    }
```
</details>