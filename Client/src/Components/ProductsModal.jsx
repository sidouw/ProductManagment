import React,{useState,useEffect} from 'react'

import { Modal,Form,Select, Input,message} from 'antd';


const { Option } = Select;

import {getProductTypesPopulated} from '../Api/productTypes'
import {addProduct,updateProduct} from '../Api/products'


const AddProductModal = ({open,setOpen,onAdded,product}) => {
  
  const [confirmLoading, setConfirmLoading] = useState(false);;
  const [productTypes, setProductTypes] = useState(undefined);;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  
  useEffect(()=>{
    getProductTypesPopulated().then(data=>{
        setProductTypes(data.data)
    })
  },[])

  useEffect(()=>{
    form.resetFields()
  },[product])


const AttributeValueInput =({ getFieldValue }) =>{
  if(!productTypes) return
  const rules=[{ required: true, message:'Please input an attribute value!' }]
  const productTypeID = getFieldValue('ProductType')
  const SelectedType=  productTypes.find((prodTy)=>prodTy._id===productTypeID)

  if(SelectedType){
    const formFields = SelectedType.Attributes.reduce((acc, attr)=>{
      return {...acc,[attr.Name]: acc[attr.Name] ?  [...acc[attr.Name],{value:attr.AttributeValue,_id:attr._id,Type:attr.Type}]:
                                                    [{value:attr.AttributeValue,_id:attr._id,Type:attr.Type}]}
    },{})
    
    if(formFields){
     return Object.keys(formFields).map((fieldName)=>{
        switch (formFields[fieldName][0].Type) {
          case 'select':
              return (
                  <Form.Item key={formFields[fieldName][0]._id} name="Select" label={fieldName} rules={rules}>
                      <Select
                        style={{ width: '100%' }}
                        placeholder={"Please select a "+ fieldName }
                      >
                        {
                          formFields[fieldName].map((attrVal,index)=>
                          <Option key={attrVal.value._id} value={attrVal.value._id}>{attrVal.value.Name}</Option> )
                        }
                      </Select>
                  </Form.Item>
              )
          case 'multiselect':
            return (
                <Form.Item key={formFields[fieldName][0]._id} name="MultiSelect" label={fieldName} rules={rules}>
                    <Select
                      mode="multiple"
                      allowClear              
                      style={{ width: '100%' }}
                      placeholder={"Please select a "+ fieldName }
                    >
                      {
                        formFields[fieldName].map((attrVal,index)=>
                        <Option key={attrVal.value._id} value={attrVal.value._id}>{attrVal.value.Name}</Option> )
                      }
                    </Select>
                </Form.Item>
          )
          default:
              return null
      }
      })
    }
  }
}

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
    if(values.Select) values.AssignedAttributes = [values.Select]
    if(values.MultiSelect) values.AssignedAttributes = values.AssignedAttributes?  [...values?.MultiSelect,values.Select]:
                                                      [...values.MultiSelect]
    delete values['Select']
    delete values['MultiSelect']
    
    if(!product){
      addProduct(values).then((data)=>{
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

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.ProductType !== currentValues.ProductType}>
                {AttributeValueInput}
          </Form.Item>

      </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;