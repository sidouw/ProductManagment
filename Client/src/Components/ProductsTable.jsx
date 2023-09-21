import { Space, Table, Tag,Button,Typography,Divider   } from 'antd';

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
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'ProductType',
    dataIndex: 'productType',
    key: 'productType',
    // responsive: ['sm'],
  },
  {
    title: 'Tags',
    key: 'tags',
    responsive: ['lg'],
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    productType: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    productType: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    productType: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


const App = () => <Table title={() => TableHeader()}
                        columns={columns} 
                        dataSource={data} 
                        />;
export default App;