import React,{useState,useEffect,useMemo} from 'react'

import { Modal,Form,Select, Input, Checkbox,DatePicker,message   } from 'antd';


const { Option } = Select;

import {addProductType,updateProductType} from '../Api/productTypes'
import {getAttributes} from '../Api/attributes'


const AddAttributeModal = ({open,setOpen,onAdded,productType}) => {
 
  const [confirmLoading, setConfirmLoading] = useState(false);;
  const [attributes, setAttributes] = useState(undefined);;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  
  useEffect(()=>{
    getAttributes().then(data=>{
      setAttributes(data.data)
    })
  },[])

  const groupedAttributes = useMemo(()=>{
    if(!attributes) return []
    const maped=  attributes.map(attr=>{
     return  attr.Name
    })
   return maped.filter((item,index) => maped.indexOf(item) === index)
  },[attributes])

  useEffect(()=>{
    form.resetFields()
  },[productType])

  const handleOk = () => {
    form
        .validateFields()
        .then((values) => {
          setConfirmLoading(true);
          ApplyChanges(values)
        })
        .catch((info) => {
          console.log('Validate Failed:', info)
        });
  }
  
  const ApplyChanges= (values) => {
    values.Attributes = attributes.filter(attr=>values.Attributes.includes(attr.Name)).map(attr=>attr._id)
    if(!productType){
      addProductType(values).then((data)=>{
          form.resetFields()
          setConfirmLoading(false);
          setOpen(false)
          values._id = data.data._id
          handleAdded(values)
      }).catch((err)=>{
          setConfirmLoading(false);
          console.log(err)
          messageApi.error(err.response.data.message)
      })
    }else{
      updateProductType({...values,_id:productType._id}).then(()=>{
          form.resetFields()
          setConfirmLoading(false);
          setOpen(false)
          values._id = productType._id
          handleAdded(values)
      }).catch((err)=>{
          setConfirmLoading(false);
          console.log(err);
          messageApi.error(err.response.data.message)
      })
    }
  }
  const initialValues = ()=>{
    if (productType)
      {
        const attributes = productType.Attributes.map((attr)=>attr.Name) 
        // attributes.filter((item,index) => attributes.indexOf(item) === index)
        return {
            Name:productType.Name,
            Attributes:attributes.filter((item,index) => attributes.indexOf(item) === index)
      }
    return {}
  }
}
  
  const handleAdded = (values)=>{
    const date = new Date(Date.now()).toISOString()
    const nAttributes = attributes.filter((attr)=>values.Attributes.includes(attr._id))
    onAdded &&onAdded({_id:values._id,Name:values.Name,Attributes:nAttributes,createdAt:date})
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      {contextHolder}
      <Modal
        forceRender
        title="Create a new product type"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues()}
        > 
          <Form.Item
            name="Name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of the attribute!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {attributes && <Form.Item 
              name="Attributes" 
              label="Attributes"
              rules={[
                  {
                    required: true,
                    message: 'Please Pick at least one attribute!',
                  },
                ]}>
              <Select 
                  mode="multiple"
                  allowClear
                  placeholder="Attributes">
                  {
                    groupedAttributes.map((attr,index)=>
                    <Option key={attr} value={attr}>{attr}</Option> )
                  }
              </Select>
          </Form.Item>}

      </Form>
      </Modal>
    </>
  );
};

export default AddAttributeModal;