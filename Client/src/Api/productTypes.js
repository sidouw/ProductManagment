import api from './api'


export const getProductTypes = async ()=>{
    return await api.get('/productType')
}
export const addProductType = async (productType)=>{
    return await api.post('/productType',productType)
}

export const updateProductType = async (productType)=>{
    return await api.patch('/productType',productType)
}
