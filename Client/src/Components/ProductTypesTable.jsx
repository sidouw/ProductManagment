import React,{useState,useEffect,useMemo} from 'react'

import { Table, Tag,Button,Typography,Popconfirm, Space,   } from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';

import AddProductTypeModal from '../Components/AddProductTypeModal'

import {getProductTypes} from '../Api/productTypes'

const { Title } = Typography



const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // fixed:'left',
    width:100,
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    responsive: ['sm'],
    // fixed:'left',
    width:100,
  },
  {
    title: 'Attributes',
    key: 'attributes',
    width: 100,
    responsive: ['lg'],
    dataIndex: 'attributes',
    render: (_, { attributes }) => (
      <>
        {attributes && attributes.map((tag) => {
          return (
            <Tag color='geekblue' key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    width : 100,
    render: (_, record) =>
        <Space>
          <Button type='text'>
            <EditOutlined style={{ fontSize: '16px', color: '#08c',margin:0,padding:0 }}/>
          </Button>

          <Popconfirm title="Sure to delete?" onConfirm={() => alert("dd")}>
          <Button danger type='text'>
            <DeleteOutlined style={{ fontSize: '16px', color: '#c35',margin:0,padding:0 }}/>
          </Button>
        </Popconfirm>
        </Space>  
  },
];



const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [productTypes, setProductTypes] = useState([]);

  const showModal = () => {
      setModalOpen(true);
    };
  const onModalAdd = (productType)=>{
    // console.log(productType);
    setProductTypes([...productTypes,productType])
  }
    useEffect(()=>{
      getProductTypes().then(({data})=>{
        // console.log(data);
        setProductTypes(data)
      })
    },[])

    const tableData= useMemo(()=>{
      return productTypes.map((prodType)=>{
        const attributes = prodType.Attributes.map((attr)=>attr.Name)
        return (
          {
            key: prodType._id,
            name: prodType.Name,
            created: prodType.createdAt.substr(0, 10),
            attributes,
          }
        )
      })
    },[productTypes])
  return (
    <>
    
    <AddProductTypeModal open={modalOpen} setOpen={setModalOpen} onAdded={onModalAdd}/>

    <Table 
      pagination= {{position : ['bottomCenter']}}
      style={{ height: '72vh'}}
      loading= {false}
      scroll={{ y: 350 }}
      title={() => (
        <div style={{ display: 'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
          <Title  level={4} strong>Product types</Title> 
          <Button onClick={showModal} type="primary" >Add</Button>
        </div>
      )}
      columns={columns} 
      dataSource={tableData} 
    />
    </>
  )
}
export default App;