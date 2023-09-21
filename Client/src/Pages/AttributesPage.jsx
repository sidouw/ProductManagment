import React,{useState} from 'react'

import { Button, Layout, Menu, theme } from 'antd';
const {Content} = Layout;

import AddAttributeModal from '../Components/AddAttributeModal';

const AttributesPage = ()=>{
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
      };
    return(
        <Content>

                <div
                    style={{
                        padding: 10,
                        height:'100%'
                }}>
                <AddAttributeModal open={modalOpen} setOpen ={setModalOpen} />
                <Button onClick={showModal} type='primary' size='large'>Add </Button>

                </div>
        </Content>
    )
}

export default AttributesPage