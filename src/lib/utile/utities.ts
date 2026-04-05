

export default function formatKhmerDate(isoString: string) {
    if (!isoString) return null; // ប្តូរមក return null វិញដើម្បីងាយស្រួល check ក្នុង IF
    
    const date = new Date(isoString);

    const khmerMonths = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
    const khmerDays = ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];

    const dayName = khmerDays[date.getDay()];
    const dateNum = date.getDate();
    const monthName = khmerMonths[date.getMonth()];
    const yearNum = date.getFullYear();
    
    // ចាប់យកម៉ោង និងនាទី
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Function បំប្លែងលេខអារ៉ាប់ ទៅជាលេខខ្មែរ
    const toKhmerNum = (num: number | string) => {
        return num.toString().replace(/\d/g, (d: string) => "០១២៣៤៥៦៧៨៩"[parseInt(d)]);
    };

    return {
        dayName: dayName,
        date: toKhmerNum(dateNum),
        month: monthName,
        year: toKhmerNum(yearNum),
        time: `${toKhmerNum(hours.toString().padStart(2, '0'))}:${toKhmerNum(minutes.toString().padStart(2, '0'))}`
    };
}


// Sort Data
interface CustomerList{
     _id: string;
    name: string;
     phone: string;
    createdAt: Date;
}

export function sortCustomers(
    customers: CustomerList[], 
    sortBy: 'name' | 'phone',
    sortOrder: 1 | -1 = 1 // 1 = ascending, -1 = descending
):CustomerList[]{
    
    return customers.sort((a,b)=>{
        const valA = a[sortBy]
        const valB = b[sortBy]
        
        if(valA < valB) return -1 * sortOrder
        if(valA > valB) return 1 * sortOrder
        
        return 0
    })
}


// Filter function ដែលអាចបត់បែនបាន
export function filterCustomerByDate(
    customers: CustomerList[],
    year?: number | null,
    month?: number | null
): CustomerList[] {
    return customers.filter(c => {
        if (!c.createdAt) return false;
        
        const d = new Date(c.createdAt);
        if (isNaN(d.getTime())) return false;
        
        // ត្រងតាមឆ្នាំ (បើមាន)
        if (year && d.getFullYear() !== year) return false;
        
        // ត្រងតាមខែ (បើមាន)
        if (month && (d.getMonth() + 1) !== month) return false;
        
        return true;
    });
}


// export function filterCustomerByDate(
//     customers: CustomerList[],
//     year: number,
//     month: number
// ): CustomerList[] {
//     return customers.filter(c => {
//         // ពិនិត្យថា createdAt មានទេ?
//         if (!c.createdAt) return false;
        
//         const d = new Date(c.createdAt); // ប្រាកដថា convert ទៅ Date object
//         return d.getFullYear() === year && (d.getMonth() + 1) === month;
//     });
// }