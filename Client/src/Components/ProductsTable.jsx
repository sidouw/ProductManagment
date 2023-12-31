import React,{useState,useEffect,useMemo,useCallback} from 'react'
import {Table, Tag,Button,Typography} from 'antd';

import TableRowEditButtons from './TbaleRowEditButtons';
import ProductsModal from './ProductsModal'

import {getProducts} from '../Api/products'
const { Title } = Typography


const columns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    width:100,
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Product type',
    dataIndex: 'ProductType',
    key: 'ProductType',
    width:100,
    // responsive: ['sm'],
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
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
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    product: 'New York No. 1 Lake Park',
    created: '2023-22-3',
    attributes: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    product: 'London No. 1 Lake Park',
    created: '2023-28-1',
    attributes: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    product: 'Sydney No. 1 Lake Park',
    created: '2023-25-2',
    attributes: ['cool', 'teacher'],
  },
];


const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct,SetSelectedProduct] = useState(undefined)

  useEffect(()=>{
    getProducts().then(({data})=>{
      setProducts(data)
    })
  },[])

  const showModal = () => {
    setModalOpen(true);
    SetSelectedProduct(undefined)
  }

  const onModalAdd = (product)=>{
  }

  const onEditProduct =useCallback((product)=>{
    console.log("Edit");
  },[])

useCallback
  const onDeleteProduct = (product)=>{

  }

  const tableData= useMemo(()=>{
    return products.map((prod)=>{
      const attributes = prod?.AssignedAttributes.map((assignedAttr)=>assignedAttr.AttributeValue.Name)
      return (
        {
          key: prod._id,
          Name: prod.Name,
          created: prod.createdAt.substr(0, 10),
          ProductType:prod.ProductType.Name,
          attributes
        }
      )
    })
  },[products])

  return (
    <>
        <ProductsModal open={modalOpen} setOpen={setModalOpen} onAdded={onModalAdd} productType={undefined}/>
        <Table  
              pagination= {{position : ['bottomCenter']}}
              style={{ height: '72vh'}}
              loading= {false}
              scroll={{ y: 350 }}
              title={() => (
                              <div style={{ display: 'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                                <Title  level={4} strong>Products</Title> 
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
                          <TableRowEditButtons record={record} onEditClicked={onEditProduct} onDeleteConfirmed={onDeleteProduct}/>
                      }]
                      } 
                        dataSource={tableData} 
          />
    </>
          )
}
export default App;