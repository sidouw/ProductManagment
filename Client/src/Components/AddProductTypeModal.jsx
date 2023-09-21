import React,{useState,useEffect} from 'react'

import { Modal,Form,Select, Input, Checkbox,DatePicker,message   } from 'antd';


const { Option } = Select;

import {addProductType} from '../Api/productTypes'
import {getAttributes} from '../Api/attributes'


const AddAttributeModal = ({open,setOpen,onAdded}) => {
 
  const [confirmLoading, setConfirmLoading] = useState(false);;
  const [attributes, setAttributes] = useState(undefined);;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(()=>{
    getAttributes().then(data=>{
      setAttributes(data.data)
    })
  },[])

  const handleOk = () => {
    form
        .validateFields()
        .then((values) => {
          setConfirmLoading(true);

          addProductType(values).then(()=>{

            setConfirmLoading(false);
            setOpen(false)
            handleAdded(values)
            form.resetFields();

          }).catch((err)=>{

            setConfirmLoading(false);
            console.log(err);
            messageApi.error(err.response.data.message)

          })
        })
        .catch((info) => {
          console.log('Validate Failed:', info)
        });
  }

  const handleAdded = (values)=>{
    const date = new Date(Date.now()).toISOString()
    const nAttributes = attributes.filter((attr)=>values.Attributes.includes(attr._id))
    console.log({Name:values.Name,Attributes:nAttributes,createdAt:date});
    onAdded &&onAdded({_id:Date.now().toString(),Name:values.Name,Attributes:nAttributes,createdAt:date})
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      {contextHolder}
      <Modal
        title="Create a new product type"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            Type:'text'
          }}
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