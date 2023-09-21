import React,{useState,useEffect} from 'react'

import { Modal,Form,Select, Input, Checkbox,DatePicker,message   } from 'antd';


const { Option } = Select;

import {getProductTypes} from '../Api/productTypes'
import {addProduct,updateProduct} from '../Api/products'


const AddProductModal = ({open,setOpen,onAdded,product}) => {
 
  const [confirmLoading, setConfirmLoading] = useState(false);;
  const [productTypes, setProductTypes] = useState(undefined);;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  
  useEffect(()=>{
    getProductTypes().then(data=>{
        setProductTypes(data.data)
    })
  },[])

  useEffect(()=>{
    form.resetFields()
  },[product])

  const handleOk = () => {
    form
        .validateFields()
        .then((values) => {
        //   setConfirmLoading(true);
          console.log(values);
          ApplyChanges(values)
        })
        .catch((info) => {
          console.log('Validate Failed:', info)
        });
  }
  
  const ApplyChanges= (values) => {
    if(!product){
      addProduct(values).then((data)=>{
        //   form.resetFields()
          setConfirmLoading(false);
        //   setOpen(false)
          values._id = data.data._id
          handleAdded(values)
      }).catch((err)=>{
          setConfirmLoading(false);
          console.log(err);
          messageApi.error(err.response.data.message)
      })
    }else{
      updateProduct({...values,_id:product._id}).then(()=>{
          form.resetFields()
          setConfirmLoading(false);
          setOpen(false)
          values._id = product._id
          handleAdded(values)
      }).catch((err)=>{
          setConfirmLoading(false);
          console.log(err);
          messageApi.error(err.response.data.message)
      })
    }
  }
  const initialValues = ()=>{
    // if (product)
    //     return {
    //         Name:product.Name,
    //         Attributes:product.Attributes.map((attr)=>attr._id)
    //       }
    return {}
  }
  
  const handleAdded = (values)=>{
    // const date = new Date(Date.now()).toISOString()
    // const nAttributes = attributes.filter((attr)=>values.Attributes.includes(attr._id))
    // // console.log({Name:values.Name,Attributes:nAttributes,createdAt:date});
    // onAdded &&onAdded({_id:values._id,Name:values.Name,Attributes:nAttributes,createdAt:date})
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      {contextHolder}
      <Modal
        forceRender
        title="Create a new product"
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

          {productTypes && <Form.Item 
              name="ProductType" 
              label="Product type"
              rules={[
                  {
                    required: true,
                    message: 'Please a Product type!',
                  },
                ]}>
              <Select 
                  placeholder="Product type">
                  {
                    productTypes.map((prodty,index)=>
                    <Option key={prodty._id} value={prodty._id}>{prodty.Name}</Option> )
                  }
              </Select>
          </Form.Item>}

      </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;