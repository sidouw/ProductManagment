import React from 'react'
import {useNavigate} from 'react-router-dom';



import { Layout, Menu} from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const {Sider } = Layout;

const pages = [
                {link:'Products',text:"Manage Products"},
                {link:'ProductTypes',text:'Manage Product Types'},
                {link:'attributes',text:'Manage Attributes'}
              ]


const SideBar = ()=>{
    const navigate = useNavigate();

    const onMenuItemClicked = ({ key })=>{
      if (key) {
        navigate(key);
      }
    }

    return (
      <Sider
      breakpoint="md"
      collapsedWidth="0"
      style={{paddingTop:60}}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div  />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['Products']}
        onClick={onMenuItemClicked}
        items={pages.map(
          (page, index) => ({
            key: page.link,
            // icon: React.createElement(icon),
            label: page.text,
          }),
        )}
      />
    </Sider>
    )
}
export default SideBar


