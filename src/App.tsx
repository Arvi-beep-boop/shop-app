import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Col,
  Row,
  Flex,
  Layout,
  Card,
  Input,
  Dropdown,
  Space,
  message,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { GetProps } from "antd";
import { storeApi } from "./api/api.slice";
import { CategoryList } from "./components/CategoryList";
import { CurrentCategory } from "./components/CurrentCategory";
import { ProductCard } from "./components/ProductCard";
const { Meta } = Card;
const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

type SearchProps = GetProps<typeof Input.Search>;

const items: MenuProps["items"] = [
  {
    label: "Featured",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "New",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "Price: Low-High",
    key: "3",
    icon: <UserOutlined />,
  },
  {
    label: "Price: High-Low",
    key: "4",
    icon: <UserOutlined />,
  },
];

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<number | undefined>();
  // const handleSort = (key: string) => {
  //   switch (key) {
  //     case "3": // Price: Low-High
  //       SetProducts((prevProducts) =>
  //         [...prevProducts].sort((a, b) => a.price - b.price)
  //       );
  //       break;
  //     case "4": // Price: High-Low
  //       SetProducts((prevProducts) =>
  //         [...prevProducts].sort((a, b) => b.price - a.price)
  //       );
  //       break;
  //     default:
  //       // Optionally handle other cases, e.g., "Featured" or "New"
  //       break;
  //   }
  // };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
    // handleSort(e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setSearch(value);
    console.log(info?.source, value);
  };

  const { data: products } = storeApi.useGetProductsQuery({
    title: search,
    categoryId: category,
  });

  return (
    <>
      <Layout>
        <Header>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Header>
        <Layout>
          <Sider theme="light">
            <CategoryList onSelect={setCategory} />
          </Sider>
          <Content >
            <CurrentCategory categoryId={category}/>
            <Flex
              justify="space-between"
              align="center"
              rootClassName="padding-normal"
            >
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    Sort
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <div>Product Count: {products?.length}</div>
            </Flex>
            <Flex
              wrap
              gap="large"
              rootClassName="padding-normal"
              justify="center"
            >
              {products?.map((product) => {
                return <ProductCard product={product}></ProductCard>
              })}
            </Flex>
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </>
  );
}
