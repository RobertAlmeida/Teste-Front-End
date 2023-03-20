const axios = require('axios');
const baseUrl = require('../../global');


export async function createCategory(category) {
    return await axios.post(`${baseUrl.default}/category`, category)
}

export async function getCategory() {
    return await axios.get(`${baseUrl.default}/category`);
}

export async function updateCategory(category) {
    return await axios.put(`${baseUrl.default}/category`, category)
}

export async function deleteCategory(category) {
    let options = {
        method: 'DELETE',
        url: 'http://localhost:3001/category',
        headers: { 'Content-Type': 'application/json' },
        data: { id: category.id }
    };

    return axios.request(options);
}