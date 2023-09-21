import React,{useEffect} from 'react'

import { Layout, Menu, theme } from 'antd';
const {Content} = Layout;

import ProductsTable from '../Components/ProductsTable'




const ProductsPage = ()=>{
    return(
        <Content>
            <div
            style={{
                padding: 10,
                height:'100%',
            //   background: "red",
            }}>
                <ProductsTable/>
            </div>
        </Content>
    )
}

export default ProductsPage