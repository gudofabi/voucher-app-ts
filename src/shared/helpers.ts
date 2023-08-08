export const getItemFromSessionStorage = (key: string) => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}