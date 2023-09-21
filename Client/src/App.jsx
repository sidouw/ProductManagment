import React from 'react'


import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import {Outlet} from 'react-router-dom'

import SideBar from './Components/SideBar';


const App = () => {
  
  return (
    <Layout   style={{
        padding: 0,
        height: '100vh',
      }} >


      <SideBar/>
      <Layout>

        <Header
          style={{
            padding: 0,
            background: "colorBgContainer",
          }}
        />

          <Outlet/>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;


{/* <Outlet/> */}