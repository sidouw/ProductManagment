import React,{useState,useEffect} from 'react'

import { Modal,Form,Select, Input, Checkbox,DatePicker,message   } from 'antd';


const { Option } = Select;

import {addAttribute,updateAttribute} from '../Api/attributes'

const AttributeValueInput =({ getFieldValue }) =>{
    const rules=[{ required: true, message:'Please input an attribute value!' }]

    switch (getFieldValue('Type')) {
        case 'text':
            return (
                <Form.Item name="Value" label="Text" rules={rules}>
                    <Input />
                </Form.Item>
            )
        case 'select':
            return (
                <Form.Item name="Value" label="Select" rules={rules}>
                    <Input />
                </Form.Item>
            )
        case 'multiselect':
            return (
                <Form.Item name="Value" label="Multi Select" rules={rules}>
                    <Input />
                </Form.Item>
            )
        case 'date':
            return (
                <Form.Item name="Value" label="Date" rules={rules}>
                    <DatePicker format={'MM/DD/YYYY'} />
                </Form.Item>
            )
        case 'boolean':
            return (
                <Form.Item name="Value" label="Boolean" valuePropName="checked" >
                    <Checkbox/>
                </Form.Item>
            )
        default:
            return null
    }
}

const AddAttributeModal = ({open,setOpen,attribute,onAdded}) => {
 
  const [confirmLoading, setConfirmLoading] = useState(false);;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(()=>{
    form.resetFields()
  },[attribute])

  const handleOk = () => {
    form
        .validateFields()
        .then((values) => {
        form.resetFields();
        setConfirmLoading(true);
        ApplyChanges(values)
        })
        .catch((info) => {
        console.log('Validate Failed:', info);
        });
  }

  const ApplyChanges=(values)=>{
    if(!attribute){
    addAttribute(values).then((data)=>{
        setOpen(false);
        setConfirmLoading(false);
        values._id = data.data._id
        handleAdded(values)
        form.resetFields()
    }).catch((err)=>{
        setConfirmLoading(false);
        console.log(err);
        messageApi.error(err.response.data.message)
    })
    }else{
      updateAttribute({...values,_id:attribute._id}).then(()=>{
        form.resetFields()
        setConfirmLoading(false);
        setOpen(false)
        values._id = attribute._id
        handleAdded(values)
    }).catch((err)=>{
        setConfirmLoading(false);
        console.log(err);
        messageApi.error(err.response.data.message)
    })
    }

  }

  
  const initialValues = ()=>{

    return {}
  }
  
  const handleAdded = (values)=>{
    let value = ''
    if(values.Type === 'boolean')
      {   value = "Boolean" 
          values.Value ? values.Value = true:values.Value=false
      }
    if(['text','select', 'multiselect'].includes(values.Type)) value = "Name"
    if(values.Type === 'date')
      { 
        value = "Date"
        values.Value = values.Value.toISOString()
      }
    const AttributeValue = {[value]:values.Value}
    onAdded &&onAdded({_id:values._id,Name:values.Name,Type:values.Type,AttributeValue})
  }

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  }

  return (
    <>
      {contextHolder}
      <Modal
        title="Create a new attribute"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
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

        <Form.Item 
            name="Type" 
            label="Type"
            rules={[
                {
                  required: true,
                  message: 'Please Pick an attribute Type!',
                },
              ]}>
            <Select placeholder="Type">
                <Option value="text">Text</Option>
                <Option value="select">Select</Option>
                <Option value="multiselect">Multi select</Option>
                <Option value="date">Date</Option>
                <Option value="boolean">Boolean</Option>
            </Select>
        </Form.Item>

        <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.Type !== currentValues.Type}>
            {AttributeValueInput}
      </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default AddAttributeModal;