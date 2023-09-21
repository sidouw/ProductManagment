import api from './api'


export const getAttributes = async ()=>{
    return await api.get('/attributes')
}
export const addAttribute = async (attribute)=>{
    return await api.post('/attributes',attribute)
}

export const updateAttribute = async (attribute)=>{
    return await api.patch('/attributes',attribute)
}
