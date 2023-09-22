import React,{useState,useEffect,useMemo,useCallback} from 'react'
import {Table, Tag,Button,Typography,message} from 'antd';

import TableRowEditButtons from './TbaleRowEditButtons';
import AttributeModal from './AttributeModal'

import {getAttributesPopulated} from '../Api/attributes'
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
    title: 'Type',
    dataIndex: 'Type',
    key: 'Type',
    width:100,
    // responsive: ['sm'],
  },
  {
    title: 'Value',
    dataIndex: 'Value',
    key: 'Value',
    width:100,
  },
];



const App = () => {
const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute,SetSelectedAttribute] = useState(undefined)

  useEffect(()=>{
    getAttributesPopulated().then(({data})=>{
        setAttributes(data)
    })
  },[])


const tableData = useMemo(()=>{
    
    return attributes.map((attr)=>{
        let value = ''
        if(attr.Type === 'boolean') value = attr.AttributeValue?.Boolean?.toString()
        if(['text','select', 'multiselect'].includes(attr.Type)) value = attr.AttributeValue?.Name
        if(attr.Type === 'date') value = attr.AttributeValue.Date.substr(0, 10)
        return{
            key:attr._id,
            Name:attr.Name,
            Type:attr.Type,
            Value:value
        }
    })
},[attributes])

  const showModal = () => {
    setModalOpen(true);
    SetSelectedAttribute(undefined)
  }


  const onModalAdd = (attribute)=>{
    const prodIndex = attributes.findIndex((attr)=>attr._id===attribute._id)
    if(prodIndex>=0){
      const nexArray = [...attributes]
      nexArray[prodIndex] = attribute
      setAttributes([...nexArray])
    }else{
        setAttributes([...attributes,attribute])
    }
  }

  const onEditAttribute =useCallback((attribute)=>{
    messageApi.warning("Not Implemented")
  },[attributes])


  const onDeleteAttribute = (aAttribute)=>{
    console.log(aAttribute);
  }

  return (
    <>
        {contextHolder}
        <AttributeModal open={modalOpen} setOpen={setModalOpen} onAdded={onModalAdd} attribute={undefined}/>
        <Table  
                pagination= {{position : ['bottomCenter']}}
                style={{ height: '72vh'}}
                loading= {false}
                scroll={{ y: 350 }}
                title={() => (
                              <div style={{ display: 'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                                <Title  level={4} strong>Attributes</Title> 
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
                          <TableRowEditButtons record={record} onEditClicked={onEditAttribute} onDeleteConfirmed={onDeleteAttribute}/>
                      }]
                      } 
                        dataSource={tableData} 
          />
    </>
          )
}
export default App;