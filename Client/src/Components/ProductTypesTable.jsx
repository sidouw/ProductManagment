import { Table, Tag,Button,Typography,Popconfirm, Space,   } from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
const { Title } = Typography


const TableHeader = ()=>{
    return (
        <div style={{ display: 'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
            <Title  level={3} strong>Product Types</Title> 
            <Button type="primary" >Add</Button>
      </div>
    )
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed:'left',
    width:100,
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    fixed:'left',
    width:100,
  },
  {
    title: 'Attributes',
    key: 'attributes',
    width: 100,
    responsive: ['lg'],
    dataIndex: 'attributes',
    render: (_, { attributes }) => (
      <>
        {attributes && attributes.map((tag) => {
          return (
            <Tag color='geekblue' key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    width : 100,
    render: (_, record) =>
        <Space>
          <Button primary type='text'>
            <EditOutlined style={{ fontSize: '22px', color: '#08c',margin:0,padding:0 }}/>
          </Button>

          <Popconfirm title="Sure to delete?" onConfirm={() => alert("dd")}>
          <Button danger type='text'>
            <DeleteOutlined style={{ fontSize: '22px', color: '#c35',margin:0,padding:0 }}/>
          </Button>
        </Popconfirm>
        </Space>  
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    created: '2023-21-9',
    productType: 'New York No. 1 Lake Park',
    attributes: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    created: '2023-21-7',
    productType: 'London No. 1 Lake Park',
    attributes: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    created: '2023-22-9',
    productType: 'Sydney No. 1 Lake Park',
    attributes: ['cool', 'teacher','cool', 'teacher','cool', 'teacher','cool', 'teacher','cool', 'teacher'],
  },
];


const App = () => <Table title={() => TableHeader()}
                        columns={columns} 
                        dataSource={data} 
                        />;
export default App;