export function updatedFields<T extends object>(original: T, updates: Partial<T>){
    for (const [key, value] of Object.entries(updates)){
        if (value !== undefined){
            (original as any)[key] = value;
        }
    }
}