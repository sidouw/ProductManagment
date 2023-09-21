import React,{useState,useEffect} from 'react'

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

  useEffect(()=>{
    form.resetFields()
  },[productType])

  const handleOk = () => {
    form
        .validateFields()
        .then((values) => {
          setConfirmLoading(true);
          console.log(productType);
          ApplyChanges(values)
        })
        .catch((info) => {
          console.log('Validate Failed:', info)
        });
  }
  
  const ApplyChanges= (values) => {
    if(!productType){
      addProductType(values).then((data)=>{
          form.resetFields()
          setConfirmLoading(false);
          setOpen(false)
          values._id = data.data._id
          handleAdded(values)
      }).catch((err)=>{
          setConfirmLoading(false);
          console.log(err);
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
        return {
            Name:productType.Name,
            Attributes:productType.Attributes.map((attr)=>attr._id)
          }
    return {}
  }
  
  const handleAdded = (values)=>{
    const date = new Date(Date.now()).toISOString()
    const nAttributes = attributes.filter((attr)=>values.Attributes.includes(attr._id))
    // console.log({Name:values.Name,Attributes:nAttributes,createdAt:date});
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
                    attributes.map((attr,index)=>
                    <Option key={attr._id} value={attr._id}>{attr.Name}</Option> )
                  }
              </Select>
          </Form.Item>}

      </Form>
      </Modal>
    </>
  );
};

export default AddAttributeModal;