import React, { useEffect, useState } from "react";
import { getAllProducts } from "./ShopAPI";
import { Button, Divider, Col, Row, Flex, Card, Input, Dropdown, Space, message } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { GetProps } from "antd";
const { Meta } = Card;
const { Search } = Input;

type SearchProps = GetProps<typeof Input.Search>;
interface Product {
  title: string;
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
}

const items: MenuProps['items'] = [
  {
    label: 'Featured',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'New',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: 'Price: Low-High',
    key: '3',
    icon: <UserOutlined />,
  },
  {
    label: 'Price: High-Low',
    key: '4',
    icon: <UserOutlined />,
  },
];



export default function App() {
  const [products, SetProducts] = useState<Product[] | null>(null);
  const [filtered, SetFiltered] = useState<string>('');

  const handleSort = (key: string) => {
    switch (key) {
      case '3': // Price: Low-High
        SetProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => a.price - b.price)
        );
        break;
      case '4': // Price: High-Low
        SetProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => b.price - a.price)
        );
        break;
      default:
        // Optionally handle other cases, e.g., "Featured" or "New"
        break;
    }
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
    handleSort(e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
    SetFiltered(value);
  }
  // replace it with redux toolkit QUERY
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const products = await response.json();
        SetProducts(products);
      } catch (error) {
        console.error("something went wrong");
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            Button
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Flex wrap gap="small">
        {products?.filter((product) => { return product.title.includes(filtered) }).map((product) => {
          return (
            <Card
              style={{ width: 240, height: 240 }}
              cover={<img src={product.image} width="128" height="128" />}
            >
              <Meta title={product.title} description={product.price + '$'} />
            </Card>
          );
        })}
      </Flex>
    </>
  );
}
