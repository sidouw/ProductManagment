import React from 'react'

import { Layout, Menu, theme } from 'antd';
const {Content} = Layout;

import ProductTypesTable from '../Components/ProductTypesTable'
const ProductTypesPage = ()=>{

    return(
        <Content>
            <div
                style={{
                    padding: 24,
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