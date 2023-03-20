const axios = require('axios');
const baseUrl = require('../../global');

export async function createProduct(product) {

    return await axios.post(`${baseUrl.default}/product`, product)
}

export async function getProduct() {
    return await axios.get(`${baseUrl.default}/product`);
}

export async function updateProduct(product) {
    return await axios.put(`${baseUrl.default}/product`, product)
}

export async function deleteProduct(product) {

    let options = {
        method: 'DELETE',
        url: 'http://localhost:3001/product',
        headers: { 'Content-Type': 'application/json' },
        data: { id: product.id }
    };

    return axios.request(options);
}