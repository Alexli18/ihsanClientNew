export const BASE_URL = "http://localhost:4000"; 
export const countByDate = ( arr, date ) => {
    let count = arr.filter((obj) => obj.date == date).length;
    return count;
}