import React,{useState,useEffect,useMemo,useCallback} from 'react'

import { Table, Tag,Button,Typography} from 'antd';

import TableRowEditButtons from './TbaleRowEditButtons';
import ProductTypeModal from './ProductTypeModal'

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
    // responsive: ['lg'],
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
];



const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType,SetSelectedProductType] = useState(undefined)

  const showModal = () => {
      setModalOpen(true);
      SetSelectedProductType(undefined)
    };

  const onModalAdd = (productType)=>{
    
    const prodIndex = productTypes.findIndex((prod)=>prod._id===productType._id)
    console.log(prodIndex);
    if(prodIndex>=0){
      const nexArray = [...productTypes]
      nexArray[prodIndex] = productType
      setProductTypes([...nexArray])
    }else{
      setProductTypes([...productTypes,productType])
    }
  }

    const onEditProductType =useCallback((productType)=>{
      if(productType){
        SetSelectedProductType(productTypes.find((prod)=>prod._id===productType.key))
        setModalOpen(true);
      }
    },[productTypes])

    const onDeleteProductType = (productType)=>{
      console.log(productType);
    }
    useEffect(()=>{
      getProductTypes().then(({data})=>{
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
            attributes: attributes.filter((item,index) => attributes.indexOf(item) === index),
          }
        )
      })
    },[productTypes])


  return (
    <>
    
    <ProductTypeModal open={modalOpen} setOpen={setModalOpen} onAdded={onModalAdd} productType={selectedProductType}/>

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
      
      columns={[
        ...columns,,
        {
          title: 'Action',
          dataIndex: 'Action',
          width : 100,
          render: (_, record) =>
            <TableRowEditButtons record={record} onEditClicked={onEditProductType} onDeleteConfirmed={onDeleteProductType}/>
        }]
      } 
      dataSource={tableData} 
    />
    </>
  )
}
export default App;