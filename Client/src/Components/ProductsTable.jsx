import { Space, Table, Tag,Button,Typography,Popconfirm   } from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
const { Title } = Typography


const TableHeader = ()=>{
    return (
        <div style={{ display: 'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
            <Title  level={3} strong>Products</Title> 
            <Button type="primary" >Add</Button>
      </div>
    )
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width:100,
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'ProductType',
    dataIndex: 'productType',
    key: 'productType',
    width:100,
    // responsive: ['sm'],
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
          <Button type='text'>
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
    age: 32,
    productType: 'New York No. 1 Lake Park',
    created: '2023-22-3',
    attributes: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    productType: 'London No. 1 Lake Park',
    created: '2023-28-1',
    attributes: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    productType: 'Sydney No. 1 Lake Park',
    created: '2023-25-2',
    attributes: ['cool', 'teacher'],
  },
];


const App = () => <Table title={() => TableHeader()}
                        columns={columns} 
                        dataSource={data} 
                        />;
export default App;