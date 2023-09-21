import React from 'react'


import {Button,Popconfirm, Space,   } from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';


const TableRowEditButtons = ({record,onEditClicked,onDeleteConfirmed})=>{
return (
    <Space>
            <Button onClick={()=>{onEditClicked && onEditClicked(record)}} type='text'>
                <EditOutlined style={{ fontSize: '16px', color: '#08c',margin:0,padding:0 }}/>
            </Button>

            <Popconfirm title="Sure to delete?" onConfirm={()=>{onDeleteConfirmed && onDeleteConfirmed(record)}}>
                <Button danger type='text'>
                    <DeleteOutlined style={{ fontSize: '16px', color: '#c35',margin:0,padding:0 }}/>
                </Button>
        </Popconfirm>
    </Space>  
)
}

export default TableRowEditButtons