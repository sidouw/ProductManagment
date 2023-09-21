import React,{useState} from 'react'

import { Layout, Menu, theme } from 'antd';
const {Content} = Layout;

import ProductTypesTable from '../Components/ProductTypesTable'

const ProductTypesPage = ()=>{
    return(
        <Content >
            <div
                style={{
                    padding: 10,
                    height:'100%',
                //  background: colorBgContainer,
                }}
                >
                    <ProductTypesTable/>
            </div>
        </Content>
    )
}

export default ProductTypesPage