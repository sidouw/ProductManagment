import api from './api'


export const getAttributeValues = async ()=>{
    return await api.get('/attributeValues')
}
export const getAttributeValuesOfType = async (type)=>{
    return await api.get('/attributeValues/'+type)
}
export const addAttributeValue = async (attributeValue)=>{
    return await api.post('/attributeValues',attributeValue)
}

export const updateAttributeValue = async (attributeValue)=>{
    return await api.patch('/attributeValues',attributeValue)
}
