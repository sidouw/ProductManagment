import React,{useState} from 'react'

import {Layout} from 'antd';
const {Content} = Layout;

import AttributesTable from '../Components/AttributesTable';

const AttributesPage = ()=>{
    return(
        <Content>

                <div
                    style={{
                        padding: 10,
                        height:'100%'
                }}>
                    <AttributesTable/>
                </div>
        </Content>
    )
}

export default AttributesPage