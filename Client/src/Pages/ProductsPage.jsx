import React,{useEffect} from 'react'

import { Layout, Menu, theme } from 'antd';
const {Content} = Layout;

import ProductsTable from '../Components/ProductsTable'




const ProductsPage = ()=>{
    const clickk= ()=>{
        console.log("cff");
        // getAttributeValuesOfType("boolean").then(({data})=>{
        //     console.log(data);
        // })
    }
    return(
        <Content>
            <div
            style={{
                padding: 10,
                height:'100%',
            //   background: "red",
            }}>
                <ProductsTable/>
                <button onClick={clickk}>Clickkk</button>
                content
            </div>
        </Content>
    )
}

export default ProductsPage