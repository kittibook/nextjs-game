export const Config = {
    url : "http://localhost:3001",
    headers: () => {
        return {
            Authorization: 'Bearer ' + localStorage.getItem('token'), // <-- เพิ่มช่องว่าง
        };
    },
}