import api from './api'


export const getProducts = async ()=>{
    return await api.get('/products')
}
export const addProduct = async (product)=>{
    return await api.post('/products',product)
}

export const updateProduct = async (product)=>{
    return await api.patch('/products',product)
}