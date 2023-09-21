import React,{useState} from 'react'

import { Modal,Form,Select, Input, Checkbox,DatePicker,message   } from 'antd';


const { Option } = Select;

import {addAttribute} from '../Api/attributes'

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
                    <Checkbox />
                </Form.Item>
            )
        default:
            return null
    }
}

const AddAttributeModal = ({open,setOpen}) => {
 
  const [confirmLoading, setConfirmLoading] = useState(false);;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    form
        .validateFields()
        .then((values) => {
        form.resetFields();
        console.log(values);
        setConfirmLoading(true);

        handleAddAttribute(values)

        })
        .catch((info) => {
        console.log('Validate Failed:', info);
        });
  }

  const handleAddAttribute=(attribute)=>{

    addAttribute(attribute).then((data)=>{
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields()
        console.log(data);
    }).catch((err)=>{
        setConfirmLoading(false);
        console.log(err);
        messageApi.error(err.response.data.message)
    })

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