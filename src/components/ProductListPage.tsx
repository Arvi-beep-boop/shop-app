import "../App.css";
import React, { useEffect, useMemo, useState } from "react";
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
import {
  DownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { GetProps } from "antd";
import { storeApi } from "../api/api.slice";
import { CategoryList } from "./CategoryList";
import { CurrentCategory } from "./CurrentCategory";
import { ProductCard } from "./ProductCard";
import { Link, useNavigate } from "react-router";
import { ProductQueryParams } from "../types/ProductQueryParams";
const { Meta } = Card;
const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

type SearchProps = GetProps<typeof Input.Search>;

const items: MenuProps["items"] = [
  {
    label: "Price: Low-High",
    key: "price-ASC",
    icon: <UserOutlined />,
  },
  {
    label: "Price: High-Low",
    key: "price-DESC",
    icon: <UserOutlined />,
  },
];

export function ProductListPage() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<number | undefined>();
  const [selectedSort, setSelectedSort] = useState<string | undefined>();
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
    setSelectedSort(e.key);
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

  const [order_by, order] = useMemo(
    () => selectedSort?.split("-") || [],
    [selectedSort]
  );
  const { data: products } = storeApi.useGetProductsQuery({
    title: search,
    categoryId: category,
    order_by: order_by,
    order: order as ProductQueryParams["order"],
  });

  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Header>
          <Flex
            justify="space-between"
            align="center"
            rootClassName="padding-normal"
          >
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
            <Button
              ghost
              color="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => navigate("/cart")}
            ></Button>
          </Flex>
        </Header>
        <Layout>
          <Sider theme="light">
            <CategoryList onSelect={setCategory} />
          </Sider>
          <Content>
            <CurrentCategory categoryId={category} />
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
                return <ProductCard product={product}></ProductCard>;
              })}
            </Flex>
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </>
  );
}
